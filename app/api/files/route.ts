import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { fileRegisterSchema } from '@/lib/validation/file.validation'
import { registerFile, getFiles } from '@/lib/services/file.service'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse, paginatedResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    const body = await req.json()
    const data = fileRegisterSchema.parse(body)

    const file = await registerFile({ ...data, uploadedBy: auth.userId })

    await logAction({
      action: 'FILE_REGISTERED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'file',
      entityId: String(file._id),
      summary: `File ${data.originalName} registered by ${auth.email}`,
    })

    return successResponse(file, 'File registered', 201)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    const { data, total, page, limit } = await getFiles(req.nextUrl.searchParams)
    return paginatedResponse(data, total, page, limit)
  } catch (error) {
    return handleApiError(error)
  }
}
