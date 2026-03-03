import { connectDB } from '@/lib/db/connection'
import { Lead, ILead } from '@/lib/db/models/Lead.model'
import { Client } from '@/lib/db/models/Client.model'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { isValidObjectId, toObjectId } from '@/lib/utils/objectId.util'
import { getPagination } from '@/lib/utils/pagination.util'
import { Types } from 'mongoose'

export async function createLead(data: {
  fullName: string
  email: string
  phone?: string
  companyName?: string
  serviceInterest: string
  message: string
  ipAddress?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  referrer?: string
}): Promise<ILead> {
  await connectDB()
  const lead = await Lead.create({
    ...data,
    status: 'new',
    source: 'website_contact',
  })
  return lead
}

export async function getLeads(searchParams: URLSearchParams) {
  await connectDB()
  const { page, limit, skip } = getPagination(searchParams)

  const filter: Record<string, unknown> = { deletedAt: null }

  const status = searchParams.get('status')
  const serviceInterest = searchParams.get('serviceInterest')
  const assignedTo = searchParams.get('assignedTo')
  const search = searchParams.get('search')

  if (status) filter.status = status
  if (serviceInterest) filter.serviceInterest = serviceInterest
  if (assignedTo) filter.assignedTo = isValidObjectId(assignedTo) ? toObjectId(assignedTo) : assignedTo
  if (search) {
    filter.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { companyName: { $regex: search, $options: 'i' } },
    ]
  }

  const sortBy = searchParams.get('sortBy') || 'createdAt'
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1

  const [data, total] = await Promise.all([
    Lead.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('assignedTo', 'firstName lastName email')
      .lean(),
    Lead.countDocuments(filter),
  ])

  return { data, total, page, limit }
}

export async function getLeadById(id: string): Promise<ILead> {
  if (!isValidObjectId(id)) {
    throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid lead ID', 400)
  }
  await connectDB()
  const lead = await Lead.findOne({ _id: id, deletedAt: null })
    .populate('assignedTo', 'firstName lastName email')
  if (!lead) throw new AppError(ErrorCodes.NOT_FOUND, 'Lead not found', 404)
  return lead
}

export async function updateLead(
  id: string,
  data: {
    status?: string
    assignedTo?: string
    note?: { content: string; addedBy: string }
  }
): Promise<ILead> {
  if (!isValidObjectId(id)) {
    throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid lead ID', 400)
  }
  await connectDB()

  const update: Record<string, unknown> = {}
  if (data.status) update.status = data.status
  if (data.assignedTo) update.assignedTo = isValidObjectId(data.assignedTo) ? toObjectId(data.assignedTo) : null

  const lead = await Lead.findOneAndUpdate(
    { _id: id, deletedAt: null },
    {
      $set: update,
      ...(data.note ? {
        $push: {
          notes: {
            content: data.note.content,
            addedBy: new Types.ObjectId(data.note.addedBy),
            addedAt: new Date(),
          },
        },
      } : {}),
    },
    { new: true }
  ).populate('assignedTo', 'firstName lastName email')

  if (!lead) throw new AppError(ErrorCodes.NOT_FOUND, 'Lead not found', 404)
  return lead
}

export async function deleteLead(id: string): Promise<void> {
  if (!isValidObjectId(id)) {
    throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid lead ID', 400)
  }
  await connectDB()
  const result = await Lead.findOneAndUpdate(
    { _id: id, deletedAt: null },
    { $set: { deletedAt: new Date() } }
  )
  if (!result) throw new AppError(ErrorCodes.NOT_FOUND, 'Lead not found', 404)
}

export async function convertLead(id: string, actorId: string) {
  if (!isValidObjectId(id)) {
    throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid lead ID', 400)
  }
  await connectDB()

  const lead = await Lead.findOne({ _id: id, deletedAt: null })
  if (!lead) throw new AppError(ErrorCodes.NOT_FOUND, 'Lead not found', 404)

  if (lead.convertedToClientId) {
    throw new AppError(ErrorCodes.LEAD_ALREADY_CONVERTED, 'Lead has already been converted', 400)
  }

  const client = await Client.create({
    companyName: lead.companyName || lead.fullName,
    primaryContact: {
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
    },
    originLeadId: lead._id,
    clientSince: new Date(),
    status: 'prospect',
    accountManager: isValidObjectId(actorId) ? toObjectId(actorId) : undefined,
  })

  lead.status = 'converted'
  lead.convertedAt = new Date()
  lead.convertedToClientId = client._id as Types.ObjectId
  await lead.save()

  return client
}
