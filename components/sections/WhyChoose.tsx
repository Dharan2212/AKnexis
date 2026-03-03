import { CheckCircle2 } from 'lucide-react'

const points = [
  {
    title: 'One Partner, Every Stage',
    desc: 'From idea to operations, we cover everything — no need to coordinate across multiple agencies.',
  },
  {
    title: 'India-Specific Expertise',
    desc: 'Deep knowledge of Indian business regulations, market dynamics, and compliance requirements.',
  },
  {
    title: 'Structured Delivery',
    desc: 'Every project follows a documented process with clear milestones, timelines, and accountability.',
  },
  {
    title: 'Confidentiality First',
    desc: 'Your business information and documents are handled with strict privacy protocols at all times.',
  },
  {
    title: 'No Lock-in',
    desc: 'Transparent agreements with no hidden clauses. You own everything we build for you.',
  },
  {
    title: 'Post-Launch Partnership',
    desc: 'We stay engaged after delivery — maintenance, growth, and evolving support as your business scales.',
  },
]

export default function WhyChoose() {
  return (
    <section className="py-20 lg:py-28 bg-[#050A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-600/10 border border-accent-600/20 mb-5">
              <span className="text-accent-400 text-xs font-medium tracking-wide">Why AKnexis</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-5" style={{ fontFamily: 'var(--font-syne)' }}>
              Built Different, For a Reason
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              We built AKnexis because Indian entrepreneurs deserve a single reliable partner that understands both compliance and growth — not just one or the other.
            </p>
            <div className="p-5 rounded-xl border border-teal-400/15 bg-teal-400/5">
              <p className="text-teal-300 text-sm leading-relaxed italic">
                &ldquo;We assist businesses with registrations, documentation, and digital growth. We operate with professionalism and transparency, and do not represent any government authority.&rdquo;
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map(({ title, desc }) => (
              <div key={title} className="card-surface p-5">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-teal-400 shrink-0" />
                  <h3 className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-syne)' }}>
                    {title}
                  </h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed pl-6">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
