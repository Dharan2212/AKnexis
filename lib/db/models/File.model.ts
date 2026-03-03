import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export type FileCategory = 'contract' | 'proposal' | 'report' | 'design' | 'deliverable' | 'invoice' | 'other'
export type FileAccessLevel = 'internal' | 'client_visible'

export interface IFile extends Document {
  originalName: string
  storageKey: string
  mimeType: string
  sizeBytes: number
  extension: string
  category: FileCategory
  clientId?: Types.ObjectId
  projectId?: Types.ObjectId
  accessLevel: FileAccessLevel
  description?: string
  tags: string[]
  uploadedBy: Types.ObjectId
  isArchived: boolean
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const FileSchema = new Schema<IFile>(
  {
    originalName: { type: String, required: true },
    storageKey: { type: String, required: true, unique: true, index: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    extension: { type: String, required: true },
    category: {
      type: String,
      enum: ['contract', 'proposal', 'report', 'design', 'deliverable', 'invoice', 'other'],
      required: true,
    },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', index: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', index: true },
    accessLevel: {
      type: String,
      enum: ['internal', 'client_visible'],
      default: 'internal',
    },
    description: { type: String },
    tags: [{ type: String }],
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    isArchived: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
)

FileSchema.index({ category: 1 })

export const File: Model<IFile> =
  mongoose.models.File || mongoose.model<IFile>('File', FileSchema)
