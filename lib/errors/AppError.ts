export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly details?: unknown

  constructor(code: string, message: string, statusCode = 400, details?: unknown) {
    super(message)
    this.code = code
    this.statusCode = statusCode
    this.details = details
    this.name = 'AppError'
  }
}

export const ErrorCodes = {
  // Auth
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  TOKEN_INVALID: 'TOKEN_INVALID',
  // Validation
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INVALID_OBJECT_ID: 'INVALID_OBJECT_ID',
  // Resources
  NOT_FOUND: 'NOT_FOUND',
  ALREADY_EXISTS: 'ALREADY_EXISTS',
  // Rate limiting
  RATE_LIMITED: 'RATE_LIMITED',
  // Business logic
  LEAD_ALREADY_CONVERTED: 'LEAD_ALREADY_CONVERTED',
  INVALID_STATUS_TRANSITION: 'INVALID_STATUS_TRANSITION',
  // Storage
  FILE_TOO_LARGE: 'FILE_TOO_LARGE',
  INVALID_FILE_TYPE: 'INVALID_FILE_TYPE',
  STORAGE_ERROR: 'STORAGE_ERROR',
  // Server
  INTERNAL_ERROR: 'INTERNAL_ERROR',
}
