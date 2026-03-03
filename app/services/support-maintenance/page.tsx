import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.supportMaintenance.title, description: pageMeta.supportMaintenance.description, path: '/services/support-maintenance' })

export default function SupportMaintenancePage() {
  return (
    <ServiceDetailTemplate
      title="Ongoing Support & Maintenance"
      subtitle="Support & Operations"
      description="Your digital infrastructure deserves consistent care. We provide reliable technical maintenance, monitoring, and support so your business systems stay stable, secure, and up-to-date."
      href="/services/support-maintenance"
      category="Support & Maintenance Services"
      whatYouGet={['Monthly website maintenance and updates', 'Security monitoring and patching', 'Performance monitoring and optimisation', 'Regular backups and disaster recovery', 'Content updates and minor changes', 'Technical support via email and WhatsApp', 'Priority response for critical issues']}
      deliverables={['Monthly maintenance report', 'Uptime and performance summary', 'Security scan results', 'Change log documentation']}
      process={[
        { step: 'Onboarding', desc: 'We audit your current setup and document all systems.' },
        { step: 'Setup', desc: 'We configure monitoring, backups, and alert systems.' },
        { step: 'Monthly Maintenance', desc: 'Scheduled maintenance window each month.' },
        { step: 'Support', desc: 'Ongoing support via agreed communication channel.' },
        { step: 'Reporting', desc: 'Monthly reports on health, changes, and recommendations.' },
      ]}
      faqs={[
        { question: 'What is your response time for urgent issues?', answer: 'For critical issues on active support plans, we aim to respond within 2–4 business hours.' },
        { question: 'Do you support platforms we did not build?', answer: 'Yes. We can onboard existing websites and platforms after an initial audit.' },
      ]}
    />
  )
}
