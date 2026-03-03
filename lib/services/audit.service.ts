import { connectDB } from '@/lib/db/connection'
import { ActivityLog, AuditAction, AuditEntityType, AuditActorRole } from '@/lib/db/models/ActivityLog.model'
import { logger } from '@/lib/utils/logger'
import { Types } from 'mongoose'

interface LogActionOptions {
  action: AuditAction
  actorUserId?: string | null
  actorRole: AuditActorRole
  entityType: AuditEntityType
  entityId?: string
  summary: string
  metadata?: Record<string, unknown>
  ipAddress?: string
  userAgent?: string
}

export async function logAction(options: LogActionOptions): Promise<void> {
  try {
    await connectDB()
    await ActivityLog.create({
      action: options.action,
      actorUserId: options.actorUserId ? new Types.ObjectId(options.actorUserId) : null,
      actorRole: options.actorRole,
      entityType: options.entityType,
      entityId: options.entityId ? new Types.ObjectId(options.entityId) : undefined,
      summary: options.summary,
      metadata: options.metadata,
      ipAddress: options.ipAddress,
      userAgent: options.userAgent,
    })
  } catch (error) {
    logger.error('Failed to write audit log', {
      action: options.action,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
