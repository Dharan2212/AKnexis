import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { convertLead } from '@/lib/services/lead.service'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    const client = await convertLead(params.id, auth.userId)

    await logAction({
      action: 'LEAD_CONVERTED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'lead',
      entityId: params.id,
      summary: `Lead converted to client by ${auth.email}`,
      metadata: { clientId: String(client._id) },
    })

    return successResponse(client, 'Lead converted to client successfully', 201)
  } catch (error) {
    return handleApiError(error)
  }
}
