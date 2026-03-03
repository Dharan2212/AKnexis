import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { connectDB } from '@/lib/db/connection'
import { File } from '@/lib/db/models/File.model'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { getPagination } from '@/lib/utils/pagination.util'
import { env } from '@/lib/config/env'
import { logger } from '@/lib/utils/logger'

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'text/plain',
  'text/csv',
  'application/zip',
]

function getS3Client() {
  return new S3Client({
    region: env.awsRegion,
    credentials: {
      accessKeyId: env.awsAccessKeyId,
      secretAccessKey: env.awsSecretAccessKey,
    },
  })
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 100)
}

export async function createUploadRequest(data: {
  originalName: string
  mimeType: string
  sizeBytes: number
  category: string
  clientId?: string
  projectId?: string
}) {
  if (!ALLOWED_MIME_TYPES.includes(data.mimeType)) {
    throw new AppError(ErrorCodes.INVALID_FILE_TYPE, 'File type not allowed', 400)
  }

  const maxBytes = env.s3UploadMaxSizeMb * 1024 * 1024
  if (data.sizeBytes > maxBytes) {
    throw new AppError(ErrorCodes.FILE_TOO_LARGE, `File exceeds ${env.s3UploadMaxSizeMb}MB limit`, 400)
  }

  const ext = data.originalName.split('.').pop() || 'bin'
  const storageKey = `uploads/${uuidv4()}_${sanitizeFileName(data.originalName)}`

  try {
    const s3 = getS3Client()
    const command = new PutObjectCommand({
      Bucket: env.s3BucketName,
      Key: storageKey,
      ContentType: data.mimeType,
      ContentLength: data.sizeBytes,
    })

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
    const expiresAt = new Date(Date.now() + 300 * 1000).toISOString()

    return { uploadUrl, storageKey, expiresAt, extension: ext }
  } catch (error) {
    logger.error('S3 presign failed', { error: error instanceof Error ? error.message : String(error) })
    throw new AppError(ErrorCodes.STORAGE_ERROR, 'Failed to generate upload URL', 500)
  }
}

export async function registerFile(data: {
  originalName: string
  storageKey: string
  mimeType: string
  sizeBytes: number
  extension: string
  category: string
  clientId?: string
  projectId?: string
  description?: string
  tags?: string[]
  uploadedBy: string
}) {
  if (!data.clientId && !data.projectId) {
    throw new AppError(ErrorCodes.VALIDATION_ERROR, 'At least one of clientId or projectId is required', 400)
  }

  await connectDB()
  const file = await File.create(data)
  return file
}

export async function getFiles(searchParams: URLSearchParams) {
  await connectDB()
  const { page, limit, skip } = getPagination(searchParams)

  const filter: Record<string, unknown> = { deletedAt: null, isArchived: false }

  const category = searchParams.get('category')
  const clientId = searchParams.get('clientId')
  const projectId = searchParams.get('projectId')
  const uploadedBy = searchParams.get('uploadedBy')
  const search = searchParams.get('search')

  if (category) filter.category = category
  if (clientId && isValidObjectId(clientId)) filter.clientId = clientId
  if (projectId && isValidObjectId(projectId)) filter.projectId = projectId
  if (uploadedBy && isValidObjectId(uploadedBy)) filter.uploadedBy = uploadedBy
  if (search) {
    filter.$or = [
      { originalName: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ]
  }

  const [data, total] = await Promise.all([
    File.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
      .populate('uploadedBy', 'firstName lastName').lean(),
    File.countDocuments(filter),
  ])

  return { data, total, page, limit }
}

export async function getFileDownloadUrl(id: string) {
  if (!isValidObjectId(id)) {
    throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid file ID', 400)
  }
  await connectDB()

  const file = await File.findOne({ _id: id, deletedAt: null })
  if (!file) throw new AppError(ErrorCodes.NOT_FOUND, 'File not found', 404)

  try {
    const s3 = getS3Client()
    const command = new GetObjectCommand({
      Bucket: env.s3BucketName,
      Key: file.storageKey,
    })
    const downloadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })
    return { downloadUrl, originalName: file.originalName, expiresAt: new Date(Date.now() + 300 * 1000).toISOString() }
  } catch (error) {
    logger.error('S3 download presign failed', { error: error instanceof Error ? error.message : String(error) })
    throw new AppError(ErrorCodes.STORAGE_ERROR, 'Failed to generate download URL', 500)
  }
}

export async function deleteFile(id: string) {
  if (!isValidObjectId(id)) {
    throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid file ID', 400)
  }
  await connectDB()
  const result = await File.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } }
  )
  if (!result) throw new AppError(ErrorCodes.NOT_FOUND, 'File not found', 404)
}
