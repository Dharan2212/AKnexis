import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { updateProjectSchema } from '@/lib/validation/project.validation'
import { connectDB } from '@/lib/db/connection'
import { Project, PROJECT_STATUS_TRANSITIONS, ProjectStatus } from '@/lib/db/models/Project.model'
import { AppError, ErrorCodes } from '@/lib/errors/AppError'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'
import { Types } from 'mongoose'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid project ID', 400)

    await connectDB()
    const project = await Project.findOne({ _id: params.id, deletedAt: null })
      .populate('clientId', 'companyName')
      .populate('projectManager', 'firstName lastName email')
      .populate('teamMembers', 'firstName lastName email')
      .lean()

    if (!project) throw new AppError(ErrorCodes.NOT_FOUND, 'Project not found', 404)
    return successResponse(project)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid project ID', 400)

    const body = await req.json()
    const data = updateProjectSchema.parse(body)

    await connectDB()
    const existing = await Project.findOne({ _id: params.id, deletedAt: null })
    if (!existing) throw new AppError(ErrorCodes.NOT_FOUND, 'Project not found', 404)

    // Status transition validation
    if (data.status && data.status !== existing.status) {
      const allowed = PROJECT_STATUS_TRANSITIONS[existing.status as ProjectStatus]
      if (!allowed.includes(data.status as ProjectStatus)) {
        throw new AppError(
          ErrorCodes.INVALID_STATUS_TRANSITION,
          `Cannot transition from ${existing.status} to ${data.status}`,
          400
        )
      }
    }

    const { note, ...updateData } = data

    const project = await Project.findOneAndUpdate(
      { _id: params.id, deletedAt: null },
      {
        $set: updateData,
        ...(note ? {
          $push: {
            notes: {
              content: note.content,
              addedBy: new Types.ObjectId(auth.userId),
              addedAt: new Date(),
            },
          },
        } : {}),
      },
      { new: true }
    )

    const action = data.status ? 'PROJECT_STATUS_CHANGED' : 'PROJECT_UPDATED'
    await logAction({
      action,
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'project',
      entityId: params.id,
      summary: `Project "${existing.title}" updated by ${auth.email}`,
      metadata: data.status ? { from: existing.status, to: data.status } : undefined,
    })

    return successResponse(project, 'Project updated')
  } catch (error) {
    return handleApiError(error)
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'admin')
    if (!isValidObjectId(params.id)) throw new AppError(ErrorCodes.INVALID_OBJECT_ID, 'Invalid project ID', 400)

    await connectDB()
    const project = await Project.findOneAndUpdate(
      { _id: params.id, deletedAt: null },
      { $set: { deletedAt: new Date() } }
    )
    if (!project) throw new AppError(ErrorCodes.NOT_FOUND, 'Project not found', 404)

    await logAction({
      action: 'PROJECT_DELETED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'project',
      entityId: params.id,
      summary: `Project "${project.title}" soft-deleted by ${auth.email}`,
    })

    return successResponse(null, 'Project deleted')
  } catch (error) {
    return handleApiError(error)
  }
}
