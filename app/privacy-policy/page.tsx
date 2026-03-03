import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: 'Privacy Policy', description: 'AKnexis Privacy Policy — how we collect, use, and protect your information.', path: '/privacy-policy' })

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
      <h1 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Privacy Policy</h1>
      <div className="space-y-6 text-slate-400 text-sm leading-relaxed">
        <p>Last updated: January 2025</p>
        <p>AKnexis (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our website and services.</p>
        <h2 className="text-white text-base font-semibold mt-6">Information We Collect</h2>
        <p>We collect information you provide directly, such as your name, email address, phone number, and business details when you contact us or use our services. We also collect technical information such as IP addresses and browser type for security and analytics purposes.</p>
        <h2 className="text-white text-base font-semibold mt-6">How We Use Your Information</h2>
        <p>We use your information to respond to your enquiries, provide our services, send relevant communications, and improve our offerings. We do not sell your personal information to third parties.</p>
        <h2 className="text-white text-base font-semibold mt-6">Data Security</h2>
        <p>We implement industry-standard security measures to protect your information. All data transmitted through our forms is encrypted. Access to client information is restricted to authorised personnel only.</p>
        <h2 className="text-white text-base font-semibold mt-6">Contact</h2>
        <p>For privacy-related queries, contact us at aknexis.in@gmail.com.</p>
      </div>
    </div>
  )
}
