import { NextRequest } from 'next/server'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { env } from '@/lib/config/env'

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export function rateLimit(options: { windowMs: number; max: number }) {
  return (req: NextRequest) => {
    const ip = getIp(req)
    const key = `${req.nextUrl.pathname}:${ip}`
    const now = Date.now()

    const entry = store.get(key)

    if (!entry || now > entry.resetAt) {
      store.set(key, { count: 1, resetAt: now + options.windowMs })
      return
    }

    if (entry.count >= options.max) {
      throw new AppError(ErrorCodes.RATE_LIMITED, 'Too many requests. Please try again later.', 429)
    }

    entry.count++
  }
}

export const rateLimitLogin = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 })
export const rateLimitLeads = rateLimit({ windowMs: 60 * 60 * 1000, max: 5 })
export const rateLimitGeneral = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMaxRequests,
})

export function getClientIp(req: NextRequest): string {
  return getIp(req)
}
