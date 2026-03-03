import type { Metadata } from 'next'
import LocationPageTemplate from '@/components/sections/LocationPageTemplate'
import { buildMetadata, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Business Setup Services in Mumbai',
  description: 'AKnexis provides company registration, branding, web development, and digital marketing in Mumbai. Professional business services in India\'s financial capital.',
  path: '/locations/mumbai',
})

const seoContent = `<p>Mumbai is India's financial capital and a major hub for finance, media, entertainment, retail, and professional services. Setting up and growing a business here requires navigating a competitive landscape with professional credibility.</p>
<p>AKnexis provides Mumbai businesses with structured support across company registration, brand identity, web development, and digital marketing. Our remote-first delivery model means you receive the same level of attention and quality regardless of location.</p>
<p>To discuss your business requirements in Mumbai, <a href="/contact" style="color:#2DD4BF">contact AKnexis</a> for a free consultation.</p>`

export default function MumbaiPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Mumbai', url: '/locations/mumbai' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <LocationPageTemplate city="Mumbai" state="Maharashtra" description="AKnexis supports Mumbai businesses and entrepreneurs with professional business setup, brand, and digital services across all major industries." seoContent={seoContent} />
    </>
  )
}
