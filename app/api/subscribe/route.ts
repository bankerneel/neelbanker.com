import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL, NEWSLETTER_AUDIENCE_ID } from '@/lib/resend'

const schema = z.object({ email: z.string().email() })

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  if (!NEWSLETTER_AUDIENCE_ID) {
    return NextResponse.json({ error: 'Newsletter not configured' }, { status: 500 })
  }

  const { email } = parsed.data

  await resend.contacts.create({
    email,
    audienceId: NEWSLETTER_AUDIENCE_ID,
    unsubscribed: false,
  })

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "You're subscribed to The Architect's Brief",
    html: `<p>Welcome — you're subscribed to <strong>The Architect's Brief</strong>.</p>
           <p>Every week: one insight on blockchain architecture, AI × Web3, or engineering leadership.</p>
           <p>First issue lands in your inbox shortly.</p>
           <p>— Neel</p>`,
  })

  return NextResponse.json({ ok: true })
}
