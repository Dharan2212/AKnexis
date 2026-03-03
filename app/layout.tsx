import type { Metadata } from 'next'
import { Syne, Plus_Jakarta_Sans } from 'next/font/google'
import TopBar from '@/components/layout/TopBar'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingWhatsApp from '@/components/sections/FloatingWhatsApp'
import StickyCTA from '@/components/sections/StickyCTA'
import { buildMetadata, pageMeta, organizationSchema } from '@/lib/config/seo'
import '@/styles/globals.css'

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap' })

export const metadata: Metadata = buildMetadata({
  title: pageMeta.home.title,
  description: pageMeta.home.description,
  path: '',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <StickyCTA />
      </body>
    </html>
  )
}
