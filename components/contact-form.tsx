'use client'
import { useState } from 'react'
import { contactFormSchema, type ContactFormInput } from '@/lib/contact-schema'
import { cn } from '@/lib/utils'

const SERVICES = [
  '1:1 Strategy Call',
  'Smart Contract Audit',
  'Architecture Review',
  'Fractional CTO / Advisor',
  'Leadership / Recruiter Enquiry',
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
      'w-full border border-border bg-muted/30 px-3 py-3 text-sm text-foreground transition-colors duration-200 [color-scheme:dark] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
      errors[field]
        ? 'border-red-500/60 focus-visible:ring-red-500'
        : 'hover:border-primary/30'
    )
  }

  if (state === 'done') {
    return (
      <div className="border border-emerald-500/20 bg-emerald-500/5 p-6">
        <p className="text-lg font-semibold text-emerald-400">Message received ✓</p>
        <p className="mt-2 text-sm text-muted-foreground">I&apos;ll get back to you within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-border bg-background p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Name</label>
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
          <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Email</label>
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
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Company / Project</label>
        <input
          value={form.company}
          onChange={(e) => update('company', e.target.value)}
          aria-invalid={Boolean(errors.company)}
          className={fieldClassName('company')}
        />
        {errors.company && <p className="mt-1 text-sm text-red-400">{errors.company}</p>}
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Which service interests you?</label>
        <select
          required
          value={form.service}
          onChange={(e) => update('service', e.target.value)}
          aria-invalid={Boolean(errors.service)}
          className={cn(fieldClassName('service'), 'appearance-none bg-background')}
        >
          <option value="">Select a service</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="mt-1 text-sm text-red-400">{errors.service}</p>}
      </div>
      <div>
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Brief description of what you&apos;re building</label>
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
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">How did you hear about me?</label>
        <input
          value={form.source}
          onChange={(e) => update('source', e.target.value)}
          aria-invalid={Boolean(errors.source)}
          className={fieldClassName('source')}
        />
        {errors.source && <p className="mt-1 text-sm text-red-400">{errors.source}</p>}
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className="cursor-pointer bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending…' : 'Send Message →'}
      </button>
      {submitError && <p className="text-sm text-red-400">{submitError}</p>}
    </form>
  )
}
