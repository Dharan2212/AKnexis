import { connectDB } from '@/lib/db/connection'
import { User } from '@/lib/db/models/User.model'
import { comparePassword } from '@/lib/utils/hash.util'
import { signToken, getTokenExpiry } from '@/lib/utils/jwt.util'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { env } from '@/lib/config/env'
import { serialize } from 'cookie'

export async function loginUser(email: string, password: string) {
  await connectDB()

  const user = await User.findOne({
    email: email.toLowerCase(),
    isActive: true,
    deletedAt: null,
  }).select('+passwordHash')

  // Generic error to prevent user enumeration
  if (!user) {
    throw new AppError(ErrorCodes.INVALID_CREDENTIALS, 'Invalid email or password', 401)
  }

  const isValid = await comparePassword(password, user.passwordHash)
  if (!isValid) {
    throw new AppError(ErrorCodes.INVALID_CREDENTIALS, 'Invalid email or password', 401)
  }

  await User.findByIdAndUpdate(user._id, { lastLoginAt: new Date() })

  const token = signToken({
    userId: String(user._id),
    email: user.email,
    role: user.role,
    tokenVersion: user.tokenVersion,
  })

  const cookieStr = serialize(env.cookieName, token, {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: getTokenExpiry(),
  })

  return {
    cookie: cookieStr,
    user: {
      id: String(user._id),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  }
}

export function logoutCookie(): string {
  return serialize(env.cookieName, '', {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
}
