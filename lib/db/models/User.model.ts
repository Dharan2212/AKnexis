import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: 'admin' | 'manager' | 'staff'
  isActive: boolean
  lastLoginAt?: Date
  tokenVersion: number
  deletedAt: Date | null
  createdAt: Date
  updatedAt: Date
  fullName: string
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['admin', 'manager', 'staff'],
      default: 'staff',
      index: true,
    },
    isActive: { type: Boolean, default: true, index: true },
    lastLoginAt: { type: Date },
    tokenVersion: { type: Number, default: 0 },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

UserSchema.virtual('fullName').get(function (this: IUser) {
  return `${this.firstName} ${this.lastName}`
})

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
