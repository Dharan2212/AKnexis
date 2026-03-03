import { Shield, Users, Zap, HeadphonesIcon } from 'lucide-react'

const items = [
  {
    icon: Shield,
    title: 'End-to-End Setup',
    desc: 'Legal, brand, digital — all under one roof',
  },
  {
    icon: Users,
    title: 'Expert Team',
    desc: 'Domain specialists with practical experience',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    desc: 'Structured delivery with clear timelines',
  },
  {
    icon: HeadphonesIcon,
    title: 'Ongoing Support',
    desc: 'We stay with you beyond launch',
  },
]

export default function TrustStrip() {
  return (
    <div className="bg-[#050A16] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-teal-400" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-syne)' }}>
                  {title}
                </div>
                <div className="text-slate-500 text-xs mt-0.5">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
