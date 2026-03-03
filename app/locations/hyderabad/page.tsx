import type { Metadata } from 'next'
import LocationPageTemplate from '@/components/sections/LocationPageTemplate'
import { buildMetadata, breadcrumbSchema } from '@/lib/config/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Business Setup Services in Hyderabad',
  description: 'AKnexis provides business registration, branding, web development, and digital marketing in Hyderabad. Your growth partner in Telangana.',
  path: '/locations/hyderabad',
})

const seoContent = `<p>Hyderabad has emerged as one of India's fastest-growing business cities, with a strong presence across pharma, IT, manufacturing, and services. The city's business-friendly environment makes it an ideal location for new ventures and expanding businesses.</p>
<p>AKnexis supports Hyderabad businesses with company registration, GST compliance, brand identity, website development, and digital marketing. Our structured approach ensures that businesses in Hyderabad receive the same quality of service as our home market.</p>
<p>If you are launching or growing a business in Hyderabad or Telangana, <a href="/contact" style="color:#2DD4BF">get in touch with AKnexis</a> for a free consultation.</p>`

export default function HyderabadPage() {
  const bc = breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Hyderabad', url: '/locations/hyderabad' }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bc) }} />
      <LocationPageTemplate city="Hyderabad" state="Telangana" description="AKnexis serves the growing Hyderabad business ecosystem with end-to-end business setup, digital presence, and growth support services." seoContent={seoContent} />
    </>
  )
}
