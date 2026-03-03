'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Search } from 'lucide-react'

interface AuditLog {
  _id: string
  action: string
  actorRole: string
  actorUserId?: { firstName: string; lastName: string } | null
  entityType: string
  summary: string
  ipAddress?: string
  createdAt: string
}

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [entityType, setEntityType] = useState('')

  const fetchLogs = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (entityType) params.set('entityType', entityType)
    fetch(`/api/audit?${params}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) { setLogs(d.data); setTotal(d.meta?.total || 0) } })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchLogs() }, [entityType])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
          Audit Log <span className="text-slate-500 text-base font-normal">({total})</span>
        </h1>
        <button onClick={fetchLogs} className="btn-secondary text-sm py-2 px-3"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchLogs()}
            placeholder="Search..." className="form-input pl-8 py-2 text-sm w-52" />
        </div>
        <select value={entityType} onChange={(e) => setEntityType(e.target.value)} className="form-input py-2 text-sm w-40">
          <option value="">All types</option>
          {['lead','client','project','file','user','auth'].map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4,5].map((i) => <div key={i} className="card-surface h-12 animate-pulse" />)}</div>
      ) : (
        <>
          <div className="hidden md:block card-surface overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Action</th><th>Actor</th><th>Entity</th><th>Summary</th><th>Time</th></tr></thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td><span className="font-mono text-xs text-teal-400">{log.action}</span></td>
                    <td className="text-xs">{log.actorUserId ? `${log.actorUserId.firstName} ${log.actorUserId.lastName}` : <span className="text-slate-600">public</span>}</td>
                    <td><span className="badge badge-new capitalize">{log.entityType}</span></td>
                    <td className="text-slate-400 text-xs max-w-xs truncate">{log.summary}</td>
                    <td className="text-xs text-slate-500">{new Date(log.createdAt).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-2">
            {logs.map((log) => (
              <div key={log._id} className="card-surface p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-teal-400">{log.action}</span>
                  <span className="text-slate-600 text-xs">{new Date(log.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <div className="text-slate-400 text-xs">{log.summary}</div>
              </div>
            ))}
          </div>
          {logs.length === 0 && <p className="text-slate-500 text-sm text-center py-10">No audit logs found.</p>}
        </>
      )}
    </div>
  )
}
