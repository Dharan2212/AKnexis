'use client'

import { useEffect, useState } from 'react'
import { UserCheck, RefreshCw } from 'lucide-react'

interface Lead {
  _id: string
  fullName: string
  email: string
  phone?: string
  companyName?: string
  serviceInterest: string
  status: string
  createdAt: string
}

const SERVICE_LABELS: Record<string, string> = {
  legal_registrations: 'Legal',
  branding_identity: 'Branding',
  web_software_development: 'Web Dev',
  platform_setup: 'Platform',
  seo_marketing: 'SEO',
  support_maintenance: 'Support',
  operations_manpower: 'Operations',
  not_sure: 'Not Sure',
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('')

  const fetchLeads = () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (statusFilter) params.set('status', statusFilter)
    fetch(`/api/leads?${params}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) { setLeads(d.data); setTotal(d.meta?.total || 0) } })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchLeads() }, [statusFilter])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
          Leads <span className="text-slate-500 text-base font-normal">({total})</span>
        </h1>
        <button onClick={fetchLeads} className="btn-secondary text-sm py-2 px-3">
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap">
        {['', 'new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost'].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? 'bg-accent-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}>
            {s ? s.replace('_', ' ') : 'All'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[1,2,3,4,5].map((i) => <div key={i} className="card-surface h-16 animate-pulse" />)}</div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block card-surface overflow-hidden">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Date</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead._id}>
                    <td className="font-medium text-white">{lead.fullName}</td>
                    <td>{lead.email}</td>
                    <td>{SERVICE_LABELS[lead.serviceInterest] || lead.serviceInterest}</td>
                    <td><span className={`badge badge-${lead.status}`}>{lead.status}</span></td>
                    <td>{new Date(lead.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {leads.map((lead) => (
              <div key={lead._id} className="card-surface p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-white text-sm">{lead.fullName}</div>
                  <span className={`badge badge-${lead.status}`}>{lead.status}</span>
                </div>
                <div className="text-slate-500 text-xs">{lead.email}</div>
                <div className="text-slate-600 text-xs mt-1">{SERVICE_LABELS[lead.serviceInterest]}</div>
              </div>
            ))}
          </div>
          {leads.length === 0 && <p className="text-slate-500 text-sm text-center py-10">No leads found.</p>}
        </>
      )}
    </div>
  )
}
