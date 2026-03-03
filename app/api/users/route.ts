import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { createUserSchema } from '@/lib/validation/user.validation'
import { connectDB } from '@/lib/db/connection'
import { User } from '@/lib/db/models/User.model'
import { hashPassword } from '@/lib/utils/hash.util'
import { getPagination } from '@/lib/utils/pagination.util'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse, paginatedResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'
import { sendNewUserInviteEmail } from '@/lib/services/email.service'
import { logger } from '@/lib/utils/logger'

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')

    const body = await req.json()
    const data = createUserSchema.parse(body)

    await connectDB()
    const existing = await User.findOne({ email: data.email.toLowerCase(), deletedAt: null })
    if (existing) throw new AppError(ErrorCodes.ALREADY_EXISTS, 'Email already in use', 400)

    const passwordHash = await hashPassword(data.password)
    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email.toLowerCase(),
      passwordHash,
      role: data.role,
    })

    await logAction({
      action: 'USER_CREATED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'user',
      entityId: String(user._id),
      summary: `User ${user.email} created by ${auth.email}`,
    })

    // Send invite email
    sendNewUserInviteEmail(user, data.password).catch((err) => {
      logger.error('User invite email failed', { error: err.message })
    })

    return successResponse({
      id: String(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }, 'User created', 201)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')

    await connectDB()
    const { page, limit, skip } = getPagination(req.nextUrl.searchParams)

    const filter: Record<string, unknown> = { deletedAt: null }
    const role = req.nextUrl.searchParams.get('role')
    if (role) filter.role = role

    const [data, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      User.countDocuments(filter),
    ])

    return paginatedResponse(data, total, page, limit)
  } catch (error) {
    return handleApiError(error)
  }
}
