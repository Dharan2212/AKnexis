import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.platformSetup.title, description: pageMeta.platformSetup.description, path: '/services/platform-setup' })

export default function PlatformSetupPage() {
  return (
    <ServiceDetailTemplate
      title="Digital Platform Setup"
      subtitle="Platform & Infrastructure"
      description="We configure and integrate the digital tools your business runs on — from e-commerce platforms to CRMs, payment gateways, booking systems, and automation workflows."
      href="/services/platform-setup"
      category="Digital Platform Services"
      whatYouGet={['E-commerce store setup (Shopify, WooCommerce, or custom)', 'CRM configuration and data migration', 'Payment gateway integration', 'Inventory and order management setup', 'Business email and communication tools', 'Automation workflow design', 'Third-party tool integrations']}
      deliverables={['Configured and tested platform', 'Admin user guide', 'Integration documentation', 'Staff training session (remote)']}
      process={[
        { step: 'Platform Audit', desc: 'We assess your current tools and identify gaps and opportunities.' },
        { step: 'Platform Selection', desc: 'We recommend the right platforms based on your budget and needs.' },
        { step: 'Setup & Configuration', desc: 'We configure the platform to your specifications.' },
        { step: 'Integration', desc: 'We connect all tools and test data flow end-to-end.' },
        { step: 'Training & Handover', desc: 'We train your team and deliver documentation.' },
      ]}
      faqs={[
        { question: 'Which e-commerce platform do you recommend?', answer: 'It depends on your product type, scale, and budget. We evaluate and recommend the best fit during consultation.' },
        { question: 'Can you migrate data from an existing system?', answer: 'Yes. We handle data migration with validation to ensure no data loss.' },
      ]}
    />
  )
}
