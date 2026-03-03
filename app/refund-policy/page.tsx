import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: 'Refund Policy', description: 'AKnexis Refund Policy — our approach to refunds and cancellations.', path: '/refund-policy' })

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Refund Policy</h1>
      <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last updated: January 2025</p>
        <h2 className="text-white text-base font-semibold mt-6">Service-Based Work</h2>
        <p>AKnexis provides professional services. Once work has commenced, refunds are not available for completed milestones. Advance payments cover the initiation of work and cannot be refunded once the project has started.</p>
        <h2 className="text-white text-base font-semibold mt-6">Government Fees</h2>
        <p>Fees paid to government authorities for registrations, filings, or applications are non-refundable. We pass these costs to clients at actuals and cannot recover them once submitted.</p>
        <h2 className="text-white text-base font-semibold mt-6">Cancellation Before Commencement</h2>
        <p>If you wish to cancel a project before work has commenced, we will refund advance payments less a processing fee. Please notify us in writing within 48 hours of payment.</p>
        <h2 className="text-white text-base font-semibold mt-6">Disputes</h2>
        <p>If you are dissatisfied with a deliverable, please contact us at aknexis.in@gmail.com. We are committed to resolving issues fairly and professionally.</p>
      </div>
    </div>
  )
}
