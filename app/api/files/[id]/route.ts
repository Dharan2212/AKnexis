import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { connectDB } from '@/lib/db/connection'
import { File } from '@/lib/db/models/File.model'
import { deleteFile } from '@/lib/services/file.service'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid file ID', 400)

    await connectDB()
    const file = await File.findOne({ _id: params.id, deletedAt: null })
      .populate('uploadedBy', 'firstName lastName').lean()
    if (!file) throw new AppError(ErrorCodes.NOT_FOUND, 'File not found', 404)
    return successResponse(file)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    await deleteFile(params.id)

    await logAction({
      action: 'FILE_DELETED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'file',
      entityId: params.id,
      summary: `File soft-deleted by ${auth.email}`,
    })

    return successResponse(null, 'File deleted')
  } catch (error) {
    return handleApiError(error)
  }
}
