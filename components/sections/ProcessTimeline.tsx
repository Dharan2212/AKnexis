const steps = [
  {
    num: '01',
    title: 'Free Consultation',
    desc: 'We understand your business goals, challenges, and requirements in a no-obligation discovery call.',
  },
  {
    num: '02',
    title: 'Strategic Assessment',
    desc: 'Our team analyzes your needs and prepares a tailored roadmap with clear deliverables and timelines.',
  },
  {
    num: '03',
    title: 'Proposal & Approval',
    desc: 'You receive a transparent proposal with scope, pricing, and timelines. We refine until you\'re satisfied.',
  },
  {
    num: '04',
    title: 'Execution Begins',
    desc: 'Our specialists get to work with regular progress updates and milestone check-ins.',
  },
  {
    num: '05',
    title: 'Quality Review',
    desc: 'Every deliverable undergoes rigorous internal quality checks before reaching you.',
  },
  {
    num: '06',
    title: 'Delivery & Handover',
    desc: 'Clean delivery with full documentation, access credentials, and knowledge transfer.',
  },
  {
    num: '07',
    title: 'Ongoing Support',
    desc: 'We remain your partner post-launch with maintenance, updates, and growth support.',
  },
]

export default function ProcessTimeline() {
  return (
    <section className="py-20 lg:py-28 bg-[#050A16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-400/10 border border-teal-400/20 mb-4">
            <span className="text-teal-400 text-xs font-medium tracking-wide">How We Work</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            Our 7-Step Process
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A clear, structured process that removes uncertainty and keeps you informed every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative">
              <div className="card-surface p-6 h-full">
                <div className="text-4xl font-bold text-white/5 mb-3" style={{ fontFamily: 'var(--font-syne)' }}>
                  {step.num}
                </div>
                <div className="w-8 h-0.5 bg-teal-400 mb-3" />
                <h3 className="text-white text-sm font-semibold mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
                  {step.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-teal-400/20 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
