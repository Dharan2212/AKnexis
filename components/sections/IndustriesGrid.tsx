import Link from 'next/link'
import { Cpu, ShoppingBag, HeartPulse, GraduationCap, Building2, Utensils, Car, Globe } from 'lucide-react'

const industries = [
  { icon: Cpu, label: 'Technology & SaaS', href: '/industries' },
  { icon: ShoppingBag, label: 'Retail & E-Commerce', href: '/industries' },
  { icon: HeartPulse, label: 'Healthcare & Wellness', href: '/industries' },
  { icon: GraduationCap, label: 'Education & EdTech', href: '/industries' },
  { icon: Building2, label: 'Real Estate & Construction', href: '/industries' },
  { icon: Utensils, label: 'Food & Hospitality', href: '/industries' },
  { icon: Car, label: 'Automotive & Mobility', href: '/industries' },
  { icon: Globe, label: 'Professional Services', href: '/industries' },
]

export default function IndustriesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Industries We Serve
          </h2>
          <p className="text-slate-400">
            Sector-aware solutions for businesses at every stage.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {industries.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              className="card-surface card-surface-hover p-5 flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-600/10 flex items-center justify-center">
                <Icon size={18} className="text-accent-400" />
              </div>
              <span className="text-slate-300 text-sm font-medium">{label}</span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/industries" className="btn-secondary text-sm">
            View All Industries
          </Link>
        </div>
      </div>
    </section>
  )
}
