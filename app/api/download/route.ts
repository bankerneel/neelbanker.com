import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { resend, FROM_EMAIL, NEWSLETTER_AUDIENCE_ID } from '@/lib/resend'
import { getAllResourceMeta } from '@/lib/mdx'

const schema = z.object({
  email: z.string().email(),
  optIn: z.boolean(),
  slug: z.string().min(1),
})

export async function POST(req: NextRequest) {
  const start = Date.now()
  const requestId = req.headers.get('x-vercel-id') ?? undefined

  console.log(JSON.stringify({ level: 'info', msg: 'start', route: '/api/download', requestId }))

  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const { email, optIn, slug } = parsed.data
    const resources = getAllResourceMeta()
    const resource = resources.find((r) => r.slug === slug)

    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
    }

    // Optionally subscribe to newsletter (explicit opt-in only — GDPR compliant)
    if (optIn && NEWSLETTER_AUDIENCE_ID) {
      await resend.contacts.create({
        email,
        audienceId: NEWSLETTER_AUDIENCE_ID,
        unsubscribed: false,
      }).catch(() => null) // Don't block download on subscribe failure
    }

    // Send download link by email
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Your download: ${resource.title}`,
      html: `<p>Thanks for downloading <strong>${resource.title}</strong>.</p>
             <p><a href="https://neelbanker.com${resource.fileUrl}">Click here to download</a></p>
             <p>— Neel</p>`,
    })

    console.log(JSON.stringify({ level: 'info', msg: 'done', route: '/api/download', slug, ms: Date.now() - start }))
    return NextResponse.json({ url: resource.fileUrl })
  } catch (err) {
    console.error(JSON.stringify({
      level: 'error',
      msg: 'failed',
      route: '/api/download',
      error: err instanceof Error ? err.message : String(err),
      ms: Date.now() - start,
    }))
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
