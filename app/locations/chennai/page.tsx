import type { Metadata } from 'next'
import LocationPageTemplate from '@/components/sections/LocationPageTemplate'
import { buildMetadata, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Business Setup Services in Chennai',
  description: 'AKnexis provides company registration, branding, web development, and digital marketing services in Chennai. Your complete business setup partner in Tamil Nadu.',
  path: '/locations/chennai',
})

const seoContent = `<p>Chennai is Tamil Nadu's commercial capital and one of India's most dynamic business hubs. From manufacturing and IT services to healthcare and retail, Chennai businesses across every sector are competing digitally and operationally at a higher level than ever before.</p>
<p>AKnexis was founded in Chennai, and our roots here inform everything we do. We understand the local business landscape, the regulatory environment specific to Tamil Nadu, and the unique challenges and opportunities that Chennai entrepreneurs face.</p>
<p>Our services in Chennai include <a href="/services/legal-registrations" style="color:#2DD4BF">company registration and GST compliance</a>, <a href="/services/branding-identity" style="color:#2DD4BF">professional brand identity design</a>, <a href="/services/web-software-development" style="color:#2DD4BF">website and software development</a>, and <a href="/services/seo-marketing" style="color:#2DD4BF">SEO and digital marketing</a>. Whether you are starting a new venture or modernising an established business, AKnexis delivers structured, expert-led support.</p>
<p>Contact us for a free consultation to discuss your requirements in Chennai.</p>`

export default function ChennaiPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Chennai', url: '/locations/chennai' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <LocationPageTemplate city="Chennai" state="Tamil Nadu" description="AKnexis is headquartered in Chennai. We provide end-to-end business setup and growth services to entrepreneurs and businesses across Tamil Nadu." seoContent={seoContent} />
    </>
  )
}
