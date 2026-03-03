'use client'

import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface Client {
  _id: string
  companyName: string
  primaryContact: { fullName: string; email: string }
  status: string
  industry?: string
  createdAt: string
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchClients = () => {
    setLoading(true)
    fetch('/api/clients', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) { setClients(d.data); setTotal(d.meta?.total || 0) } })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchClients() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
          Clients <span className="text-slate-500 text-base font-normal">({total})</span>
        </h1>
        <button onClick={fetchClients} className="btn-secondary text-sm py-2 px-3">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="card-surface h-16 animate-pulse" />)}</div>
      ) : (
        <>
          <div className="hidden md:block card-surface overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Company</th><th>Contact</th><th>Industry</th><th>Status</th><th>Since</th></tr></thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c._id}>
                    <td className="font-medium text-white">{c.companyName}</td>
                    <td><div>{c.primaryContact.fullName}</div><div className="text-slate-500 text-xs">{c.primaryContact.email}</div></td>
                    <td>{c.industry || '—'}</td>
                    <td><span className={`badge badge-${c.status}`}>{c.status}</span></td>
                    <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-3">
            {clients.map((c) => (
              <div key={c._id} className="card-surface p-4">
                <div className="flex items-start justify-between mb-1">
                  <div className="font-medium text-white text-sm">{c.companyName}</div>
                  <span className={`badge badge-${c.status}`}>{c.status}</span>
                </div>
                <div className="text-slate-500 text-xs">{c.primaryContact.email}</div>
              </div>
            ))}
          </div>
          {clients.length === 0 && <p className="text-slate-500 text-sm text-center py-10">No clients yet.</p>}
        </>
      )}
    </div>
  )
}
