import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { createClientSchema } from '@/lib/validation/client.validation'
import { connectDB } from '@/lib/db/connection'
import { Client } from '@/lib/db/models/Client.model'
import { getPagination } from '@/lib/utils/pagination.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse, paginatedResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    const body = await req.json()
    const data = createClientSchema.parse(body)

    await connectDB()
    const client = await Client.create({
      ...data,
      clientSince: data.clientSince ? new Date(data.clientSince) : new Date(),
    })

    await logAction({
      action: 'CLIENT_CREATED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'client',
      entityId: String(client._id),
      summary: `Client ${client.companyName} created by ${auth.email}`,
    })

    return successResponse(client, 'Client created', 201)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    await connectDB()
    const { page, limit, skip } = getPagination(req.nextUrl.searchParams)

    const filter: Record<string, unknown> = { deletedAt: null }
    const status = req.nextUrl.searchParams.get('status')
    const search = req.nextUrl.searchParams.get('search')

    if (status) filter.status = status
    if (search) {
      filter.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { 'primaryContact.email': { $regex: search, $options: 'i' } },
      ]
    }

    const [data, total] = await Promise.all([
      Client.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('accountManager', 'firstName lastName').lean(),
      Client.countDocuments(filter),
    ])

    return paginatedResponse(data, total, page, limit)
  } catch (error) {
    return handleApiError(error)
  }
}
