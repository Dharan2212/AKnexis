import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.brandingIdentity.title, description: pageMeta.brandingIdentity.description, path: '/services/branding-identity' })

export default function BrandingIdentityPage() {
  return (
    <ServiceDetailTemplate
      title="Brand Identity Design"
      subtitle="Branding & Design"
      description="A strong brand is the foundation of trust. We create cohesive, professional brand identities that communicate your values, attract your audience, and differentiate you in your market."
      href="/services/branding-identity"
      category="Branding & Design Services"
      whatYouGet={['Primary logo and variations', 'Brand colour palette and typography system', 'Brand guidelines document', 'Business card and letterhead design', 'Social media profile assets', 'Favicon and digital icon set', 'Brand voice and positioning notes']}
      deliverables={['Logo files in all formats (SVG, PNG, PDF)', 'Brand guidelines PDF', 'Editable design source files', 'Social media kit', 'Print-ready stationery files']}
      process={[
        { step: 'Discovery', desc: 'We learn about your business, audience, and brand aspirations.' },
        { step: 'Research & Concepts', desc: 'We develop 2–3 distinct brand directions for your review.' },
        { step: 'Design Development', desc: 'You select a direction and we refine it to completion.' },
        { step: 'Brand Guidelines', desc: 'We document usage rules, colours, fonts, and do-nots.' },
        { step: 'Asset Delivery', desc: 'All files delivered in organised folders ready for use.' },
      ]}
      faqs={[
        { question: 'How many revisions are included?', answer: 'Our standard package includes two rounds of revisions at each stage. Additional revisions are available at a nominal fee.' },
        { question: 'Do you provide the source files?', answer: 'Yes. You receive all source files (AI, Figma, or similar) so you fully own your brand assets.' },
      ]}
    />
  )
}
