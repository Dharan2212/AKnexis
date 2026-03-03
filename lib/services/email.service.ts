import { env } from '@/lib/config/env'
import { logger } from '@/lib/utils/logger'
import type { ILead } from '@/lib/db/models/Lead.model'
import type { IUser } from '@/lib/db/models/User.model'

interface EmailMessage {
  to: string
  from: string
  subject: string
  html: string
  text: string
}

async function sendEmail(message: EmailMessage): Promise<boolean> {
  if (!env.sendgridApiKey) {
    logger.warn('Email send skipped: SENDGRID_API_KEY not configured')
    return false
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.sendgridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: message.to }] }],
        from: { email: message.from, name: 'AKnexis' },
        subject: message.subject,
        content: [
          { type: 'text/html', value: message.html },
          { type: 'text/plain', value: message.text },
        ],
      }),
    })

    if (!response.ok) {
      const body = await response.text()
      logger.error('SendGrid email failed', { status: response.status, body })
      return false
    }

    return true
  } catch (error) {
    logger.error('Email send error', { error: error instanceof Error ? error.message : String(error) })
    return false
  }
}

export async function sendLeadNotificationEmail(lead: ILead): Promise<void> {
  const serviceLabels: Record<string, string> = {
    legal_registrations: 'Legal Registrations & Documentation',
    branding_identity: 'Brand Identity Design',
    web_software_development: 'Website & Software Development',
    platform_setup: 'Digital Platform Setup',
    seo_marketing: 'SEO & Digital Marketing',
    support_maintenance: 'Ongoing Support & Maintenance',
    operations_manpower: 'Workman Support & Operational Guidance',
    not_sure: 'Not Sure Yet',
  }

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Lead</title></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #050A16; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
    <h1 style="color: #2DD4BF; margin: 0; font-size: 20px;">New Lead Received — AKnexis</h1>
  </div>
  <table style="width: 100%; border-collapse: collapse;">
    <tr><td style="padding: 8px; font-weight: bold; color: #475569; width: 160px;">Name</td><td style="padding: 8px;">${lead.fullName}</td></tr>
    <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Email</td><td style="padding: 8px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
    ${lead.phone ? `<tr><td style="padding: 8px; font-weight: bold; color: #475569;">Phone</td><td style="padding: 8px;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>` : ''}
    ${lead.companyName ? `<tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Company</td><td style="padding: 8px;">${lead.companyName}</td></tr>` : ''}
    <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Service Interest</td><td style="padding: 8px;">${serviceLabels[lead.serviceInterest] || lead.serviceInterest}</td></tr>
    <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Message</td><td style="padding: 8px;">${lead.message}</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Submitted At</td><td style="padding: 8px;">${new Date(lead.createdAt).toLocaleString('en-IN')}</td></tr>
    ${lead.utmSource ? `<tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">UTM Source</td><td style="padding: 8px;">${lead.utmSource}</td></tr>` : ''}
  </table>
  <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border-radius: 4px; font-size: 12px; color: #94a3b8;">
    This is an automated notification. Please do not reply to this email.
  </div>
</body>
</html>`

  const text = `New Lead — AKnexis\n\nName: ${lead.fullName}\nEmail: ${lead.email}\n${lead.phone ? `Phone: ${lead.phone}\n` : ''}${lead.companyName ? `Company: ${lead.companyName}\n` : ''}Service: ${serviceLabels[lead.serviceInterest]}\nMessage: ${lead.message}\nSubmitted: ${new Date(lead.createdAt).toLocaleString('en-IN')}`

  await sendEmail({
    to: env.emailNotifyLeads,
    from: env.emailFrom,
    subject: 'New Lead Received — AKnexis',
    html,
    text,
  })
}

export async function sendNewUserInviteEmail(user: IUser, tempPassword: string): Promise<void> {
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #050A16; padding: 24px; border-radius: 8px; margin-bottom: 24px;">
    <h1 style="color: #2DD4BF; margin: 0; font-size: 20px;">Your AKnexis Admin Access</h1>
  </div>
  <p>Hello ${user.firstName},</p>
  <p>Your AKnexis admin account has been created. Here are your credentials:</p>
  <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
    <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Email</td><td style="padding: 8px;">${user.email}</td></tr>
    <tr style="background: #f8fafc;"><td style="padding: 8px; font-weight: bold; color: #475569;">Temporary Password</td><td style="padding: 8px; font-family: monospace;">${tempPassword}</td></tr>
    <tr><td style="padding: 8px; font-weight: bold; color: #475569;">Role</td><td style="padding: 8px;">${user.role}</td></tr>
  </table>
  <p>Please log in and change your password immediately.</p>
  <p style="font-size: 12px; color: #94a3b8;">This email was sent by AKnexis admin system.</p>
</body>
</html>`

  const text = `Your AKnexis Admin Access\n\nHello ${user.firstName},\n\nEmail: ${user.email}\nTemporary Password: ${tempPassword}\nRole: ${user.role}\n\nPlease log in and change your password immediately.`

  await sendEmail({
    to: user.email,
    from: env.emailFrom,
    subject: 'Your AKnexis Admin Access',
    html,
    text,
  })
}
