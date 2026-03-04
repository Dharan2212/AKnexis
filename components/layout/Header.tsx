'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils/cn'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: siteConfig.nav.services,
  },
  { label: 'Industries', href: '/industries' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [pathname])

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  // Close on ESC
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  const mobileDrawer = useMemo(() => {
    if (!mobileOpen) return null
    if (typeof document === 'undefined') return null

    return createPortal(
      <div className="xl:hidden fixed inset-0 z-[9999]">
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        {/* Drawer */}
        <div className="absolute top-0 right-0 h-full w-full max-w-sm bg-[#03060F]/98 border-l border-white/10 shadow-2xl overflow-y-auto">
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/5">
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-600 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
                  A
                </span>
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-syne)' }}>
                AK<span className="text-teal-400">nexis</span>
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="p-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <div key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    'block py-3 px-4 text-base rounded-lg transition-colors',
                    pathname === link.href
                      ? 'text-teal-400 bg-teal-400/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                  onClick={() => (link.children ? undefined : setMobileOpen(false))}
                >
                  {link.label}
                </Link>

                {link.children && (
                  <div className="ml-4 mt-1 space-y-1 border-l border-teal-400/20 pl-4">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-2 text-sm text-slate-400 hover:text-teal-400 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4">
              <Link
                href="/contact"
                className="btn-primary w-full text-center justify-center"
                onClick={() => setMobileOpen(false)}
              >
                Book Free Consultation
              </Link>
            </div>
          </nav>
        </div>
      </div>,
      document.body
    )
  }, [mobileOpen, pathname])

  return (
<header className="w-full glass-elevated border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-600 to-teal-400 flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>
                A
              </span>
            </div>
            <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-syne)' }}>
              AK<span className="text-teal-400">nexis</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div key={link.label} ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={cn(
                      'nav-link flex items-center gap-1 px-3 py-2 rounded-md',
                      pathname.startsWith('/services') && 'text-teal-400'
                    )}
                  >
                    {link.label}
                    <ChevronDown size={14} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
                  </button>
                  {servicesOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 card-surface py-2 z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-300 hover:text-teal-400 hover:bg-white/5 transition-colors"
                        >
                          <ArrowRight size={12} className="text-teal-400 shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn('nav-link px-3 py-2 rounded-md', pathname === link.href && 'text-teal-400')}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden sm:flex btn-primary text-sm py-2 px-4">
              Book Free Consultation
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden p-2 text-slate-400 hover:text-white"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileDrawer}
    </header>
  )
}