import type { Metadata } from 'next'
import AdminClientLayout from './AdminClientLayout'
import '@/styles/globals.css'
import { Syne, Plus_Jakarta_Sans } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' })

export const metadata: Metadata = {
  title: 'Admin — AKnexis',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakarta.variable}`}>
      <body className="font-body antialiased bg-[#03060F] text-white">
        <AdminClientLayout>{children}</AdminClientLayout>
      </body>
    </html>
  )
}
