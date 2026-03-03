import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.legalRegistrations.title, description: pageMeta.legalRegistrations.description, path: '/services/legal-registrations' })

export default function LegalRegistrationsPage() {
  return (
    <ServiceDetailTemplate
      title="Legal Registrations & Documentation"
      subtitle="Compliance & Legal"
      description="We handle all government registrations and documentation required to start, operate, and grow your business legally in India — from company incorporation to GST, trademarks, and beyond."
      href="/services/legal-registrations"
      category="Business Legal Services"
      whatYouGet={[
        'Private Limited / LLP / OPC / Proprietorship registration',
        'GST registration and return filing support',
        'Trademark filing and monitoring',
        'MSME / Udyam registration',
        'FSSAI license for food businesses',
        'Import Export Code (IEC)',
        'Shops and Establishments registration',
        'Annual compliance guidance',
      ]}
      deliverables={[
        'Certificate of Incorporation or Registration',
        'GST Certificate',
        'Trademark application filing receipt',
        'All government acknowledgment documents',
        'Compliance calendar and reminders',
      ]}
      process={[
        { step: 'Requirement Assessment', desc: 'We understand your business type and identify the registrations required.' },
        { step: 'Document Collection', desc: 'We provide a clear list of required documents and assist with preparation.' },
        { step: 'Application Filing', desc: 'We file all applications accurately with the relevant government portals.' },
        { step: 'Follow-up & Tracking', desc: 'We track application status and handle queries from government departments.' },
        { step: 'Certificate Delivery', desc: 'You receive all certificates and documents securely.' },
      ]}
      faqs={[
        { question: 'How long does company incorporation take?', answer: 'Private Limited company incorporation typically takes 10–15 working days, subject to government processing times.' },
        { question: 'Do you represent us with government authorities?', answer: 'We assist with preparation and filing. AKnexis does not represent any government authority or act as a government agent.' },
        { question: 'Can you handle GST filing too?', answer: 'Yes. We offer GST registration and initial return filing support as part of our compliance services.' },
      ]}
    />
  )
}
