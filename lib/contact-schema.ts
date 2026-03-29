import { z } from 'zod'

const optionalText = z.union([z.string().trim(), z.literal('')]).transform((value) => {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
})

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().trim().email('Enter a valid email address'),
  company: optionalText,
  service: z.string().trim().min(1, 'Please select a service'),
  description: z.string().trim().min(10, 'Please share at least 10 characters'),
  source: optionalText,
})

export type ContactFormInput = z.input<typeof contactFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
