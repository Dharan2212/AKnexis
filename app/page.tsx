import type { Metadata } from 'next'
import HomeHero from '@/components/sections/HomeHero'
import TrustStrip from '@/components/sections/TrustStrip'
import ServicesGrid from '@/components/sections/ServicesGrid'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import IndustriesGrid from '@/components/sections/IndustriesGrid'
import WhyChoose from '@/components/sections/WhyChoose'
import Testimonials from '@/components/sections/Testimonials'
import CTABanner from '@/components/sections/CTABanner'
import MiniContactStrip from '@/components/sections/MiniContactStrip'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({
  title: pageMeta.home.title,
  description: pageMeta.home.description,
  path: '',
})

export default function HomePage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <HomeHero />
      <TrustStrip />
      <ServicesGrid />
      <CTABanner />
      <ProcessTimeline />
      <IndustriesGrid />
      <WhyChoose />
      <Testimonials />
      <CTABanner />
      <MiniContactStrip />

      {/* SEO Content Block */}
      <section className="py-16 bg-[#050A16] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Business Setup Services in India — AKnexis
          </h2>
          <div className="prose prose-sm prose-invert max-w-none text-slate-500 space-y-4 text-sm leading-relaxed">
            <p>
              Starting and growing a business in India involves navigating a maze of legal requirements, digital channels, and operational processes. AKnexis was built to remove that complexity. As a comprehensive <strong className="text-slate-400">business setup and growth partner</strong>, we serve founders, startups, and established businesses across Chennai, Bangalore, Hyderabad, and Mumbai.
            </p>
            <p>
              Our services span every critical function — from <a href="/services/legal-registrations" className="text-teal-400 hover:underline">company registration and GST compliance</a> to <a href="/services/branding-identity" className="text-teal-400 hover:underline">brand identity design</a>, <a href="/services/web-software-development" className="text-teal-400 hover:underline">custom website and software development</a>, and <a href="/services/seo-marketing" className="text-teal-400 hover:underline">SEO and digital marketing</a>. Instead of engaging multiple agencies with no coordination, you get one accountable partner who understands your business end-to-end.
            </p>
            <p>
              Whether you are launching a startup in Tamil Nadu, expanding a retail chain into metros, or modernising the digital presence of an established professional services firm, AKnexis provides structured, professional support at every step. We operate with transparency, documented processes, and a commitment to your long-term success. <a href="/contact" className="text-teal-400 hover:underline">Get in touch for a free consultation</a> to discuss your requirements.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
