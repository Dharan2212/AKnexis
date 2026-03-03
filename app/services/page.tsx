import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, FileText, Palette, Code2, Layout, TrendingUp, Wrench, Users } from 'lucide-react'
import HeritageBackground from '@/components/heritage/HeritageBackground'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.services.title, description: pageMeta.services.description, path: '/services' })

const services = [
  { icon: FileText, title: 'Legal Registrations & Documentation', desc: 'Company incorporation, GST, trademark, FSSAI, MSME, and all compliance documentation handled professionally.', href: '/services/legal-registrations' },
  { icon: Palette, title: 'Brand Identity Design', desc: 'Complete brand identity from logo to guidelines, ensuring your business looks credible from day one.', href: '/services/branding-identity' },
  { icon: Code2, title: 'Website & Software Development', desc: 'Custom digital solutions from landing pages to complex web applications and mobile apps.', href: '/services/web-software-development' },
  { icon: Layout, title: 'Digital Platform Setup', desc: 'E-commerce, CRM, payment systems, and the complete digital infrastructure your business needs.', href: '/services/platform-setup' },
  { icon: TrendingUp, title: 'SEO & Digital Marketing', desc: 'Organic and paid growth strategies that generate real leads and measurable visibility.', href: '/services/seo-marketing' },
  { icon: Wrench, title: 'Ongoing Support & Maintenance', desc: 'Reliable technical support and maintenance so your systems stay healthy and up-to-date.', href: '/services/support-maintenance' },
  { icon: Users, title: 'Workman Support & Operations', desc: 'Operational guidance, HR documentation, and staffing support for growing businesses.', href: '/services/operations-manpower' },
]

const faqs = [
  { question: 'Can I use AKnexis for just one service?', answer: 'Yes. While we offer end-to-end support, you can engage us for any single service based on your current needs.' },
  { question: 'How long does it take to complete a project?', answer: 'Timelines vary by scope. Legal registrations typically take 7–21 days. Web development projects range from 4–12 weeks. We provide specific timelines during the proposal stage.' },
  { question: 'Do you serve businesses outside of Chennai?', answer: 'Yes. AKnexis serves clients across Chennai, Bangalore, Hyderabad, Mumbai, and pan-India for most services.' },
  { question: 'Is the initial consultation really free?', answer: 'Yes. Our first consultation is always free with no obligation. We use it to understand your requirements before recommending a path forward.' },
]

export default function ServicesPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }])
  const faq = faqSchema(faqs)
  const svcSchemas = services.map((s) => serviceSchema(s.title, s.href, 'Business Services'))
  return (
    <>
      {[bc, faq, ...svcSchemas].map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <section className="relative py-24 overflow-hidden bg-grid">
        <HeritageBackground variant="tajMahal" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Our Services</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Everything Your Business Needs</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Seven service verticals. One accountable partner.</p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, href }) => (
            <Link key={href} href={href} className="card-surface card-surface-hover p-7 group">
              <div className="w-12 h-12 rounded-xl bg-accent-600/10 flex items-center justify-center mb-5">
                <Icon size={22} className="text-accent-400" />
              </div>
              <h2 className="text-white font-semibold text-base mb-3" style={{ fontFamily: 'var(--font-syne)' }}>{title}</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center gap-1 text-teal-400 text-sm font-medium">Learn more <ArrowRight size={14} /></div>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#050A16]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'var(--font-syne)' }}>Frequently Asked Questions</h2>
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
