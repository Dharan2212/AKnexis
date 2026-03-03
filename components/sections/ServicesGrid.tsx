import Link from 'next/link'
import { FileText, Palette, Code2, Layout, TrendingUp, Wrench, Users, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: FileText,
    title: 'Legal Registrations & Documentation',
    desc: 'Company incorporation, GST, trademark, MSME, FSSAI, and all compliance documentation.',
    href: '/services/legal-registrations',
    color: 'from-blue-500/10 to-blue-600/5',
    iconColor: 'text-blue-400',
  },
  {
    icon: Palette,
    title: 'Brand Identity Design',
    desc: 'Logo, brand guidelines, visual language, and digital assets that define your identity.',
    href: '/services/branding-identity',
    color: 'from-purple-500/10 to-purple-600/5',
    iconColor: 'text-purple-400',
  },
  {
    icon: Code2,
    title: 'Website & Software Development',
    desc: 'Custom websites, web apps, mobile applications, and software tailored for your business.',
    href: '/services/web-software-development',
    color: 'from-teal-500/10 to-teal-600/5',
    iconColor: 'text-teal-400',
  },
  {
    icon: Layout,
    title: 'Digital Platform Setup',
    desc: 'E-commerce stores, CRM setup, payment gateways, and complete digital infrastructure.',
    href: '/services/platform-setup',
    color: 'from-cyan-500/10 to-cyan-600/5',
    iconColor: 'text-cyan-400',
  },
  {
    icon: TrendingUp,
    title: 'SEO & Digital Marketing',
    desc: 'Search visibility, social media, Google Ads, and data-driven growth strategies.',
    href: '/services/seo-marketing',
    color: 'from-green-500/10 to-green-600/5',
    iconColor: 'text-green-400',
  },
  {
    icon: Wrench,
    title: 'Ongoing Support & Maintenance',
    desc: 'Technical maintenance, updates, monitoring, and continuous improvement.',
    href: '/services/support-maintenance',
    color: 'from-orange-500/10 to-orange-600/5',
    iconColor: 'text-orange-400',
  },
  {
    icon: Users,
    title: 'Workman Support & Operations',
    desc: 'Operational guidance, staffing processes, and workman support documentation.',
    href: '/services/operations-manpower',
    color: 'from-rose-500/10 to-rose-600/5',
    iconColor: 'text-rose-400',
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-600/10 border border-accent-600/20 mb-4">
            <span className="text-accent-400 text-xs font-medium tracking-wide">Our Services</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Everything Your Business Needs
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Seven core service verticals, each designed to handle a critical area of your business setup and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map(({ icon: Icon, title, desc, href, color, iconColor }) => (
            <Link
              key={href}
              href={href}
              className="card-surface card-surface-hover p-6 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                <Icon size={22} className={iconColor} />
              </div>
              <h3 className="text-white text-sm font-semibold mb-2 leading-snug" style={{ fontFamily: 'var(--font-syne)' }}>
                {title}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed mb-4">{desc}</p>
              <div className="flex items-center gap-1 text-teal-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
