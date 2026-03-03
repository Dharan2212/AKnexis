import Link from 'next/link'
import { Phone, MessageCircle, CalendarDays } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

export default function StickyCTA() {
  return (
    <div className="sticky-cta md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <Link href={siteConfig.contact.phoneTel} className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/5 text-slate-300 hover:text-teal-400 transition-colors text-xs">
          <Phone size={18} />
          <span>Call</span>
        </Link>
        <Link href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors text-xs">
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </Link>
        <Link href="/contact" className="flex flex-col items-center gap-1 py-2 rounded-lg bg-accent-600/20 text-accent-400 hover:bg-accent-600/30 transition-colors text-xs">
          <CalendarDays size={18} />
          <span>Consult</span>
        </Link>
      </div>
    </div>
  )
}
