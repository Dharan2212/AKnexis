import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

export default function MiniContactStrip() {
  return (
    <div className="bg-[#050A16] border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap gap-6 justify-center lg:justify-between items-center">
          <div className="flex flex-wrap gap-6 items-center">
            <Link href={siteConfig.contact.phoneTel} className="flex items-center gap-2 text-slate-400 text-sm hover:text-teal-400 transition-colors">
              <Phone size={15} className="text-teal-400" /> {siteConfig.contact.phone}
            </Link>
            <Link href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-400 text-sm hover:text-teal-400 transition-colors">
              <MessageCircle size={15} className="text-teal-400" /> WhatsApp
            </Link>
            <Link href={siteConfig.contact.emailLink} className="flex items-center gap-2 text-slate-400 text-sm hover:text-teal-400 transition-colors">
              <Mail size={15} className="text-teal-400" /> {siteConfig.contact.email}
            </Link>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <MapPin size={14} className="text-teal-400" />
            <span>{siteConfig.locationsDisplay}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
