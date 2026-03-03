import type { Metadata } from 'next'
import LocationPageTemplate from '@/components/sections/LocationPageTemplate'
import { buildMetadata, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Business Setup Services in Bangalore',
  description: 'AKnexis offers company registration, branding, web development, and SEO services in Bangalore. Launch and grow your business in India\'s startup capital.',
  path: '/locations/bangalore',
})

const seoContent = `<p>Bangalore is India's startup capital and technology hub. The city hosts thousands of startups, established IT companies, and growing businesses across sectors. Competition is intense, and having the right legal foundation and digital presence is non-negotiable.</p>
<p>AKnexis serves businesses in Bangalore with the full range of our services — from <a href="/services/legal-registrations" style="color:#2DD4BF">company registration</a> and compliance to <a href="/services/web-software-development" style="color:#2DD4BF">custom web and software development</a>. We understand the Bangalore market and can help you move fast without cutting corners.</p>
<p>Whether you are a tech startup needing a lean digital setup or an established business looking to scale digitally, <a href="/contact" style="color:#2DD4BF">contact AKnexis</a> for a free consultation.</p>`

export default function BangalorePage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Bangalore', url: '/locations/bangalore' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <LocationPageTemplate city="Bangalore" state="Karnataka" description="AKnexis serves the Bangalore startup and enterprise ecosystem with end-to-end business setup, branding, development, and digital marketing services." seoContent={seoContent} />
    </>
  )
}
