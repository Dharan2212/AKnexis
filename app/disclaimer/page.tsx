import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: 'Disclaimer', description: 'AKnexis Disclaimer — important notices about our services and content.', path: '/disclaimer' })

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Disclaimer</h1>
      <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last updated: January 2025</p>
        <div className="p-5 rounded-xl border border-teal-400/15 bg-teal-400/5">
          <p className="text-teal-300 font-medium text-sm">
            AKnexis assists businesses with registrations, documentation, and digital services. We do not represent any government authority, and our services do not constitute legal advice.
          </p>
        </div>
        <h2 className="text-white text-base font-semibold mt-6">Not a Government Entity</h2>
        <p>AKnexis is a private business service company. We are not affiliated with, endorsed by, or representing any government department, authority, or body in India or elsewhere.</p>
        <h2 className="text-white text-base font-semibold mt-6">Not Legal Advice</h2>
        <p>Content on this website and information provided by AKnexis is for general informational purposes only. It does not constitute legal, financial, or professional advice. For specific legal matters, consult a qualified legal professional.</p>
        <h2 className="text-white text-base font-semibold mt-6">Accuracy of Information</h2>
        <p>While we make every effort to keep our content accurate and up to date, regulations and requirements change. We recommend verifying current requirements with the relevant government authority or a qualified professional.</p>
        <h2 className="text-white text-base font-semibold mt-6">Contact</h2>
        <p>For queries, contact us at aknexis.in@gmail.com or call +91 6385501312.</p>
      </div>
    </div>
  )
}
