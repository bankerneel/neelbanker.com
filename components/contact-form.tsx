'use client'
import { useState } from 'react'

const SERVICES = [
  '1:1 Strategy Call',
  'Smart Contract Audit',
  'Architecture Review',
  'Fractional CTO / Advisor',
  'Not sure yet',
]

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', description: '', source: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setState(res.ok ? 'done' : 'error')
  }

  if (state === 'done') {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-400">Message received ✓</p>
        <p className="mt-2 text-sm text-muted-foreground">I'll get back to you within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name</label>
          <input required value={form.name} onChange={(e) => update('name', e.target.value)}
            className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)}
            className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Company / Project</label>
        <input value={form.company} onChange={(e) => update('company', e.target.value)}
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Which service interests you?</label>
        <select required value={form.service} onChange={(e) => update('service', e.target.value)}
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary">
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Brief description of what you're building</label>
        <textarea required rows={4} value={form.description} onChange={(e) => update('description', e.target.value)}
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">How did you hear about me?</label>
        <input value={form.source} onChange={(e) => update('source', e.target.value)}
          className="w-full rounded-md border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
      </div>
      <button type="submit" disabled={state === 'loading'}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
        {state === 'loading' ? 'Sending…' : 'Send Message →'}
      </button>
      {state === 'error' && <p className="text-sm text-red-400">Something went wrong. Try again or email me directly.</p>}
    </form>
  )
}
