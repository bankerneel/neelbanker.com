import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
export const NEWSLETTER_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''
export const NEWSLETTER_FROM_EMAIL =
  process.env.NEWSLETTER_FROM_EMAIL ?? 'Neel Banker <insights@neelbanker.com>'
export const ENQUIRY_FROM_EMAIL =
  process.env.ENQUIRY_FROM_EMAIL ?? 'Neel Banker <inquiry@neelbanker.com>'
export const CONTACT_TO_EMAIL =
  process.env.CONTACT_EMAIL ?? 'inquiry@neelbanker.com'
