import type { Metadata } from 'next'
import ServiceDetailTemplate from '@/components/sections/ServiceDetailTemplate'
import { buildMetadata, pageMeta } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.webSoftwareDev.title, description: pageMeta.webSoftwareDev.description, path: '/services/web-software-development' })

export default function WebSoftwareDevelopmentPage() {
  return (
    <ServiceDetailTemplate
      title="Website & Software Development"
      subtitle="Technology & Development"
      description="From marketing websites to complex web applications and mobile apps — we build performant, scalable, and maintainable digital products for Indian businesses ready to compete online."
      href="/services/web-software-development"
      category="Software Development Services"
      whatYouGet={['Custom website or web application development', 'Mobile-responsive and SEO-ready builds', 'Admin dashboard and CMS integration', 'API development and third-party integrations', 'Mobile app development (iOS/Android)', 'Performance optimisation and security hardening', 'Deployment and hosting setup']}
      deliverables={['Fully functional website or application', 'Source code with documentation', 'Admin credentials and access', 'Deployment guide', 'Post-launch support window']}
      process={[
        { step: 'Requirements', desc: 'We document your functional and technical requirements in detail.' },
        { step: 'Architecture', desc: 'We design the technical architecture and confirm the stack.' },
        { step: 'Development', desc: 'Iterative development with weekly progress demos.' },
        { step: 'Testing', desc: 'Comprehensive QA including cross-device and performance testing.' },
        { step: 'Launch', desc: 'Deployment, handover, and a support window.' },
      ]}
      faqs={[
        { question: 'What technologies do you use?', answer: 'We work with modern stacks including Next.js, React, Node.js, and others based on your requirements.' },
        { question: 'Who owns the code?', answer: 'You do. All code is fully yours upon final payment with no lock-in.' },
        { question: 'Do you offer hosting?', answer: 'We can recommend and set up hosting on Vercel, AWS, or similar platforms. Ongoing hosting management is available as a support service.' },
      ]}
    />
  )
}
