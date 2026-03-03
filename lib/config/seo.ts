import type { Metadata } from 'next'
import { siteConfig } from './site'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://aknexis.in'

export function buildMetadata(options: {
  title: string
  description: string
  path?: string
  noIndex?: boolean
}): Metadata {
  const { title, description, path = '', noIndex = false } = options
  const url = `${baseUrl}${path}`
  const fullTitle = path === '' ? `${siteConfig.name} — ${title}` : `${title} | ${siteConfig.name}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/brand/og.png`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`${baseUrl}/brand/og.png`],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
  }
}

export const pageMeta: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Engineering What\'s Next — Business Setup & Growth Partner',
    description:
      'AKnexis is your complete business setup and growth partner in India. Legal registrations, branding, web development, SEO, and ongoing support across Chennai, Bangalore, Hyderabad, and Mumbai.',
  },
  about: {
    title: 'About AKnexis',
    description:
      'Learn about AKnexis — our mission, vision, and how we help Indian businesses launch and grow with end-to-end setup and support services.',
  },
  services: {
    title: 'Our Services',
    description:
      'Explore AKnexis comprehensive business services: legal registrations, branding, web development, digital marketing, platform setup, and operational support.',
  },
  industries: {
    title: 'Industries We Serve',
    description:
      'AKnexis serves startups, SMEs, and enterprises across technology, retail, healthcare, finance, education, and more in India.',
  },
  pricing: {
    title: 'Pricing & Packages',
    description:
      'Transparent pricing packages for business setup, branding, web development, and digital marketing services. Choose the plan that fits your needs.',
  },
  casestudies: {
    title: 'Case Studies',
    description:
      'Real results from AKnexis clients. Discover how we helped businesses launch, grow, and scale across India.',
  },
  insights: {
    title: 'Insights & Resources',
    description:
      'Practical guides, articles, and insights on business setup, digital growth, legal compliance, and entrepreneurship in India.',
  },
  careers: {
    title: 'Careers at AKnexis',
    description:
      'Join the AKnexis team. We are hiring across business development, technology, design, and operations. Build your career while helping Indian businesses grow.',
  },
  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with AKnexis for a free business consultation. Reach us via phone, WhatsApp, or email. Offices across Chennai, Bangalore, Hyderabad, and Mumbai.',
  },
  legalRegistrations: {
    title: 'Legal Registrations & Documentation',
    description:
      'Company incorporation, GST registration, trademark filing, and business documentation services across India. Fast, reliable, expert assistance.',
  },
  brandingIdentity: {
    title: 'Brand Identity Design',
    description:
      'Professional brand identity design including logo, visual language, brand guidelines, and digital assets for startups and established businesses.',
  },
  webSoftwareDev: {
    title: 'Website & Software Development',
    description:
      'Custom websites, web applications, mobile apps, and software development by AKnexis for Indian businesses looking to establish their digital presence.',
  },
  platformSetup: {
    title: 'Digital Platform Setup',
    description:
      'Complete digital platform setup including e-commerce stores, CRM integration, payment gateways, and business automation tools.',
  },
  seoMarketing: {
    title: 'SEO & Digital Marketing',
    description:
      'Results-driven SEO, social media management, Google Ads, and digital marketing services to grow your online visibility and generate quality leads.',
  },
  supportMaintenance: {
    title: 'Ongoing Support & Maintenance',
    description:
      'Reliable website maintenance, technical support, and ongoing business operations assistance. We keep your systems running smoothly.',
  },
  operationsManpower: {
    title: 'Workman Support & Operational Guidance',
    description:
      'Operational staffing guidance, process documentation, and workman support services to help your business run efficiently.',
  },
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: baseUrl,
    logo: `${baseUrl}/brand/og.png`,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    description: siteConfig.description,
    areaServed: 'IN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Chennai',
      addressRegion: 'Tamil Nadu',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer support',
      availableLanguage: ['English', 'Tamil'],
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
      siteConfig.social.x,
      siteConfig.social.facebook,
    ],
  }
}

export function serviceSchema(serviceName: string, serviceUrl: string, category: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    url: `${baseUrl}${serviceUrl}`,
    provider: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: baseUrl,
    },
    areaServed: 'IN',
    category,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function articleSchema(options: {
  headline: string
  description: string
  datePublished: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: options.headline,
    description: options.description,
    datePublished: options.datePublished,
    url: `${baseUrl}${options.url}`,
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/brand/og.png`,
      },
    },
  }
}
