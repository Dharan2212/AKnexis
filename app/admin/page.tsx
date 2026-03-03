'use client'

import { useEffect, useState } from 'react'
import { Users, FolderOpen, Files, UserCheck, TrendingUp } from 'lucide-react'

interface DashboardData {
  clientsCount: number
  filesCount: number
  projectsCount: Record<string, number>
  leadsByStatus?: Record<string, number>
  recentLeads?: { fullName: string; email: string; serviceInterest: string; createdAt: string }[]
  recentProjects?: { title: string; status: string; createdAt: string }[]
}

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) setData(d.data) })
      .finally(() => setLoading(false))
  }, [])

  const totalProjects = data ? Object.values(data.projectsCount).reduce((a, b) => a + b, 0) : 0
  const totalLeads = data?.leadsByStatus ? Object.values(data.leadsByStatus).reduce((a, b) => a + b, 0) : null

  const stats = [
    { icon: UserCheck, label: 'Total Leads', value: totalLeads !== null ? String(totalLeads) : '—', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Users, label: 'Clients', value: data ? String(data.clientsCount) : '—', color: 'text-teal-400', bg: 'bg-teal-400/10' },
    { icon: FolderOpen, label: 'Projects', value: data ? String(totalProjects) : '—', color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { icon: Files, label: 'Files', value: data ? String(data.filesCount) : '—', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ]

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>Dashboard</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map((i) => <div key={i} className="card-surface p-6 h-24 animate-pulse" />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="card-surface p-6">
            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <div className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>{value}</div>
            <div className="text-xs text-slate-500">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lead Status */}
        {data?.leadsByStatus && (
          <div className="card-surface p-6">
            <h2 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Leads by Status</h2>
            <div className="space-y-2">
              {Object.entries(data.leadsByStatus).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm capitalize">{status.replace('_', ' ')}</span>
                  <span className={`badge badge-${status}`}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Status */}
        {data?.projectsCount && (
          <div className="card-surface p-6">
            <h2 className="text-sm font-semibold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Projects by Status</h2>
            <div className="space-y-2">
              {Object.entries(data.projectsCount).map(([status, count]) => (
                <div key={status} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm capitalize">{status.replace('_', ' ')}</span>
                  <span className={`badge badge-${status}`}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
