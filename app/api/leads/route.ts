import { NextRequest } from 'next/server'
import { createLeadSchema, updateLeadSchema } from '@/lib/validation/lead.validation'
import { createLead, getLeads } from '@/lib/services/lead.service'
import { rateLimitLeads, getClientIp } from '@/lib/middleware/rateLimit.middleware'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse, paginatedResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'
import { sendLeadNotificationEmail } from '@/lib/services/email.service'
import { logger } from '@/lib/utils/logger'

export async function POST(req: NextRequest) {
  try {
    rateLimitLeads(req)

    const body = await req.json()
    const data = createLeadSchema.parse(body)
    const ip = getClientIp(req)

    const lead = await createLead({ ...data, ipAddress: ip })

    // Send notification email - non-blocking
    sendLeadNotificationEmail(lead).catch((err) => {
      logger.error('Lead notification email failed', { error: err.message, leadId: String(lead._id) })
    })

    await logAction({
      action: 'LEAD_CREATED',
      actorUserId: null,
      actorRole: 'public',
      entityType: 'lead',
      entityId: String(lead._id),
      summary: `New lead from ${lead.fullName} (${lead.email})`,
      ipAddress: ip,
      userAgent: req.headers.get('user-agent') || undefined,
      metadata: { serviceInterest: lead.serviceInterest, source: lead.source },
    })

    return successResponse({ id: String(lead._id) }, 'Thank you! We will contact you shortly.', 201)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    const { data, total, page, limit } = await getLeads(req.nextUrl.searchParams)
    return paginatedResponse(data, total, page, limit)
  } catch (error) {
    return handleApiError(error)
  }
}
