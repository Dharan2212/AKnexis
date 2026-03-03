import Link from 'next/link'
import { Phone, Mail, MessageCircle, Linkedin, Instagram, Twitter, Facebook, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

export default function TopBar() {
  return (
    <div className="hidden lg:block bg-[#03060F] border-b border-white/5 py-2">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={siteConfig.contact.phoneTel} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors">
            <Phone size={12} />
            <span>{siteConfig.contact.phone}</span>
          </Link>
          <Link href={siteConfig.contact.emailLink} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors">
            <Mail size={12} />
            <span>{siteConfig.contact.email}</span>
          </Link>
          <Link href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors">
            <MessageCircle size={12} />
            <span>WhatsApp</span>
          </Link>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <MapPin size={11} />
            <span>{siteConfig.locationsDisplay}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-teal-400 transition-colors">
            <Linkedin size={13} />
          </Link>
          <Link href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 hover:text-teal-400 transition-colors">
            <Instagram size={13} />
          </Link>
          <Link href={siteConfig.social.x} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="text-slate-500 hover:text-teal-400 transition-colors">
            <Twitter size={13} />
          </Link>
          <Link href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-500 hover:text-teal-400 transition-colors">
            <Facebook size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
