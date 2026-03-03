import { MetadataRoute } from 'next'
import { insightArticles } from '@/lib/data/insights.data'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aknexis.in'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/services/legal-registrations`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services/branding-identity`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services/web-software-development`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services/platform-setup`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services/seo-marketing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services/support-maintenance`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/services/operations-manpower`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/industries`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/case-studies`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/insights`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${baseUrl}/careers`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/locations/chennai`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/locations/bangalore`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/locations/hyderabad`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/locations/mumbai`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms-conditions`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const insightPages = insightArticles.map((a) => ({
    url: `${baseUrl}/insights/${a.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
    lastModified: new Date(a.date),
  }))

  return [...staticPages, ...insightPages]
}
