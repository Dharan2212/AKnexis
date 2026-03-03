import { z } from 'zod'

export const createLeadSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  companyName: z.string().max(200).optional(),
  serviceInterest: z.enum([
    'legal_registrations',
    'branding_identity',
    'web_software_development',
    'platform_setup',
    'seo_marketing',
    'support_maintenance',
    'operations_manpower',
    'not_sure',
  ]),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  referrer: z.string().optional(),
})

export const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'proposal_sent', 'converted', 'lost', 'spam']).optional(),
  assignedTo: z.string().optional().nullable(),
  note: z.object({
    content: z.string().min(1).max(2000),
  }).optional(),
})

export type CreateLeadInput = z.infer<typeof createLeadSchema>
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>
