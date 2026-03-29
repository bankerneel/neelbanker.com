import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { CONTACT_TO_EMAIL, ENQUIRY_FROM_EMAIL, resend } from '@/lib/resend'

const optionalText = z.union([z.string().trim(), z.literal('')]).transform((value) => {
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
})

const schema = z.object({
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  company: optionalText,
  service: z.string().trim().min(1),
  description: z.string().trim().min(10),
  source: optionalText,
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Please fill all required fields correctly.' }, { status: 400 })
    }

    const { name, email, company, service, description, source } = parsed.data

    await resend.emails.send({
      from: ENQUIRY_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New enquiry: ${escapeHtml(service)} — ${escapeHtml(name)}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${company ? escapeHtml(company) : '—'}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Description:</strong></p>
        <p>${escapeHtml(description)}</p>
        <p><strong>Source:</strong> ${source ? escapeHtml(source) : '—'}</p>
      `,
    })

    const firstName = escapeHtml(name.split(' ')[0] ?? 'there')
    await resend.emails.send({
      from: ENQUIRY_FROM_EMAIL,
      to: email,
      subject: `Got your message, ${firstName}`,
      html: `<p>Hi ${firstName},</p>
             <p>Thanks for reaching out — I&apos;ve received your message about <strong>${escapeHtml(service)}</strong>.</p>
             <p>I&apos;ll get back to you within 2 business days.</p>
             <p>— Neel</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Something went wrong while sending your message.' }, { status: 500 })
  }
}
