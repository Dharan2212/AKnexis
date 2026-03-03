import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export type AuditAction =
  | 'LEAD_CREATED' | 'LEAD_UPDATED' | 'LEAD_CONVERTED' | 'LEAD_DELETED'
  | 'CLIENT_CREATED' | 'CLIENT_UPDATED' | 'CLIENT_DELETED'
  | 'PROJECT_CREATED' | 'PROJECT_UPDATED' | 'PROJECT_STATUS_CHANGED' | 'PROJECT_DELETED'
  | 'FILE_UPLOAD_REQUESTED' | 'FILE_REGISTERED' | 'FILE_DOWNLOAD_REQUESTED' | 'FILE_DELETED'
  | 'USER_CREATED' | 'USER_UPDATED' | 'USER_DELETED'
  | 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT'

export type AuditEntityType = 'lead' | 'client' | 'project' | 'file' | 'user' | 'auth' | 'system'
export type AuditActorRole = 'public' | 'staff' | 'manager' | 'admin'

export interface IActivityLog extends Document {
  action: AuditAction
  actorUserId: Types.ObjectId | null
  actorRole: AuditActorRole
  ipAddress?: string
  userAgent?: string
  entityType: AuditEntityType
  entityId?: Types.ObjectId
  summary: string
  metadata?: Record<string, unknown>
  createdAt: Date
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    action: { type: String, required: true },
    actorUserId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    actorRole: {
      type: String,
      enum: ['public', 'staff', 'manager', 'admin'],
      required: true,
    },
    ipAddress: { type: String },
    userAgent: { type: String },
    entityType: {
      type: String,
      enum: ['lead', 'client', 'project', 'file', 'user', 'auth', 'system'],
      required: true,
    },
    entityId: { type: Schema.Types.ObjectId },
    summary: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

ActivityLogSchema.index({ createdAt: -1 })
ActivityLogSchema.index({ entityType: 1, entityId: 1 })
ActivityLogSchema.index({ actorUserId: 1 })

export const ActivityLog: Model<IActivityLog> =
  mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema)
