import { z } from 'zod'

export const fileUploadRequestSchema = z.object({
  originalName: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  sizeBytes: z.number().positive(),
  category: z.enum(['contract', 'proposal', 'report', 'design', 'deliverable', 'invoice', 'other']),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
})

export const fileRegisterSchema = z.object({
  originalName: z.string().min(1).max(255),
  storageKey: z.string().min(1),
  mimeType: z.string().min(1),
  sizeBytes: z.number().positive(),
  extension: z.string(),
  category: z.enum(['contract', 'proposal', 'report', 'design', 'deliverable', 'invoice', 'other']),
  clientId: z.string().optional(),
  projectId: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type FileUploadRequestInput = z.infer<typeof fileUploadRequestSchema>
export type FileRegisterInput = z.infer<typeof fileRegisterSchema>
