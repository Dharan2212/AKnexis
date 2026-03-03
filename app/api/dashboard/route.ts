import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { getDashboardStats } from '@/lib/services/dashboard.service'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    const stats = await getDashboardStats(auth.role)
    return successResponse(stats)
  } catch (error) {
    return handleApiError(error)
  }
}
