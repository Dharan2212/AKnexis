import { NextRequest, NextResponse } from 'next/server'
import { logoutCookie } from '@/lib/services/auth.service'
import { getAuthUser } from '@/lib/middleware/auth.middleware'
import { logAction } from '@/lib/services/audit.service'
import { getClientIp } from '@/lib/middleware/rateLimit.middleware'

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req).catch(() => null)

    if (user) {
      await logAction({
        action: 'LOGOUT',
        actorUserId: user.userId,
        actorRole: user.role,
        entityType: 'auth',
        summary: `User ${user.email} logged out`,
        ipAddress: getClientIp(req),
      })
    }
  } catch { /* ignore */ }

  const response = NextResponse.json({ success: true, data: null, message: 'Logged out successfully' })
  response.headers.set('Set-Cookie', logoutCookie())
  return response
}
