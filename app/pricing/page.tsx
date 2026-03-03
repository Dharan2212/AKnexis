import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.pricing.title, description: pageMeta.pricing.description, path: '/pricing' })

const packages = [
  {
    name: 'Starter',
    tagline: 'For businesses just getting started',
    price: 'Custom',
    features: ['Company registration (one type)', 'Basic brand identity (logo + colours)', 'Single-page website', 'Google Business Profile setup', 'Email setup', 'GST registration'],
    cta: 'Get a Quote',
    highlight: false,
  },
  {
    name: 'Growth',
    tagline: 'For businesses ready to scale digitally',
    price: 'Custom',
    features: ['All Starter features', 'Full brand identity package', 'Multi-page website or web app', 'SEO foundation setup', 'Social media strategy', 'CRM or platform setup', '3-month support included'],
    cta: 'Get a Quote',
    highlight: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For established businesses with complex needs',
    price: 'Custom',
    features: ['All Growth features', 'Custom software development', 'Full digital marketing management', 'Operations documentation', 'Dedicated account manager', 'Priority support SLA', 'Quarterly business reviews'],
    cta: 'Talk to Us',
    highlight: false,
  },
]

export default function PricingPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <section className="py-24 bg-grid text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Pricing</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Transparent, Custom Pricing</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Every business is unique. We provide custom quotes based on your specific requirements — no hidden fees, no surprises.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div key={pkg.name} className={`card-surface p-8 relative ${pkg.highlight ? 'border-accent-600/40 ring-1 ring-accent-600/30' : ''}`}>
              {pkg.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent-600 rounded-full text-white text-xs font-medium">
                  Most Popular
                </div>
              )}
              <h2 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-syne)' }}>{pkg.name}</h2>
              <p className="text-slate-500 text-sm mb-6">{pkg.tagline}</p>
              <div className="text-2xl font-bold text-teal-400 mb-6">{pkg.price}</div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle2 size={14} className="text-teal-400 shrink-0 mt-0.5" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={pkg.highlight ? 'btn-primary w-full justify-center' : 'btn-secondary w-full justify-center'}>
                {pkg.cta}
              </Link>
            </div>
          ))}
        </div>
        <p className="text-center text-slate-600 text-xs mt-8">
          All prices are custom-quoted and exclude applicable taxes. Government fees for registrations are additional and charged at actuals. AKnexis does not represent any government authority.
        </p>
      </section>

      <CTABanner />
    </>
  )
}
