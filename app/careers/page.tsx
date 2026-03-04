import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Zap, Users, BookOpen, Mail } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'
import { siteConfig } from '@/lib/config/site'
import HeritageImageBackground from '@/components/heritage/HeritageImageBackground'

export const metadata: Metadata = buildMetadata({ title: pageMeta.careers.title, description: pageMeta.careers.description, path: '/careers' })

const categories = [
  'Business Development & Sales',
  'Digital Marketing & SEO',
  'Web & Software Development',
  'Brand Design & Creative',
  'Legal Compliance & Documentation',
  'Operations & Project Management',
]

const perks = [
  { icon: Heart, label: 'Purpose-Driven Work', desc: 'Help Indian businesses launch and grow.' },
  { icon: Zap, label: 'Fast Learning Environment', desc: 'Exposure across multiple domains and industries.' },
  { icon: Users, label: 'Collaborative Culture', desc: 'Small team, big ownership.' },
  { icon: BookOpen, label: 'Skill Development', desc: 'We invest in your professional growth.' },
]

export default function CareersPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Careers', url: '/careers' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <section className="py-24 bg-grid text-center">
          <HeritageImageBackground src="/heritage/aknexis-usa.png" opacity={0.18} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Careers</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Join the AKnexis Team</h1>
          <p className="text-slate-400 max-w-xl mx-auto">We are building a team of talented professionals who want to make a real difference for Indian businesses. If that sounds like you, we want to hear from you.</p>
        </div>
      </section>

      <section className="py-16 bg-[#050A16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-white mb-8 text-center" style={{ fontFamily: 'var(--font-syne)' }}>Why Join Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="card-surface p-6 text-center">
                <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={18} className="text-teal-400" />
                </div>
                <h3 className="text-white text-sm font-semibold mb-1">{label}</h3>
                <p className="text-slate-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: 'var(--font-syne)' }}>Areas We Hire In</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {categories.map((c) => (
            <div key={c} className="card-surface p-5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-teal-400 shrink-0" />
              <span className="text-slate-300 text-sm">{c}</span>
            </div>
          ))}
        </div>
        <div className="card-surface p-8 text-center">
          <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-syne)' }}>Ready to Apply?</h3>
          <p className="text-slate-400 text-sm mb-6">Send us your resume and a brief note about what excites you about AKnexis and how you can contribute.</p>
          <Link href={`mailto:${siteConfig.contact.email}?subject=Career Application — AKnexis`} className="btn-primary inline-flex items-center gap-2">
            <Mail size={16} /> Apply via Email
          </Link>
        </div>
      </section>
    </>
  )
}
