import { NextRequest } from 'next/server'
import { getAuthUser } from '@/lib/middleware/auth.middleware'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { connectDB } from '@/lib/db/connection'
import { User } from '@/lib/db/models/User.model'

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    await connectDB()
    const user = await User.findById(auth.userId).lean()
    if (!user) throw new Error('User not found')

    const u = user as Record<string, unknown>
    return successResponse({
      id: String(u._id),
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
      lastLoginAt: u.lastLoginAt,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
