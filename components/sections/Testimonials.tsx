import { Quote } from 'lucide-react'

const testimonials = [
  {
    type: 'Technology Startup',
    challenge: 'Needed full business setup — legal, brand, and website — before a product launch.',
    result: 'Incorporated, branded, and launched with a working website within 6 weeks.',
  },
  {
    type: 'Retail Business',
    challenge: 'GST compliance and an online store setup were overdue and causing delays.',
    result: 'Achieved compliance and launched their e-commerce store with payment gateway integration.',
  },
  {
    type: 'Professional Services Firm',
    challenge: 'Required a digital presence and ongoing SEO to generate inbound leads.',
    result: 'Achieved measurable growth in organic search traffic within the first quarter.',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Client Outcomes
          </h2>
          <p className="text-slate-400">Real results across industry verticals.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.type} className="card-surface p-7">
              <Quote size={20} className="text-teal-400/40 mb-4" />
              <div className="inline-block px-2 py-0.5 rounded bg-accent-600/15 text-accent-400 text-xs font-medium mb-4">
                {t.type}
              </div>
              <p className="text-slate-500 text-sm mb-3"><span className="text-slate-400 font-medium">Challenge:</span> {t.challenge}</p>
              <p className="text-slate-400 text-sm"><span className="text-teal-400 font-medium">Result:</span> {t.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
