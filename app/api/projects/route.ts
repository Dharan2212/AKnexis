import { NextRequest } from 'next/server'
import { getAuthUser, requireRole } from '@/lib/middleware/auth.middleware'
import { createProjectSchema } from '@/lib/validation/project.validation'
import { connectDB } from '@/lib/db/connection'
import { Project } from '@/lib/db/models/Project.model'
import { getPagination } from '@/lib/utils/pagination.util'
import { isValidObjectId } from '@/lib/utils/objectId.util'
import { handleApiError } from '@/lib/errors/errorHandler'
import { successResponse, paginatedResponse } from '@/lib/utils/response.util'
import { logAction } from '@/lib/services/audit.service'

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'manager')

    const body = await req.json()
    const data = createProjectSchema.parse(body)

    await connectDB()
    const project = await Project.create({
      ...data,
      startDate: data.startDate ? new Date(data.startDate) : undefined,
      targetEndDate: data.targetEndDate ? new Date(data.targetEndDate) : undefined,
    })

    await logAction({
      action: 'PROJECT_CREATED',
      actorUserId: auth.userId,
      actorRole: auth.role,
      entityType: 'project',
      entityId: String(project._id),
      summary: `Project "${project.title}" created by ${auth.email}`,
    })

    return successResponse(project, 'Project created', 201)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthUser(req)
    requireRole(auth, 'staff')

    await connectDB()
    const { page, limit, skip } = getPagination(req.nextUrl.searchParams)

    const filter: Record<string, unknown> = { deletedAt: null }
    const status = req.nextUrl.searchParams.get('status')
    const type = req.nextUrl.searchParams.get('type')
    const clientId = req.nextUrl.searchParams.get('clientId')
    const projectManager = req.nextUrl.searchParams.get('projectManager')
    const search = req.nextUrl.searchParams.get('search')

    if (status) filter.status = status
    if (type) filter.type = type
    if (clientId && isValidObjectId(clientId)) filter.clientId = clientId
    if (projectManager && isValidObjectId(projectManager)) filter.projectManager = projectManager
    if (search) filter.title = { $regex: search, $options: 'i' }

    const [data, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('clientId', 'companyName')
        .populate('projectManager', 'firstName lastName')
        .lean(),
      Project.countDocuments(filter),
    ])

    return paginatedResponse(data, total, page, limit)
  } catch (error) {
    return handleApiError(error)
  }
}
