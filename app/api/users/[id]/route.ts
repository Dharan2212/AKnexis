import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { updateUserSchema } from '@/lib/validation/user.validation'
import { connectDB } from '@/lib/db/connection'
import { User } from '@/lib/db/models/User.model'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid ID', 400)

    await connectDB()
    const user = await User.findOne({ _id: params.id, deletedAt: null }).lean()
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User not found', 404)
    return successResponse(user)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid ID', 400)

    const body = await req.json()
    const data = updateUserSchema.parse(body)

    await connectDB()
    const user = await User.findOneAndUpdate(
      { _id: params.id, deletedAt: null },
      { $set: data },
      { new: true }
    )
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User not found', 404)

    await logAction({
      action: 'USER_UPDATED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'user',
      entityId: params.id,
      summary: `User ${user.email} updated by ${auth.email}`,
    })

    return successResponse(user, 'User updated')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid ID', 400)

    // Cannot delete yourself
    if (params.id === auth.userId) {
      throw new AppError(ErrorCodes.FORBIDDEN, 'Cannot delete your own account', 403)
    }

    await connectDB()
    const user = await User.findOneAndUpdate(
      { _id: params.id, deletedAt: null },
      { $set: { deletedAt: new Date(), isActive: false } }
    )
    if (!user) throw new AppError(ErrorCodes.NOT_FOUND, 'User not found', 404)

    await logAction({
      action: 'USER_DELETED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'user',
      entityId: params.id,
      summary: `User ${user.email} soft-deleted by ${auth.email}`,
    })

    return successResponse(null, 'User deleted')
  } catch (error) {
    return handleApiError(error)
  }
}
