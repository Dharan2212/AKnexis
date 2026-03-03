import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.operationsManpower.title, description: pageMeta.operationsManpower.description, path: '/services/operations-manpower' })

export default function OperationsManpowerPage() {
  return (
    <ServiceDetailTemplate
      title="Workman Support & Operational Guidance"
      subtitle="Operations & HR"
      description="Running a business involves people, processes, and documentation. We help you structure your operations — from HR documentation and compliance to process documentation and operational guidance."
      href="/services/operations-manpower"
      category="Business Operations Services"
      whatYouGet={['HR policy documentation', 'Employment contract templates', 'Labour law compliance guidance', 'Operations process documentation', 'Onboarding and offboarding frameworks', 'Vendor management templates', 'Operational SOP development']}
      deliverables={['HR policy manual', 'Employment contract templates', 'Process documentation package', 'Compliance checklist', 'Operational SOP document']}
      process={[
        { step: 'Operations Audit', desc: 'We understand your team structure and current processes.' },
        { step: 'Gap Analysis', desc: 'We identify missing documentation and compliance gaps.' },
        { step: 'Documentation', desc: 'We develop all required HR and operations documents.' },
        { step: 'Review & Approval', desc: 'You review, provide feedback, and approve documents.' },
        { step: 'Handover', desc: 'Organised handover with guidance on implementation.' },
      ]}
      faqs={[
        { question: 'Do you provide legal HR advice?', answer: 'We provide documentation and guidance based on standard Indian labour law frameworks. For specific legal disputes, we recommend engaging a qualified legal professional.' },
        { question: 'Can you help with employee onboarding workflows?', answer: 'Yes. We can design and document complete onboarding workflows tailored to your team size and structure.' },
      ]}
    />
  )
}
