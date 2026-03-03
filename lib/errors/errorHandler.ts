import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { AppError, ErrorCodes } from './AppError'
import { logger } from '@/lib/utils/logger'

export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    const response: {
      success: false
      error: {
        code: string
        message: string
        details?: unknown
      }
    } = {
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
    }

    // Safely include details only in non-production
    if (
      process.env.NODE_ENV !== 'production' &&
      typeof error === 'object' &&
      error !== null &&
      'details' in error
    ) {
      response.error.details = (error as { details?: unknown }).details
    }

    return NextResponse.json(response, {
      status: error.statusCode,
    })
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: ErrorCodes.VALIDATION_ERROR,
          message: 'Validation failed',
          details: error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    )
  }

  logger.error('Unhandled API error', {
    error: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
  })

  return NextResponse.json(
    {
      success: false,
      error: {
        code: ErrorCodes.INTERNAL_ERROR,
        message: 'An unexpected error occurred. Please try again.',
      },
    },
    { status: 500 }
  )
}