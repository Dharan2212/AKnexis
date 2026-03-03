'use client'

import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface Project {
  _id: string
  title: string
  status: string
  type: string
  priority: string
  clientId?: { companyName: string }
  createdAt: string
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchProjects = () => {
    setLoading(true)
    fetch('/api/projects', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) { setProjects(d.data); setTotal(d.meta?.total || 0) } })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchProjects() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
          Projects <span className="text-slate-500 text-base font-normal">({total})</span>
        </h1>
        <button onClick={fetchProjects} className="btn-secondary text-sm py-2 px-3"><RefreshCw size={14} /> Refresh</button>
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="card-surface h-16 animate-pulse" />)}</div>
      ) : (
        <>
          <div className="hidden md:block card-surface overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Title</th><th>Client</th><th>Type</th><th>Status</th><th>Priority</th></tr></thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p._id}>
                    <td className="font-medium text-white">{p.title}</td>
                    <td>{p.clientId?.companyName || '—'}</td>
                    <td className="text-slate-500 text-xs">{p.type.replace('_', ' ')}</td>
                    <td><span className={`badge badge-${p.status}`}>{p.status}</span></td>
                    <td><span className="text-slate-400 text-xs capitalize">{p.priority}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-3">
            {projects.map((p) => (
              <div key={p._id} className="card-surface p-4">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-white text-sm">{p.title}</div>
                  <span className={`badge badge-${p.status}`}>{p.status}</span>
                </div>
                <div className="text-slate-500 text-xs">{p.clientId?.companyName}</div>
              </div>
            ))}
          </div>
          {projects.length === 0 && <p className="text-slate-500 text-sm text-center py-10">No projects yet.</p>}
        </>
      )}
    </div>
  )
}
