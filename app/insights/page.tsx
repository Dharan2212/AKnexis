import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { buildMetadata, pageMeta, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({ title: pageMeta.insights.title, description: pageMeta.insights.description, path: '/insights' })

const insightArticles = [
  {
    slug: 'how-to-register-a-company-in-india',
    title: 'How to Register a Company in India: A Step-by-Step Guide',
    excerpt: 'A practical walkthrough of the company incorporation process in India — from choosing your business structure to receiving your certificate.',
    category: 'Legal & Compliance',
    date: '2024-11-15',
    readTime: '7 min read',
  },
  {
    slug: 'gst-registration-checklist-for-new-businesses',
    title: 'GST Registration Checklist for New Businesses in India',
    excerpt: 'Everything you need to gather and know before applying for GST registration — documents, eligibility, and common mistakes to avoid.',
    category: 'Legal & Compliance',
    date: '2024-11-28',
    readTime: '5 min read',
  },
  {
    slug: 'why-your-startup-needs-a-brand-identity-before-launch',
    title: 'Why Your Startup Needs a Brand Identity Before Launch',
    excerpt: 'A strong visual identity is not a luxury — it is a foundation for credibility. Here is why getting your brand right early pays dividends.',
    category: 'Branding',
    date: '2024-12-05',
    readTime: '6 min read',
  },
  {
    slug: 'seo-for-indian-businesses-getting-started',
    title: 'SEO for Indian Businesses: Getting Started in 2025',
    excerpt: 'Organic search remains one of the highest-ROI channels for Indian businesses. A practical guide to beginning your SEO journey.',
    category: 'Digital Marketing',
    date: '2024-12-18',
    readTime: '8 min read',
  },
  {
    slug: 'website-vs-landing-page-what-does-your-business-need',
    title: 'Website vs Landing Page: What Does Your Business Actually Need?',
    excerpt: 'Not every business needs a full website on day one. We break down when a landing page is enough and when to invest in a full web presence.',
    category: 'Web Development',
    date: '2025-01-10',
    readTime: '5 min read',
  },
  {
    slug: 'digital-tools-every-indian-startup-should-use',
    title: 'Digital Tools Every Indian Startup Should Have in 2025',
    excerpt: 'From accounting to communication to customer management — a curated list of tools that give small businesses a professional foundation.',
    category: 'Operations',
    date: '2025-01-24',
    readTime: '6 min read',
  },
]

export default function InsightsPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Insights', url: '/insights' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <section className="py-24 bg-grid text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Insights</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Practical Business Insights</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Guides, articles, and resources for Indian entrepreneurs and businesses.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insightArticles.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`} className="card-surface card-surface-hover p-7 group">
              <div className="inline-block px-2 py-0.5 rounded bg-accent-600/15 text-accent-400 text-xs font-medium mb-4">
                {article.category}
              </div>
              <h2 className="text-white font-semibold text-base mb-3 leading-snug group-hover:text-teal-400 transition-colors" style={{ fontFamily: 'var(--font-syne)' }}>
                {article.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-600 text-xs">
                  <Clock size={11} /> {article.readTime}
                </div>
                <div className="flex items-center gap-1 text-teal-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  )
}
