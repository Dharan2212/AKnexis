import { NextRequest } from 'next/server'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'

const CSRF_HEADER = 'x-aknexis-csrf'

export function checkCsrf(req: NextRequest) {
  const csrfHeader = req.headers.get(CSRF_HEADER)
  if (!csrfHeader || csrfHeader !== '1') {
    throw new AppError(ErrorCodes.FORBIDDEN, 'CSRF validation failed', 403)
  }
}
