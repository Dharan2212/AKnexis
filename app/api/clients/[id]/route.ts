import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { updateClientSchema } from '@/lib/validation/client.validation'
import { connectDB } from '@/lib/db/connection'
import { Client } from '@/lib/db/models/Client.model'
import { Project } from '@/lib/db/models/Project.model'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    if (!isValidObjectId(params.id)) {
      throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid client ID', 400)
    }

    await connectDB()
    const [client, projectCount] = await Promise.all([
      Client.findOne({ _id: params.id, deletedAt: null })
        .populate('accountManager', 'firstName lastName email').lean(),
      Project.countDocuments({ clientId: params.id, deletedAt: null }),
    ])

    if (!client) throw new AppError(ErrorCodes.NOT_FOUND, 'Client not found', 404)

    return successResponse({ ...client, projectCount })
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    if (!isValidObjectId(params.id)) {
      throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid client ID', 400)
    }

    const body = await req.json()
    const data = updateClientSchema.parse(body)

    await connectDB()
    const client = await Client.findOneAndUpdate(
      { _id: params.id, deletedAt: null },
      { $set: data },
      { new: true }
    )

    if (!client) throw new AppError(ErrorCodes.NOT_FOUND, 'Client not found', 404)

    await logAction({
      action: 'CLIENT_UPDATED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'client',
      entityId: params.id,
      summary: `Client ${client.companyName} updated by ${auth.email}`,
    })

    return successResponse(client, 'Client updated')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')

    if (!isValidObjectId(params.id)) {
      throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid client ID', 400)
    }

    await connectDB()
    const client = await Client.findOneAndUpdate(
      { _id: params.id, deletedAt: null },
      { $set: { deletedAt: new Date() } }
    )

    if (!client) throw new AppError(ErrorCodes.NOT_FOUND, 'Client not found', 404)

    await logAction({
      action: 'CLIENT_DELETED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'client',
      entityId: params.id,
      summary: `Client ${client.companyName} soft-deleted by ${auth.email}`,
    })

    return successResponse(null, 'Client deleted')
  } catch (error) {
    return handleApiError(error)
  }
}
