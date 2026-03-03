import Link from 'next/link'
import { MapPin, CheckCircle2, ArrowRight } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { siteConfig } from '@/lib/config/site'

interface LocationPageProps {
  city: string
  state: string
  description: string
  seoContent: string
}

export default function LocationPageTemplate({ city, state, description, seoContent }: LocationPageProps) {
  return (
    <>
      <section className="py-24 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">
            <MapPin size={14} /> {city}, {state}
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-syne)' }}>
            Business Services in {city}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">{description}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link href="/contact" className="btn-primary">Get Free Consultation <ArrowRight size={16} /></Link>
            <Link href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp Us</Link>
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Services Available in {city}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteConfig.nav.services.map((s) => (
            <Link key={s.href} href={s.href} className="card-surface card-surface-hover p-5 flex items-center gap-3">
              <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
              <span className="text-slate-300 text-sm">{s.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#050A16]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-syne)' }}>
            AKnexis Business Services — {city}
          </h2>
          <div className="text-slate-500 text-sm leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: seoContent }} />
        </div>
      </section>

      <CTABanner />
    </>
  )
}
