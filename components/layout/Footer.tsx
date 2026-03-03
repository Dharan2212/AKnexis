import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin, Linkedin, Instagram, Twitter, Facebook } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Insights', href: '/insights' },
  ],
  services: siteConfig.nav.services.map((s) => ({ label: s.label, href: s.href })),
  resources: [
    { label: 'Industries', href: '/industries' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Insights', href: '/insights' },
    { label: 'Case Studies', href: '/case-studies' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-conditions' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Disclaimer', href: '/disclaimer' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#050A16] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-600 to-teal-400 flex items-center justify-center">
                <span className="text-white font-bold text-sm" style={{ fontFamily: 'var(--font-syne)' }}>A</span>
              </div>
              <span className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-syne)' }}>
                AK<span className="text-teal-400">nexis</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Your complete business setup and growth partner across India.
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: siteConfig.social.linkedin, Icon: Linkedin, label: 'LinkedIn' },
                { href: siteConfig.social.instagram, Icon: Instagram, label: 'Instagram' },
                { href: siteConfig.social.x, Icon: Twitter, label: 'X' },
                { href: siteConfig.social.facebook, Icon: Facebook, label: 'Facebook' },
              ].map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-teal-400 hover:bg-teal-400/10 transition-all"
                >
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 text-sm hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Services</h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 text-sm hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-slate-500 text-sm hover:text-teal-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="text-white text-sm font-semibold mb-4 mt-6" style={{ fontFamily: 'var(--font-syne)' }}>Locations</h4>
            <ul className="space-y-1.5">
              {[
                { label: 'Chennai', href: '/locations/chennai' },
                { label: 'Bangalore', href: '/locations/bangalore' },
                { label: 'Hyderabad', href: '/locations/hyderabad' },
                { label: 'Mumbai', href: '/locations/mumbai' },
              ].map((loc) => (
                <li key={loc.href}>
                  <Link href={loc.href} className="text-slate-500 text-sm hover:text-teal-400 transition-colors">
                    {loc.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Contact Us</h4>
            <div className="space-y-3">
              <Link href={siteConfig.contact.phoneTel} className="flex items-center gap-2 text-slate-400 text-sm hover:text-teal-400 transition-colors">
                <Phone size={14} className="shrink-0 text-teal-400" />
                <span>{siteConfig.contact.phone}</span>
              </Link>
              <Link href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 text-sm hover:text-teal-400 transition-colors">
                <MessageCircle size={14} className="shrink-0 text-teal-400" />
                <span>WhatsApp</span>
              </Link>
              <Link href={siteConfig.contact.emailLink} className="flex items-center gap-2 text-slate-400 text-sm hover:text-teal-400 transition-colors">
                <Mail size={14} className="shrink-0 text-teal-400" />
                <span>{siteConfig.contact.email}</span>
              </Link>
              <div className="flex items-start gap-2 text-slate-500 text-sm">
                <MapPin size={14} className="shrink-0 text-teal-400 mt-0.5" />
                <span>{siteConfig.locationsDisplay}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="divider my-10" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-xs">
            © {new Date().getFullYear()} AKnexis. All rights reserved. Engineering What&apos;s Next.
          </p>
          <p className="text-slate-700 text-xs">
            Chennai • Bangalore • Hyderabad • Mumbai • India
          </p>
        </div>
      </div>
    </footer>
  )
}
