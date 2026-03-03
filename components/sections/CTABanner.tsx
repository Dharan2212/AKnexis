import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'

export default function CTABanner() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-accent-600/20 via-[#0A1120] to-teal-400/10 border border-accent-600/20 p-10 lg:p-16 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-accent-600/15 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
              Ready to Launch or Scale?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8">
              Book a free consultation and let us map out the right path for your business — no commitment, no pressure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-base justify-center">
                Book Free Consultation <ArrowRight size={18} />
              </Link>
              <Link href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base justify-center">
                <MessageCircle size={18} /> Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
