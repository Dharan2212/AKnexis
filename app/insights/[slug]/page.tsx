import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import CTABanner from '@/components/sections/CTABanner'
import { insightArticles } from '@/lib/data/insights.data'
import { buildMetadata, breadcrumbSchema, articleSchema } from '@/lib/config/seo'

export function generateStaticParams() {
  return insightArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const article = insightArticles.find((a) => a.slug === params.slug)
  if (!article) return {}
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
  })
}

export default function InsightDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const article = insightArticles.find((a) => a.slug === params.slug)
  if (!article) notFound()

  const bc = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Insights', url: '/insights' },
    { name: article.title, url: `/insights/${article.slug}` },
  ])
  const artSchema = articleSchema({
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    url: `/insights/${article.slug}`,
  })

  return (
    <>
      {[bc, artSchema].map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <section className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-slate-500 text-sm hover:text-teal-400 transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Back to Insights
        </Link>

        <div className="inline-block px-2 py-0.5 rounded bg-accent-600/15 text-accent-400 text-xs font-medium mb-4">
          {article.category}
        </div>

        <h1
          className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-syne)' }}
        >
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-slate-500 text-sm mb-10">
          <div className="flex items-center gap-1">
            <Calendar size={13} />{' '}
            {new Date(article.date).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={13} /> {article.readTime}
          </div>
          <span>AKnexis Team</span>
        </div>

        <div className="divider mb-10" />

        <div className="prose prose-invert prose-sm max-w-none text-slate-400 space-y-5 leading-relaxed">
          <p className="text-lg text-slate-300">{article.excerpt}</p>
          <p>
            This article provides practical, actionable guidance for Indian
            businesses and entrepreneurs navigating this topic. The information
            is based on general best practices and publicly available regulatory
            frameworks.
          </p>
          <p>
            At AKnexis, we work with businesses at every stage — from first-time
            founders registering their company to established businesses looking
            to modernise their operations. Our team combines regulatory
            knowledge with practical implementation experience.
          </p>
          <p>
            If you have specific questions about how this topic applies to your
            business, we encourage you to{' '}
            <Link href="/contact" className="text-teal-400 hover:underline">
              book a free consultation
            </Link>
            . We are happy to discuss your situation and provide guidance
            tailored to your needs.
          </p>
          <p>
            You can also explore our{' '}
            <Link href="/services" className="text-teal-400 hover:underline">
              services
            </Link>{' '}
            to understand how AKnexis can support you, or browse our{' '}
            <Link href="/insights" className="text-teal-400 hover:underline">
              other articles
            </Link>{' '}
            for more practical resources.
          </p>
        </div>
      </section>

      <CTABanner />
    </>
  )
}