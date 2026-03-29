import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/contact-schema'
import { CONTACT_TO_EMAIL, ENQUIRY_FROM_EMAIL, resend } from '@/lib/resend'

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
    const parsed = contactFormSchema.safeParse(body)

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
