import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.seoMarketing.title, description: pageMeta.seoMarketing.description, path: '/services/seo-marketing' })

export default function SEOMarketingPage() {
  return (
    <ServiceDetailTemplate
      title="SEO & Digital Marketing"
      subtitle="Growth & Visibility"
      description="We help your business get found online and convert that visibility into qualified leads. Our data-driven approach covers organic search, paid advertising, and social media — tailored for the Indian market."
      href="/services/seo-marketing"
      category="Digital Marketing Services"
      whatYouGet={['Technical SEO audit and on-page optimisation', 'Keyword research and content strategy', 'Google Business Profile optimisation', 'Google Ads campaign setup and management', 'Social media strategy and content calendar', 'Monthly performance reporting', 'Competitor analysis and benchmarking']}
      deliverables={['SEO audit report', 'Keyword strategy document', 'Optimised website pages', 'Ad campaign setup and initial creatives', 'Monthly performance report']}
      process={[
        { step: 'Audit', desc: 'We analyse your current digital presence and identify gaps.' },
        { step: 'Strategy', desc: 'We develop a 90-day growth plan with measurable targets.' },
        { step: 'Execution', desc: 'On-page, off-page, and paid campaign implementation.' },
        { step: 'Monitor', desc: 'We track rankings, traffic, and conversions weekly.' },
        { step: 'Optimise', desc: 'Monthly reviews and iterative improvements.' },
      ]}
      faqs={[
        { question: 'How long before I see SEO results?', answer: 'SEO is a medium-term investment. Most clients begin seeing measurable improvements in organic traffic within 3–6 months.' },
        { question: 'Is a Google Ads budget included?', answer: 'No. The ad spend budget is separate and managed directly through your Google account. We charge for campaign management.' },
      ]}
    />
  )
}
