import type { Metadata } from 'next'
import Link from 'next/link'
import { Cpu, ShoppingBag, HeartPulse, GraduationCap, Building2, Utensils, Car, Globe, Briefcase, Leaf } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.industries.title, description: pageMeta.industries.description, path: '/industries' })

const industries = [
  { icon: Cpu, label: 'Technology & SaaS', desc: 'Product companies, service providers, and software startups scaling in India.' },
  { icon: ShoppingBag, label: 'Retail & E-Commerce', desc: 'Online and offline retailers setting up digital-first operations.' },
  { icon: HeartPulse, label: 'Healthcare & Wellness', desc: 'Clinics, diagnostics, wellness brands, and healthtech companies.' },
  { icon: GraduationCap, label: 'Education & EdTech', desc: 'Schools, coaching centres, and digital learning platforms.' },
  { icon: Building2, label: 'Real Estate & Construction', desc: 'Developers, brokers, and construction businesses requiring compliance and digital presence.' },
  { icon: Utensils, label: 'Food & Hospitality', desc: 'Restaurants, cloud kitchens, and hospitality businesses needing FSSAI and digital setup.' },
  { icon: Car, label: 'Automotive & Mobility', desc: 'Auto dealers, service centres, and mobility startups.' },
  { icon: Globe, label: 'Professional Services', desc: 'Consultants, agencies, law firms, and chartered accountant practices.' },
  { icon: Briefcase, label: 'Finance & Fintech', desc: 'Financial advisory firms and fintech startups navigating compliance and digital growth.' },
  { icon: Leaf, label: 'Agriculture & Agritech', desc: 'Agri businesses, cooperatives, and agritech startups modernising their operations.' },
]

export default function IndustriesPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Industries', url: '/industries' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <section className="py-24 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Industries</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Industries We Serve</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Sector-aware business services for India&apos;s most dynamic industries.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {industries.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="card-surface p-6">
              <div className="w-10 h-10 rounded-lg bg-accent-600/10 flex items-center justify-center mb-4">
                <Icon size={18} className="text-accent-400" />
              </div>
              <h3 className="text-white text-sm font-semibold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>{label}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="text-slate-500 text-sm mb-4">Don&apos;t see your industry? We work with businesses across all sectors.</p>
          <Link href="/contact" className="btn-primary">Talk to Us</Link>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
