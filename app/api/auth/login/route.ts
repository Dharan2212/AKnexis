import { NextRequest, NextResponse } from 'next/server'
import { loginSchema } from '@/lib/validation/auth.validation'
import { loginUser } from '@/lib/services/auth.service'
import { rateLimitLogin, getClientIp } from '@/lib/middleware/rateLimit.middleware'
import { handleApiError } from '@/lib/errors/errorHandler'
import { logAction } from '@/lib/services/audit.service'

export async function POST(req: NextRequest) {
  try {
    rateLimitLogin(req)

    const body = await req.json()
    const data = loginSchema.parse(body)
    const ip = getClientIp(req)

    const result = await loginUser(data.email, data.password)

    await logAction({
      action: 'LOGIN_SUCCESS',
      actorUserId: null,
      actorRole: result.user.role,
      entityType: 'auth',
      summary: `User ${result.user.email} logged in`,
      ipAddress: ip,
      userAgent: req.headers.get('user-agent') || undefined,
    })

    const response = NextResponse.json({
      success: true,
      data: { user: result.user },
      message: 'Login successful',
    })
    response.headers.set('Set-Cookie', result.cookie)
    return response
  } catch (error) {
    // Log failed login attempt
    try {
      const body = await req.clone().json().catch(() => ({}))
      await logAction({
        action: 'LOGIN_FAILED',
        actorUserId: null,
        actorRole: 'public',
        entityType: 'auth',
        summary: `Failed login attempt for ${(body as { email?: string }).email || 'unknown'}`,
        ipAddress: getClientIp(req),
      })
    } catch { /* ignore */ }

    return handleApiError(error)
  }
}
