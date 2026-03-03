import { z } from 'zod'

export const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  clientId: z.string().min(1),
  type: z.enum(['software_engineering', 'growth_intelligence', 'business_foundation', 'internal']),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  startDate: z.string().optional(),
  targetEndDate: z.string().optional(),
  projectManager: z.string().optional(),
  teamMembers: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
})

export const updateProjectSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  status: z.enum(['scoping', 'proposal', 'active', 'on_hold', 'completed', 'cancelled']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  targetEndDate: z.string().optional(),
  completionPercent: z.number().min(0).max(100).optional(),
  projectManager: z.string().optional().nullable(),
  note: z.object({ content: z.string().min(1) }).optional(),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>
