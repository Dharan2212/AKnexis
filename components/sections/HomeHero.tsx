import Link from 'next/link'
import { ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import HeritageBackground from '@/components/heritage/HeritageBackground'
import { siteConfig } from '@/lib/config/site'

const highlights = [
  'Company Registration & Compliance',
  'Brand Identity & Web Development',
  'SEO & Digital Marketing',
  'End-to-End Operational Support',
]

export default function HomeHero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-grid">
      <HeritageBackground variant="mahabalipuram" density="soft" />

      {/* Background effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-accent-600/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-teal-400/6 rounded-full blur-3xl" />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-3xl">
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-teal-400 text-xs font-medium tracking-wide">
              India&apos;s Complete Business Partner
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
            Engineering{' '}
            <span className="gradient-text">What&apos;s Next</span>{' '}
            for Your Business
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            From legal registrations to digital growth — AKnexis is your end-to-end partner for launching and scaling businesses across India. Chennai, Bangalore, Hyderabad, Mumbai.
          </p>

          {/* Highlights */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 size={15} className="text-teal-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary text-base justify-center sm:justify-start">
              Book Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base justify-center"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/5">
            {[
              { label: 'Cities Served', value: '4+' },
              { label: 'Service Verticals', value: '7' },
              { label: 'Free Consultation', value: '100%' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-syne)' }}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
