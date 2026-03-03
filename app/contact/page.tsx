'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Phone, Mail, MessageCircle, MapPin, Send, CheckCircle2 } from 'lucide-react'
import HeritageBackground from '@/components/heritage/HeritageBackground'
import { siteConfig } from '@/lib/config/site'
import { cn } from '@/lib/utils/cn'

const schema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  serviceInterest: z.enum(['legal_registrations','branding_identity','web_software_development','platform_setup','seo_marketing','support_maintenance','operations_manpower','not_sure']),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

const serviceOptions = [
  { value: 'legal_registrations', label: 'Legal Registrations & Documentation' },
  { value: 'branding_identity', label: 'Brand Identity Design' },
  { value: 'web_software_development', label: 'Website & Software Development' },
  { value: 'platform_setup', label: 'Digital Platform Setup' },
  { value: 'seo_marketing', label: 'SEO & Digital Marketing' },
  { value: 'support_maintenance', label: 'Ongoing Support & Maintenance' },
  { value: 'operations_manpower', label: 'Workman Support & Operations' },
  { value: 'not_sure', label: 'Not Sure Yet' },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [utmData, setUtmData] = useState<Record<string,string>>({})

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setUtmData({
      utmSource: p.get('utm_source') || '',
      utmMedium: p.get('utm_medium') || '',
      utmCampaign: p.get('utm_campaign') || '',
      referrer: document.referrer || '',
    })
  }, [])

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utmData }),
      })
      const json = await res.json()
      if (json.success) setSubmitted(true)
      else setError(json.error?.message || 'Something went wrong.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="relative py-24 overflow-hidden bg-grid">
        <HeritageBackground variant="thiruvalluvar" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-4">Get In Touch</div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-syne)' }}>Contact AKnexis</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Book a free consultation or reach us directly. We respond promptly.</p>
        </div>
      </section>

      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact cards */}
          <div className="space-y-4">
            {[
              { icon: Phone, label: 'Phone', value: siteConfig.contact.phone, href: siteConfig.contact.phoneTel },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: siteConfig.contact.whatsapp },
              { icon: Mail, label: 'Email', value: siteConfig.contact.email, href: siteConfig.contact.emailLink },
            ].map(({ icon: Icon, label, value, href }) => (
              <Link key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} className="card-surface card-surface-hover p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-teal-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500">{label}</div>
                  <div className="text-slate-200 text-sm font-medium">{value}</div>
                </div>
              </Link>
            ))}
            <div className="card-surface p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-400/10 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={18} className="text-teal-400" />
              </div>
              <div>
                <div className="text-xs text-slate-500 mb-1">Locations</div>
                <div className="text-slate-300 text-sm">{siteConfig.locationsDisplay}</div>
              </div>
            </div>
            <p className="text-slate-600 text-xs px-1">Your details are kept confidential. We do not share your information with third parties.</p>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 card-surface p-8">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 size={48} className="text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-syne)' }}>Thank You!</h3>
                <p className="text-slate-400">We have received your message and will be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input {...register('fullName')} placeholder="Your full name" className={cn('form-input', errors.fullName && 'error')} />
                    {errors.fullName && <p className="form-error">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input {...register('email')} type="email" placeholder="you@company.com" className={cn('form-input', errors.email && 'error')} />
                    {errors.email && <p className="form-error">{errors.email.message}</p>}
                  </div>
                  <div>
                    <label className="form-label">Phone (optional)</label>
                    <input {...register('phone')} placeholder="+91 XXXXX XXXXX" className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Company Name (optional)</label>
                    <input {...register('companyName')} placeholder="Your company" className="form-input" />
                  </div>
                </div>
                <div>
                  <label className="form-label">Service Interest *</label>
                  <select {...register('serviceInterest')} className={cn('form-input', errors.serviceInterest && 'error')}>
                    <option value="">Select a service</option>
                    {serviceOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                  {errors.serviceInterest && <p className="form-error">{errors.serviceInterest.message}</p>}
                </div>
                <div>
                  <label className="form-label">Message *</label>
                  <textarea {...register('message')} rows={4} placeholder="Tell us about your business and what you need help with..." className={cn('form-input resize-none', errors.message && 'error')} />
                  {errors.message && <p className="form-error">{errors.message.message}</p>}
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                  {loading ? 'Sending...' : <><Send size={16} /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
