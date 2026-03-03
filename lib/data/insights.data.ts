export interface InsightArticle {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
}

export const insightArticles: InsightArticle[] = [
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
