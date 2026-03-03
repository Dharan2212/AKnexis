import mongoose from 'mongoose'
import { env } from '@/lib/config/env'
import { logger } from '@/lib/utils/logger'

interface CachedConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: CachedConnection | undefined
}

const cached: CachedConnection = global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      dbName: env.mongodbDbName,
      bufferCommands: false,
    }

    cached.promise = mongoose
      .connect(env.mongodbUri, opts)
      .then((mongooseInstance) => {
        logger.info('MongoDB connected', { db: env.mongodbDbName })
        return mongooseInstance
      })
      .catch((err) => {
        logger.error('MongoDB connection failed', { error: err.message })
        cached.promise = null
        throw err
      })
  }

  cached.conn = await cached.promise
  return cached.conn
}
