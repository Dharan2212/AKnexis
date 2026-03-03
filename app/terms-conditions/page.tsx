import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: 'Terms & Conditions', description: 'AKnexis Terms and Conditions governing use of our services.', path: '/terms-conditions' })

export default function TermsConditionsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Terms & Conditions</h1>
      <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last updated: January 2025</p>
        <p>By engaging AKnexis for any service, you agree to these terms and conditions. Please read them carefully.</p>
        <h2 className="text-white text-base font-semibold mt-6">Services</h2>
        <p>AKnexis provides business setup, branding, technology, and digital marketing services. The specific scope, deliverables, and pricing for each engagement are defined in a separate proposal or agreement.</p>
        <h2 className="text-white text-base font-semibold mt-6">Payment</h2>
        <p>Payment terms are as specified in individual project agreements. Standard terms require an advance payment before work commences, with milestones tied to deliverable completion.</p>
        <h2 className="text-white text-base font-semibold mt-6">Intellectual Property</h2>
        <p>Upon full payment, intellectual property rights for custom deliverables transfer to the client. AKnexis retains the right to display work in its portfolio unless otherwise agreed in writing.</p>
        <h2 className="text-white text-base font-semibold mt-6">Limitation of Liability</h2>
        <p>AKnexis&apos;s liability is limited to the fees paid for the specific service giving rise to the claim. We are not liable for indirect, consequential, or incidental damages.</p>
        <h2 className="text-white text-base font-semibold mt-6">Governing Law</h2>
        <p>These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Chennai, Tamil Nadu.</p>
      </div>
    </div>
  )
}
