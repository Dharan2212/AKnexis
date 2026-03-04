import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, CheckCircle2, Target, Eye } from 'lucide-react'
import HeritageBackground from '@/components/heritage/HeritageBackground'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'
import { siteConfig } from '@/lib/config/site'
import HeritageImageBackground from '@/components/heritage/HeritageImageBackground'

export const metadata: Metadata = buildMetadata({ title: pageMeta.about.title, description: pageMeta.about.description, path: '/about' })

const differentiators = [
  'Single-partner coverage from legal setup to digital growth',
  'India-specific regulatory knowledge and compliance experience',
  'Documented, structured delivery with milestone tracking',
  'Confidential handling of all business documents',
  'Post-delivery support as a standard, not an add-on',
  'No fake promises — honest timelines and scopes',
]

export default function AboutPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      {/* Hero */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-grid">
        <HeritageImageBackground src="/heritage/aknexis-londan.png" opacity={0.18} />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">About AKnexis</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
              Engineering What&apos;s Next for Indian Businesses
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              AKnexis is a complete business setup and growth partner founded to serve Indian entrepreneurs and enterprises with integrity, structure, and real expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="card-surface p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-600/10 flex items-center justify-center"><Target size={20} className="text-accent-400" /></div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>Our Mission</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To simplify the complexity of building and growing a business in India by providing structured, expert-led services that deliver real outcomes — not just deliverables.
            </p>
          </div>
          <div className="card-surface p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center"><Eye size={20} className="text-teal-400" /></div>
              <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>Our Vision</h2>
            </div>
            <p className="text-slate-400 leading-relaxed">
              To become India&apos;s most trusted end-to-end business partner — the first call every entrepreneur makes when launching, scaling, or transforming their business.
            </p>
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="py-16 bg-[#050A16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {differentiators.map((d) => (
              <div key={d} className="flex items-start gap-3 card-surface p-5">
                <CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>Where We Operate</h2>
        <div className="flex flex-wrap gap-4">
          {siteConfig.locations.slice(0, 4).map((loc) => (
            <div key={loc} className="flex items-center gap-2 px-4 py-3 card-surface">
              <MapPin size={15} className="text-teal-400" />
              <span className="text-slate-300 text-sm font-medium">{loc}</span>
            </div>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
