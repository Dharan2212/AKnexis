import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export type ClientStatus = 'active' | 'inactive' | 'churned' | 'prospect'

export interface IClient extends Document {
  companyName: string
  industry?: string
  companySize?: 'solo' | '2-10' | '11-50' | '51-200' | '200+'
  website?: string
  description?: string
  primaryContact: {
    fullName: string
    email: string
    phone?: string
    jobTitle?: string
  }
  additionalContacts?: {
    fullName: string
    email: string
    phone?: string
    jobTitle?: string
  }[]
  status: ClientStatus
  accountManager?: Types.ObjectId
  originLeadId?: Types.ObjectId
  clientSince: Date
  billingEmail?: string
  billingAddress?: {
    line1?: string
    line2?: string
    city?: string
    state?: string
    pincode?: string
    country?: string
  }
  notes: { content: string; addedBy: Types.ObjectId; addedAt: Date }[]
  tags: string[]
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const ClientSchema = new Schema<IClient>(
  {
    companyName: { type: String, required: true, trim: true, index: true },
    industry: { type: String, trim: true },
    companySize: { type: String, enum: ['solo', '2-10', '11-50', '51-200', '200+'] },
    website: { type: String, trim: true },
    description: { type: String },
    primaryContact: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, lowercase: true, index: true },
      phone: { type: String },
      jobTitle: { type: String },
    },
    additionalContacts: [
      {
        fullName: { type: String },
        email: { type: String, lowercase: true },
        phone: { type: String },
        jobTitle: { type: String },
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'churned', 'prospect'],
      default: 'active',
      index: true,
    },
    accountManager: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    originLeadId: { type: Schema.Types.ObjectId, ref: 'Lead' },
    clientSince: { type: Date, required: true, default: Date.now },
    billingEmail: { type: String, lowercase: true },
    billingAddress: {
      line1: String,
      line2: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' },
    },
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

ClientSchema.index({ companyName: 'text' })

export const Client: Model<IClient> =
  mongoose.models.Client || mongoose.model<IClient>('Client', ClientSchema)
