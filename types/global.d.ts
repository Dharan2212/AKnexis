declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI?: string
    MONGODB_DB_NAME?: string
    JWT_SECRET?: string
    JWT_EXPIRES_IN?: string
    BCRYPT_ROUNDS?: string
    COOKIE_NAME?: string
    NEXT_PUBLIC_APP_URL?: string
    STORAGE_PROVIDER?: 's3' | 'r2'
    AWS_REGION?: string
    AWS_ACCESS_KEY_ID?: string
    AWS_SECRET_ACCESS_KEY?: string
    S3_BUCKET_NAME?: string
    S3_UPLOAD_MAX_SIZE_MB?: string
    EMAIL_PROVIDER?: string
    EMAIL_FROM?: string
    EMAIL_NOTIFY_LEADS?: string
    SENDGRID_API_KEY?: string
    NEXT_PUBLIC_GA_ID?: string
    SENTRY_DSN?: string
    RATE_LIMIT_WINDOW_MS?: string
    RATE_LIMIT_MAX_REQUESTS?: string
    ALLOWED_ORIGINS?: string
  }
}
