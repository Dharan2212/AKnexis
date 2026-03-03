import { logger } from '@/lib/utils/logger'

export function captureException(error: unknown, context?: Record<string, unknown>) {
  const message = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack : undefined

  logger.error('Exception captured', {
    message,
    stack: process.env.NODE_ENV !== 'production' ? stack : undefined,
    ...context,
  })

  // Future: integrate Sentry here
  // if (process.env.NODE_ENV === 'production' && process.env.SENTRY_DSN) {
  //   Sentry.captureException(error, { extra: context })
  // }
}
