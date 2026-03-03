import { NextResponse } from 'next/server'

export function successResponse<T>(data: T, message?: string, status = 200, meta?: object) {
  return NextResponse.json(
    { success: true, data, ...(message && { message }), ...(meta && { meta }) },
    { status }
  )
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: unknown
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details !== undefined && process.env.NODE_ENV !== 'production' && { details }),
      },
    },
    { status }
  )
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
) {
  return NextResponse.json({
    success: true,
    data,
    ...(message && { message }),
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
    },
  })
}
