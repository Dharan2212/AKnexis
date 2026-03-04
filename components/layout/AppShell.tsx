'use client'

import { usePathname } from 'next/navigation'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/sections/FloatingWhatsApp'
import StickyCTA from '@/components/sections/StickyCTA'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) return <>{children}</>

  return (
    <>
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingWhatsApp />
      <StickyCTA />
    </>
  )
}