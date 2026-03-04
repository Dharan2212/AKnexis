import type { Metadata } from 'next'
import AdminClientLayout from './AdminClientLayout'

export const metadata: Metadata = {
  title: 'Admin — AKnexis',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#03060F] text-white">
      <AdminClientLayout>{children}</AdminClientLayout>
    </div>
  )
}