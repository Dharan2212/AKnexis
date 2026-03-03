import jwt, { type Secret, type SignOptions } from 'jsonwebtoken'
import { env } from '@/lib/config/env'

export interface JWTPayload {
  userId: string
  email: string
  role: 'admin' | 'manager' | 'staff'
  tokenVersion: number
}

export function signToken(payload: JWTPayload): string {
  const secret: Secret = env.jwtSecret

  const options: SignOptions = {
    expiresIn: env.jwtExpiresIn as SignOptions['expiresIn'],
  }

  return jwt.sign(payload, secret, options)
}

export function verifyToken(token: string): JWTPayload {
  const secret: Secret = env.jwtSecret
  return jwt.verify(token, secret) as JWTPayload
}

export function getTokenExpiry(): number {
  return 24 * 60 * 60
}