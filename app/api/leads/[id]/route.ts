import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { getLeadById, updateLead, deleteLead } from '@/lib/services/lead.service'
import { updateLeadSchema } from '@/lib/validation/lead.validation'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')
    const lead = await getLeadById(params.id)
    return successResponse(lead)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    const body = await req.json()
    const data = updateLeadSchema.parse(body)

    const noteWithActor = data.note
      ? { content: data.note.content, addedBy: auth.userId }
      : undefined

    const updateData: {
      status?: string
      assignedTo?: string
      note?: { content: string; addedBy: string }
    } = {
      ...(data.status ? { status: data.status } : {}),
      ...(data.assignedTo ? { assignedTo: data.assignedTo } : {}),
      ...(noteWithActor ? { note: noteWithActor } : {}),
    }

    const lead = await updateLead(params.id, updateData)

    await logAction({
      action: 'LEAD_UPDATED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'lead',
      entityId: params.id,
      summary: `Lead updated by ${auth.email}`,
      metadata: { changes: data },
    })

    return successResponse(lead, 'Lead updated')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')

    await deleteLead(params.id)

    await logAction({
      action: 'LEAD_DELETED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'lead',
      entityId: params.id,
      summary: `Lead soft-deleted by ${auth.email}`,
    })

    return successResponse(null, 'Lead deleted')
  } catch (error) {
    return handleApiError(error)
  }
}
