import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/config/seo'

interface ServicePageProps {
  title: string
  subtitle: string
  description: string
  href: string
  category: string
  whatYouGet: string[]
  deliverables: string[]
  process: { step: string; desc: string }[]
  faqs: { question: string; answer: string }[]
}

export default function ServiceDetailTemplate({
  title, subtitle, description, href, category, whatYouGet, deliverables, process, faqs,
}: ServicePageProps) {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }, { name: title, url: href }])
  const faq = faqSchema(faqs)
  const svcSchema = serviceSchema(title, href, category)

  return (
    <>
      {[bc, faq, svcSchema].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* Hero */}
      <section className="py-24 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Link href="/services" className="text-slate-500 text-sm hover:text-teal-400 transition-colors mb-6 inline-flex items-center gap-1">
            ← All Services
          </Link>
          <div className="max-w-3xl">
            <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-3">{subtitle}</div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-syne)' }}>{title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">Get Started <ArrowRight size={16} /></Link>
              <Link href="/pricing" className="btn-secondary">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* What you get + Deliverables */}
      <section className="py-16 bg-[#050A16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>What You Get</h2>
            <ul className="space-y-3">
              {whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                  <CheckCircle2 size={15} className="text-teal-400 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-syne)' }}>Deliverables</h2>
            <ul className="space-y-3">
              {deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-slate-300 text-sm">
                  <ArrowRight size={14} className="text-accent-400 shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Our Process</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {process.map((p, i) => (
            <div key={p.step} className="card-surface p-6">
              <div className="text-3xl font-bold text-white/5 mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-white text-sm font-semibold mb-1">{p.step}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#050A16]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'var(--font-syne)' }}>FAQ</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="card-surface p-6">
                <h3 className="text-white text-sm font-semibold mb-2">{faq.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  )
}
