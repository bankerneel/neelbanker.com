'use client'
import { useState } from 'react'
import { contactFormSchema, type ContactFormInput } from '@/lib/contact-schema'
import { cn } from '@/lib/utils'

const SERVICES = [
  '1:1 Strategy Call',
  'Smart Contract Audit',
  'Architecture Review',
  'Fractional CTO / Advisor',
  'Not sure yet',
]

export function ContactForm() {
  const [form, setForm] = useState<ContactFormInput>({ name: '', email: '', company: '', service: '', description: '', source: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  function update(field: keyof ContactFormInput, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setSubmitError(null)
  }

  function validateForm() {
    const parsed = contactFormSchema.safeParse(form)
    if (parsed.success) {
      setErrors({})
      return true
    }

    const fieldErrors = parsed.error.flatten().fieldErrors
    setErrors({
      name: fieldErrors.name?.[0],
      email: fieldErrors.email?.[0],
      company: fieldErrors.company?.[0],
      service: fieldErrors.service?.[0],
      description: fieldErrors.description?.[0],
      source: fieldErrors.source?.[0],
    })
    return false
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) {
      setState('idle')
      return
    }

    setState('loading')
    setSubmitError(null)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setState('done')
      return
    }

    const payload = await res.json().catch(() => null)
    setSubmitError(payload?.error ?? 'Something went wrong. Try again or email me directly.')
    setState('error')
  }

  function fieldClassName(field: keyof ContactFormInput) {
    return cn(
      'w-full rounded-md border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-1',
      errors[field]
        ? 'border-red-500/60 focus:ring-red-500'
        : 'border-border focus:ring-primary'
    )
  }

  if (state === 'done') {
    return (
      <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
        <p className="text-lg font-semibold text-emerald-400">Message received ✓</p>
        <p className="mt-2 text-sm text-muted-foreground">I&apos;ll get back to you within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            className={fieldClassName('name')}
          />
          {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            className={fieldClassName('email')}
          />
          {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Company / Project</label>
        <input
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          aria-invalid={Boolean(errors.company)}
          className={fieldClassName('company')}
        />
        {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Which service interests you?</label>
        <select
          required
          value={form.service}
          onChange={(e) => update('service', e.target.value)}
          aria-invalid={Boolean(errors.service)}
          className={fieldClassName('service')}
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Brief description of what you&apos;re building</label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          aria-invalid={Boolean(errors.description)}
          className={cn(fieldClassName('description'), 'resize-none')}
        />
        {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">How did you hear about me?</label>
        <input
          value={form.source}
          onChange={(e) => update('source', e.target.value)}
          aria-invalid={Boolean(errors.source)}
          className={fieldClassName('source')}
        />
        {errors.source && <p className="mt-1 text-sm text-red-400">{errors.source}</p>}
      </div>
      <button type="submit" disabled={state === 'loading'}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
        {state === 'loading' ? 'Sending…' : 'Send Message →'}
      </button>
      {submitError && <p className="text-sm text-red-400">{submitError}</p>}
    </form>
  )
}
