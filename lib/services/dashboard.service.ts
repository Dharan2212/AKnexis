import { connectDB } from '@/lib/db/connection'
import { Lead } from '@/lib/db/models/Lead.model'
import { Client } from '@/lib/db/models/Client.model'
import { Project } from '@/lib/db/models/Project.model'
import { File } from '@/lib/db/models/File.model'

export async function getDashboardStats(role: 'admin' | 'manager' | 'staff') {
  await connectDB()

  const [clientsCount, projectsByStatus, filesCount, recentProjects] = await Promise.all([
    Client.countDocuments({ deletedAt: null }),
    Project.aggregate([
      { $match: { deletedAt: null } },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]),
    File.countDocuments({ deletedAt: null, isArchived: false }),
    Project.find({ deletedAt: null })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate('clientId', 'companyName')
      .lean(),
  ])

  const stats: Record<string, unknown> = {
    clientsCount,
    projectsCount: projectsByStatus.reduce((acc: Record<string, number>, item: { _id: string; count: number }) => {
      acc[item._id] = item.count
      return acc
    }, {}),
    filesCount,
    recentProjects,
  }

  if (role === 'admin' || role === 'manager') {
    const [leadsByStatus, recentLeads] = await Promise.all([
      Lead.aggregate([
        { $match: { deletedAt: null } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      Lead.find({ deletedAt: null }).sort({ createdAt: -1 }).limit(5).lean(),
    ])

    stats.leadsByStatus = leadsByStatus.reduce((acc: Record<string, number>, item: { _id: string; count: number }) => {
      acc[item._id] = item.count
      return acc
    }, {})
    stats.recentLeads = recentLeads
  }

  return stats
}
