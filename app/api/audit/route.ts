import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { connectDB } from '@/lib/db/connection'
import { ActivityLog } from '@/lib/db/models/ActivityLog.model'
import { getPagination } from '@/lib/utils/pagination.util'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { paginatedResponse } from '@/lib/utils/response.util'

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    await connectDB()
    const { page, limit, skip } = getPagination(req.nextUrl.searchParams)
    const params = req.nextUrl.searchParams

    const filter: Record<string, unknown> = {}

    const entityType = params.get('entityType')
    const entityId = params.get('entityId')
    const actorUserId = params.get('actorUserId')
    const action = params.get('action')
    const dateFrom = params.get('dateFrom')
    const dateTo = params.get('dateTo')
    const search = params.get('search')

    if (entityType) filter.entityType = entityType
    if (entityId && isValidObjectId(entityId)) filter.entityId = entityId
    if (actorUserId && isValidObjectId(actorUserId)) filter.actorUserId = actorUserId
    if (action) filter.action = action
    if (dateFrom || dateTo) {
      const dateFilter: Record<string, Date> = {}
      if (dateFrom) dateFilter.$gte = new Date(dateFrom)
      if (dateTo) dateFilter.$lte = new Date(dateTo)
      filter.createdAt = dateFilter
    }
    if (search) filter.summary = { $regex: search, $options: 'i' }

    const [data, total] = await Promise.all([
      ActivityLog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('actorUserId', 'firstName lastName email')
        .lean(),
      ActivityLog.countDocuments(filter),
    ])

    return paginatedResponse(data, total, page, limit)
  } catch (error) {
    return handleApiError(error)
  }
}
