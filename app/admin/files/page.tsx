'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, Download } from 'lucide-react'

interface FileRecord {
  _id: string
  originalName: string
  category: string
  mimeType: string
  sizeBytes: number
  uploadedBy?: { firstName: string; lastName: string }
  createdAt: string
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function AdminFilesPage() {
  const [files, setFiles] = useState<FileRecord[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const fetchFiles = () => {
    setLoading(true)
    fetch('/api/files', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.success) { setFiles(d.data); setTotal(d.meta?.total || 0) } })
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchFiles() }, [])

  const handleDownload = async (id: string) => {
    const res = await fetch(`/api/files/${id}/download`, { credentials: 'include' })
    const data = await res.json()
    if (data.success) window.open(data.data.downloadUrl, '_blank')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
          Files <span className="text-slate-500 text-base font-normal">({total})</span>
        </h1>
        <button onClick={fetchFiles} className="btn-secondary text-sm py-2 px-3"><RefreshCw size={14} /> Refresh</button>
      </div>
      {loading ? (
        <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="card-surface h-16 animate-pulse" />)}</div>
      ) : (
        <>
          <div className="hidden md:block card-surface overflow-hidden">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Category</th><th>Size</th><th>Uploaded By</th><th>Date</th><th></th></tr></thead>
              <tbody>
                {files.map((f) => (
                  <tr key={f._id}>
                    <td className="font-medium text-white text-sm">{f.originalName}</td>
                    <td><span className="badge badge-new capitalize">{f.category}</span></td>
                    <td className="text-slate-500 text-xs">{formatSize(f.sizeBytes)}</td>
                    <td>{f.uploadedBy ? `${f.uploadedBy.firstName} ${f.uploadedBy.lastName}` : '—'}</td>
                    <td>{new Date(f.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <button onClick={() => handleDownload(f._id)} className="text-teal-400 hover:text-teal-300 p-1">
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden space-y-3">
            {files.map((f) => (
              <div key={f._id} className="card-surface p-4 flex items-center justify-between">
                <div>
                  <div className="text-white text-sm font-medium">{f.originalName}</div>
                  <div className="text-slate-500 text-xs">{formatSize(f.sizeBytes)} · {f.category}</div>
                </div>
                <button onClick={() => handleDownload(f._id)} className="text-teal-400"><Download size={16} /></button>
              </div>
            ))}
          </div>
          {files.length === 0 && <p className="text-slate-500 text-sm text-center py-10">No files yet.</p>}
        </>
      )}
    </div>
  )
}
