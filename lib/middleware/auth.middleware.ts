import { NextRequest } from 'next/server'
import { verifyToken, JWTPayload } from '@/lib/utils/jwt.util'
import { connectDB } from '@/lib/db/connection'
import { User } from '@/lib/db/models/User.model'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { env } from '@/lib/config/env'

export async function getAuthUser(req: NextRequest): Promise<JWTPayload & { _id: string }> {
  // Try cookie first
  let token = req.cookies.get(env.cookieName)?.value

  // Fallback to Bearer token
  if (!token) {
    const authHeader = req.headers.get('Authorization')
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.slice(7)
    }
  }

  if (!token) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'Authentication required', 401)
  }

  let payload: JWTPayload
  try {
    payload = verifyToken(token)
  } catch {
    throw new AppError(ErrorCodes.TOKEN_INVALID, 'Invalid or expired token', 401)
  }

  await connectDB()
  const user = await User.findOne({
    _id: payload.userId,
    isActive: true,
    deletedAt: null,
  }).lean()

  if (!user) {
    throw new AppError(ErrorCodes.UNAUTHORIZED, 'User not found or inactive', 401)
  }

  // Check token version
  if ((user as { tokenVersion?: number }).tokenVersion !== payload.tokenVersion) {
    throw new AppError(ErrorCodes.TOKEN_INVALID, 'Token invalidated. Please log in again.', 401)
  }

  return { ...payload, _id: String((user as { _id: unknown })._id) }
}

export function requireRole(
  user: JWTPayload,
  minRole: 'staff' | 'manager' | 'admin'
) {
  const roleHierarchy = { staff: 1, manager: 2, admin: 3 }
  if (roleHierarchy[user.role] < roleHierarchy[minRole]) {
    throw new AppError(ErrorCodes.FORBIDDEN, 'Insufficient permissions', 403)
  }
}
