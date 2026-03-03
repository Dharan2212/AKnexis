import { siteConfig } from '@/lib/config/site'

export function formatPhone(phone: string): string {
  return `tel:${phone.replace(/\s/g, '')}`
}

export function formatMailto(email: string): string {
  return `mailto:${email}`
}

export function formatWhatsApp(phone: string, message?: string): string {
  const number = phone.replace(/[^0-9]/g, '')
  const msg = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${number}${msg}`
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export const contactLinks = {
  phone: siteConfig.contact.phoneTel,
  whatsapp: siteConfig.contact.whatsapp,
  email: siteConfig.contact.emailLink,
}
