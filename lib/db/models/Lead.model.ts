import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'converted' | 'lost' | 'spam'
export type LeadServiceInterest = 'legal_registrations' | 'branding_identity' | 'web_software_development' | 'platform_setup' | 'seo_marketing' | 'support_maintenance' | 'operations_manpower' | 'not_sure'
export type LeadSource = 'website_contact' | 'referral' | 'social_media' | 'direct' | 'other'

export interface ILead extends Document {
  fullName: string
  email: string
  phone?: string
  companyName?: string
  jobTitle?: string
  serviceInterest: LeadServiceInterest
  message: string
  source: LeadSource
  status: LeadStatus
  assignedTo?: Types.ObjectId
  notes: { content: string; addedBy: Types.ObjectId; addedAt: Date }[]
  convertedToClientId?: Types.ObjectId
  convertedAt?: Date
  ipAddress?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    companyName: { type: String, trim: true },
    jobTitle: { type: String, trim: true },
    serviceInterest: {
      type: String,
      enum: ['legal_registrations', 'branding_identity', 'web_software_development', 'platform_setup', 'seo_marketing', 'support_maintenance', 'operations_manpower', 'not_sure'],
      required: true,
    },
    message: { type: String, required: true, maxlength: 2000 },
    source: {
      type: String,
      enum: ['website_contact', 'referral', 'social_media', 'direct', 'other'],
      default: 'website_contact',
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost', 'spam'],
      default: 'new',
      index: true,
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', index: true },
    notes: [
      {
        content: { type: String, required: true },
        addedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    convertedToClientId: { type: Schema.Types.ObjectId, ref: 'Client' },
    convertedAt: { type: Date },
    ipAddress: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },
    referrer: { type: String },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
)

LeadSchema.index({ createdAt: -1 })
LeadSchema.index({ source: 1 })

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)
