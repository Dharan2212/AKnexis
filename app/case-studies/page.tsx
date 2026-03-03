import type { Metadata } from 'next'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.casestudies.title, description: pageMeta.casestudies.description, path: '/case-studies' })

const cases = [
  {
    industry: 'Technology Startup',
    location: 'Chennai',
    challenge: 'A two-person tech team needed company registration, a professional brand, and a website before their first investor meeting.',
    approach: 'We handled Private Limited company incorporation, designed a complete brand identity, and built a responsive marketing website — in parallel.',
    result: 'Delivered all three within five weeks. The founders attended their investor meeting with a registered company, a professional brand, and a live website.',
  },
  {
    industry: 'Retail Business',
    location: 'Bangalore',
    challenge: 'A growing retail chain was operating without GST registration and needed an e-commerce presence urgently.',
    approach: 'We filed GST registration immediately and began e-commerce platform setup simultaneously, with payment gateway integration.',
    result: 'GST certificate received in 12 days. E-commerce store launched within four weeks and began generating online orders.',
  },
  {
    industry: 'Professional Services Firm',
    location: 'Hyderabad',
    challenge: 'An established firm had zero digital presence and was losing potential clients to less experienced but more digitally visible competitors.',
    approach: 'We developed a new brand identity, built a professional website, and implemented a local SEO strategy targeting service-specific keywords.',
    result: 'Measurable improvement in Google rankings for target keywords within 90 days and a consistent stream of inbound enquiries.',
  },
]

export default function CaseStudiesPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Case Studies', url: '/case-studies' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <section className="py-24 bg-grid text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Case Studies</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Real Work. Real Results.</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Illustrated outcomes from our work with businesses across India. Client names are withheld for confidentiality.</p>
        </div>
      </section>

      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
        {cases.map((c, i) => (
          <div key={i} className="card-surface p-8">
            <div className="flex flex-wrap gap-3 mb-5">
              <span className="px-2 py-0.5 rounded bg-accent-600/15 text-accent-400 text-xs font-medium">{c.industry}</span>
              <span className="px-2 py-0.5 rounded bg-teal-400/10 text-teal-400 text-xs font-medium">{c.location}</span>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="text-xs text-slate-600 uppercase font-semibold mb-2 tracking-wide">Challenge</div>
                <p className="text-slate-400 leading-relaxed">{c.challenge}</p>
              </div>
              <div>
                <div className="text-xs text-slate-600 uppercase font-semibold mb-2 tracking-wide">Our Approach</div>
                <p className="text-slate-400 leading-relaxed">{c.approach}</p>
              </div>
              <div>
                <div className="text-xs text-teal-500 uppercase font-semibold mb-2 tracking-wide">Result</div>
                <p className="text-teal-300 leading-relaxed">{c.result}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      <CTABanner />
    </>
  )
}
