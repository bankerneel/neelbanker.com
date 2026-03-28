import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY ?? 'placeholder')
export const FROM_EMAIL = 'Neel Banker <neel@neelbanker.com>'
export const NEWSLETTER_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? ''
