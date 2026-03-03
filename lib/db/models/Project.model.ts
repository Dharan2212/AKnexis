import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export type ProjectStatus = 'scoping' | 'proposal' | 'active' | 'on_hold' | 'completed' | 'cancelled'
export type ProjectType = 'software_engineering' | 'growth_intelligence' | 'business_foundation' | 'internal'
export type ProjectPriority = 'low' | 'medium' | 'high' | 'critical'

export const PROJECT_STATUS_TRANSITIONS: Record<ProjectStatus, ProjectStatus[]> = {
  scoping: ['proposal', 'cancelled'],
  proposal: ['active', 'scoping', 'cancelled'],
  active: ['on_hold', 'completed', 'cancelled'],
  on_hold: ['active', 'cancelled'],
  completed: [],
  cancelled: [],
}

export interface IProject extends Document {
  title: string
  description?: string
  clientId: Types.ObjectId
  type: ProjectType
  status: ProjectStatus
  priority: ProjectPriority
  startDate?: Date
  targetEndDate?: Date
  actualEndDate?: Date
  projectManager?: Types.ObjectId
  teamMembers: Types.ObjectId[]
  completionPercent: number
  milestones?: { title: string; dueDate?: Date; completed: boolean }[]
  notes?: { content: string; addedBy: Types.ObjectId; addedAt: Date }[]
  tags: string[]
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String },
    clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true, index: true },
    type: {
      type: String,
      enum: ['software_engineering', 'growth_intelligence', 'business_foundation', 'internal'],
      required: true,
    },
    status: {
      type: String,
      enum: ['scoping', 'proposal', 'active', 'on_hold', 'completed', 'cancelled'],
      default: 'scoping',
      index: true,
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    startDate: { type: Date },
    targetEndDate: { type: Date, index: true },
    actualEndDate: { type: Date },
    projectManager: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    completionPercent: { type: Number, default: 0, min: 0, max: 100 },
    milestones: [
      {
        title: { type: String, required: true },
        dueDate: { type: Date },
        completed: { type: Boolean, default: false },
      },
    ],
    notes: [
      {
        content: { type: String, required: true },
        addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    tags: [{ type: String }],
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
)

export const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
