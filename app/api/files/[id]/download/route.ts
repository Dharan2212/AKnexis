import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { getFileDownloadUrl } from '@/lib/services/file.service'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    const result = await getFileDownloadUrl(params.id)

    await logAction({
      action: 'FILE_DOWNLOAD_REQUESTED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'file',
      entityId: params.id,
      summary: `Download requested for ${result.originalName} by ${auth.email}`,
    })

    return successResponse(result)
  } catch (error) {
    return handleApiError(error)
  }
}
