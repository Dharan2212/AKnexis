'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard, Users, UserCheck, FolderOpen, Files,
  ClipboardList, LogOut, Menu, X, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: 'admin' | 'manager' | 'staff'
}

const navItems = [
  { href: '/admin', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'manager', 'staff'] },
  { href: '/admin/leads', icon: UserCheck, label: 'Leads', roles: ['admin', 'manager'] },
  { href: '/admin/clients', icon: Users, label: 'Clients', roles: ['admin', 'manager', 'staff'] },
  { href: '/admin/projects', icon: FolderOpen, label: 'Projects', roles: ['admin', 'manager', 'staff'] },
  { href: '/admin/files', icon: Files, label: 'Files', roles: ['admin', 'manager', 'staff'] },
  { href: '/admin/users', icon: Users, label: 'Users', roles: ['admin'] },
  { href: '/admin/audit', icon: ClipboardList, label: 'Audit Log', roles: ['admin', 'manager'] },
]

export default function AdminClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) { setLoading(false); return }
    fetch('/api/auth/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setUser(data.data)
        else router.push('/admin/login')
      })
      .catch(() => router.push('/admin/login'))
      .finally(() => setLoading(false))
  }, [isLoginPage, router])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include', headers: { 'x-aknexis-csrf': '1' } })
    router.push('/admin/login')
  }

  if (isLoginPage) return <>{children}</>

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-teal-400/30 border-t-teal-400 rounded-full animate-spin" />
      </div>
    )
  }

  const filteredNav = navItems.filter((item) => user && item.roles.includes(user.role))

  const Sidebar = () => (
    <div className="admin-sidebar w-60 flex flex-col h-full">
      <div className="p-5 border-b border-white/5">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent-600 to-teal-400 flex items-center justify-center">
            <span className="text-white font-bold text-xs" style={{ fontFamily: 'var(--font-syne)' }}>A</span>
          </div>
          <span className="text-white font-bold" style={{ fontFamily: 'var(--font-syne)' }}>AKnexis <span className="text-slate-600 text-xs font-normal">Admin</span></span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {filteredNav.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setSidebarOpen(false)}
            className={cn('admin-nav-item', pathname === href && 'active')}
          >
            <Icon size={16} />
            {label}
            {pathname === href && <ChevronRight size={14} className="ml-auto" />}
          </Link>
        ))}
      </nav>

      <div className="p-3 border-t border-white/5">
        {user && (
          <div className="px-3 py-2 mb-2">
            <div className="text-sm text-white font-medium">{user.firstName} {user.lastName}</div>
            <div className="text-xs text-slate-500 capitalize">{user.role}</div>
          </div>
        )}
        <button onClick={handleLogout} className="admin-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-400/10">
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="flex flex-col w-60 bg-[#050A16]"><Sidebar /></div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="text-slate-400">
            <Menu size={22} />
          </button>
          <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>AKnexis Admin</span>
          <div className="w-6" />
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
