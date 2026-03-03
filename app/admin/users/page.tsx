'use client'

import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'

interface AdminUser { _id: string; firstName: string; lastName: string; email: string; role: string; isActive: boolean; createdAt: string }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = () => {
    setLoading(true)
    fetch('/api/users', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) setUsers(d.data) })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsers() }, [])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>Users</h1>
        <button onClick={fetchUsers} className="btn-secondary text-sm py-2 px-3"><RefreshCw size={14} /> Refresh</button>
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="card-surface h-16 animate-pulse" />)}</div>
      ) : (
        <>
          <div className="hidden md:block card-surface overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Active</th><th>Since</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="font-medium text-white">{u.firstName} {u.lastName}</td>
                    <td>{u.email}</td>
                    <td><span className="badge badge-new capitalize">{u.role}</span></td>
                    <td><span className={u.isActive ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-3">
            {users.map((u) => (
              <div key={u._id} className="card-surface p-4">
                <div className="flex justify-between mb-1">
                  <div className="font-medium text-white text-sm">{u.firstName} {u.lastName}</div>
                  <span className="badge badge-new capitalize">{u.role}</span>
                </div>
                <div className="text-slate-500 text-xs">{u.email}</div>
              </div>
            ))}
          </div>
          {users.length === 0 && <p className="text-slate-500 text-sm text-center py-10">No users yet.</p>}
        </>
      )}
    </div>
  )
}
