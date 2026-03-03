import { z } from 'zod'

export const createClientSchema = z.object({
  companyName: z.string().min(1).max(200),
  industry: z.string().optional(),
  companySize: z.enum(['solo', '2-10', '11-50', '51-200', '200+']).optional(),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  primaryContact: z.object({
    fullName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    jobTitle: z.string().optional(),
  }),
  status: z.enum(['active', 'inactive', 'churned', 'prospect']).default('prospect'),
  accountManager: z.string().optional(),
  clientSince: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export const updateClientSchema = createClientSchema.partial()

export type CreateClientInput = z.infer<typeof createClientSchema>
export type UpdateClientInput = z.infer<typeof updateClientSchema>
