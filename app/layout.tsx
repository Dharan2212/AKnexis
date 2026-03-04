import type { Metadata } from 'next'
import { Syne, Plus_Jakarta_Sans } from 'next/font/google'
import SiteHeader from '@/components/layout/SiteHeader'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/sections/FloatingWhatsApp'
import StickyCTA from '@/components/sections/StickyCTA'
import { buildMetadata, pageMeta, organizationSchema } from '@/lib/config/seo'
import '@/styles/globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://aknexis.netlify.app'),

  title: {
    default: 'AKnexis | Engineering What’s Next',
    template: '%s | AKnexis',
  },

  description:
    'AKnexis helps businesses across India with registrations, compliance, branding, websites, and digital growth — delivered with clear timelines and professional support.',

  keywords: [
    'AKnexis',
    'business registration India',
    'GST registration',
    'company incorporation',
    'startup compliance',
    'branding agency',
    'website development',
    'digital marketing',
    'SEO services',
    'Chennai',
    'Bangalore',
    'Hyderabad',
    'Mumbai',
  ],

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },


  openGraph: {
    title: 'AKnexis | Engineering What’s Next',
    description:
      'Registrations, compliance, branding, websites, and digital growth for businesses across India — with clear timelines and professional support.',
    url: 'https://aknexis.netlify.app',
    siteName: 'AKnexis',
    type: 'website',
    locale: 'en_IN',

    images: [
      {
        url: '/og.png', // because metadataBase is set, this becomes full URL
        width: 1200,
        height: 630,
        alt: 'AKnexis — Engineering What’s Next',
      },
    ],
  },
  

  twitter: {
    card: 'summary_large_image',
    title: 'AKnexis | Engineering What’s Next',
    description:
      'Registrations, compliance, branding, websites, and digital growth for businesses across India.',
       images: ['/og.png'],
  },

  icons: {
    icon: '/favicon.ico',
  },
}


export default function RootLayout({ children }: { children: React.ReactNode }) {

  const jsonLd = [
    // Organization schema
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'AKnexis',
      url: 'https://aknexis.netlify.app',
      logo: 'https://aknexis.netlify.app/favicon.ico',
      sameAs: [
        'https://www.linkedin.com/company/aknexis/',
        'https://www.instagram.com/aknexis/',
        'https://www.facebook.com/neaxaak/',
        'https://x.com/AKnexis/',
        'https://github.com/aknexis-ai',
        'https://github.com/aknexis-dev',
        'https://www.blogger.com/profile/02824414673429146731',
      ],
    },

    // Website schema
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'AKnexis',
      url: 'https://aknexis.netlify.app',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://aknexis.netlify.app/insights?query={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ]
  
  const orgSchema = organizationSchema()
  return (
    <html lang="en" className={`${syne.variable} ${plusJakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}');`
            }} />
          </>
        )}
      </head>
      <body className="font-body antialiased">

         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteHeader />

{/* Spacer so content starts below fixed header */}
<div className="h-16 lg:h-[104px]" />

<main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <StickyCTA />
      </body>
    </html>
  )
}
