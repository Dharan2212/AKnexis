import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { fileUploadRequestSchema } from '@/lib/validation/file.validation'
import { createUploadRequest } from '@/lib/services/file.service'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    const body = await req.json()
    const data = fileUploadRequestSchema.parse(body)

    const result = await createUploadRequest(data)

    await logAction({
      action: 'FILE_UPLOAD_REQUESTED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'file',
      summary: `Upload requested for ${data.originalName} by ${auth.email}`,
      metadata: { originalName: data.originalName, mimeType: data.mimeType, sizeBytes: data.sizeBytes },
    })

    return successResponse(result, 'Upload URL generated')
  } catch (error) {
    return handleApiError(error)
  }
}
