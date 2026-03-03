function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`Missing required environment variable: ${key}`)
    }
    return ''
  }
  return value
}

function optionalEnv(key: string, defaultValue = ''): string {
  return process.env[key] || defaultValue
}

export const env = {
  nodeEnv: optionalEnv('NODE_ENV', 'development'),
  appUrl: optionalEnv('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
  isProduction: process.env.NODE_ENV === 'production',

  // Database
  mongodbUri: optionalEnv('MONGODB_URI', 'mongodb://localhost:27017'),
  mongodbDbName: optionalEnv('MONGODB_DB_NAME', 'aknexis'),

  // Auth
  jwtSecret: optionalEnv('JWT_SECRET', 'dev-secret-key-change-in-production-must-be-long-enough'),
  jwtExpiresIn: optionalEnv('JWT_EXPIRES_IN', '24h'),
  bcryptRounds: parseInt(optionalEnv('BCRYPT_ROUNDS', '12'), 10),
  cookieName: optionalEnv('COOKIE_NAME', 'aknexis_session'),

  // Security
  allowedOrigins: optionalEnv('ALLOWED_ORIGINS', 'http://localhost:3000').split(','),
  rateLimitWindowMs: parseInt(optionalEnv('RATE_LIMIT_WINDOW_MS', '900000'), 10),
  rateLimitMaxRequests: parseInt(optionalEnv('RATE_LIMIT_MAX_REQUESTS', '100'), 10),

  // Storage
  storageProvider: optionalEnv('STORAGE_PROVIDER', 's3') as 's3' | 'r2',
  awsRegion: optionalEnv('AWS_REGION', 'ap-south-1'),
  awsAccessKeyId: optionalEnv('AWS_ACCESS_KEY_ID', ''),
  awsSecretAccessKey: optionalEnv('AWS_SECRET_ACCESS_KEY', ''),
  s3BucketName: optionalEnv('S3_BUCKET_NAME', 'aknexis-files'),
  s3UploadMaxSizeMb: parseInt(optionalEnv('S3_UPLOAD_MAX_SIZE_MB', '50'), 10),

  // Email
  emailProvider: optionalEnv('EMAIL_PROVIDER', 'sendgrid') as 'sendgrid' | 'ses',
  emailFrom: optionalEnv('EMAIL_FROM', 'aknexis.in@gmail.com'),
  emailNotifyLeads: optionalEnv('EMAIL_NOTIFY_LEADS', 'aknexis.in@gmail.com'),
  sendgridApiKey: optionalEnv('SENDGRID_API_KEY', ''),

  // Analytics
  gaId: optionalEnv('NEXT_PUBLIC_GA_ID', ''),
  sentryDsn: optionalEnv('SENTRY_DSN', ''),
}
