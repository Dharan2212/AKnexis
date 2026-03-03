export const siteConfig = {
  name: 'AKnexis',
  tagline: "Engineering What's Next — Your Complete Business Setup & Growth Partner",
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://aknexis.in',
  description:
    'AKnexis is your complete business setup and growth partner. We handle legal registrations, branding, web development, digital marketing, and ongoing support across India.',

  contact: {
    phone: '+91 6385501312',
    phoneTel: 'tel:+916385501312',
    whatsapp: 'https://wa.me/916385501312',
    email: 'aknexis.in@gmail.com',
    emailLink: 'mailto:aknexis.in@gmail.com',
  },

  social: {
    linkedin: 'https://www.linkedin.com/company/aknexis',
    instagram: 'https://www.instagram.com/aknexis/',
    x: 'https://x.com/AKnexis',
    facebook: 'https://www.facebook.com/neaxaak/',
    google: 'https://share.google/RKygP94RhmxccH9Ht',
  },

  locations: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'India'],
  locationsDisplay: 'Chennai, Bangalore, Hyderabad, Mumbai, India',

  nav: {
    services: [
      { label: 'Legal Registrations & Documentation', href: '/services/legal-registrations' },
      { label: 'Brand Identity Design', href: '/services/branding-identity' },
      { label: 'Website & Software Development', href: '/services/web-software-development' },
      { label: 'Digital Platform Setup', href: '/services/platform-setup' },
      { label: 'SEO & Digital Marketing', href: '/services/seo-marketing' },
      { label: 'Ongoing Support & Maintenance', href: '/services/support-maintenance' },
      { label: 'Workman Support & Operational Guidance', href: '/services/operations-manpower' },
    ],
  },
}
