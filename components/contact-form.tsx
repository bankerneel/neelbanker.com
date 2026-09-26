'use client'
import { useId, useState } from 'react'
import { contactFormSchema, type ContactFormInput } from '@/lib/contact-schema'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/bazaar/styles'

const SERVICES = [
  '1:1 Strategy Call',
  'Smart Contract Audit',
  'Architecture Review',
  'Fractional CTO / Advisor',
  'Leadership / Recruiter Enquiry',
  'Not sure yet',
]

const labelClass = 'mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em]'
const errorClass = 'mt-1.5 text-sm font-semibold text-destructive'

export function ContactForm() {
  const uid = useId()
  const [form, setForm] = useState<ContactFormInput>({ name: '', email: '', company: '', service: '', description: '', source: '' })
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)

  const id = (field: keyof ContactFormInput) => `${uid}-${field}`
  const errorId = (field: keyof ContactFormInput) => `${uid}-${field}-error`

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

  /** Shared props: label link, invalid state, and error description. */
  function fieldProps(field: keyof ContactFormInput) {
    return {
      id: id(field),
      'aria-invalid': Boolean(errors[field]),
      'aria-describedby': errors[field] ? errorId(field) : undefined,
      className: cn(
        'w-full border-2 bg-dm-panel px-3 py-3 text-[15px] text-dm-ink transition-colors duration-200',
        errors[field] ? 'border-destructive' : 'border-current/45 hover:border-current',
        focusRing,
      ),
    }
  }

  function fieldError(field: keyof ContactFormInput) {
    return errors[field] ? (
      <p id={errorId(field)} className={errorClass}>
        {errors[field]}
      </p>
    ) : null
  }

  if (state === 'done') {
    return (
      <div role="status" className="tone-sage border-2 border-current p-7 shadow-hard">
        <p className="text-xl font-black uppercase tracking-tight">Message received ✓</p>
        <p className="hand mt-2 text-[1.5rem] leading-none">I&apos;ll get back to you within 2 business days.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="tone-panel flex flex-col gap-5 border-2 border-current p-5 shadow-hard-lg sm:p-7">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className={labelClass}>Name</label>
          <input required autoComplete="name" value={form.name} onChange={(e) => update('name', e.target.value)} {...fieldProps('name')} />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor={id('email')} className={labelClass}>Email</label>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            {...fieldProps('email')}
          />
          {fieldError('email')}
        </div>
      </div>
      <div>
        <label htmlFor={id('company')} className={labelClass}>Company / Project</label>
        <input autoComplete="organization" value={form.company} onChange={(e) => update('company', e.target.value)} {...fieldProps('company')} />
        {fieldError('company')}
      </div>
      <div>
        <label htmlFor={id('service')} className={labelClass}>Which service interests you?</label>
        <div className="relative">
          <select
            required
            value={form.service}
            onChange={(e) => update('service', e.target.value)}
            {...fieldProps('service')}
            className={cn(fieldProps('service').className, 'cursor-pointer appearance-none pr-10')}
          >
            <option value="">Select a service</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm">▾</span>
        </div>
        {fieldError('service')}
      </div>
      <div>
        <label htmlFor={id('description')} className={labelClass}>Brief description of what you&apos;re building</label>
        <textarea
          required
          rows={5}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          {...fieldProps('description')}
          className={cn(fieldProps('description').className, 'resize-y')}
        />
        {fieldError('description')}
      </div>
      <div>
        <label htmlFor={id('source')} className={labelClass}>How did you hear about me?</label>
        <input value={form.source} onChange={(e) => update('source', e.target.value)} {...fieldProps('source')} />
        {fieldError('source')}
      </div>
      <button
        type="submit"
        disabled={state === 'loading'}
        className={cn(
          'ticket tone-ink min-h-12 w-full cursor-pointer justify-center text-xs shadow-hard transition-[rotate,background-color,color] duration-200 hover:-rotate-1 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit sm:px-8',
          focusRing,
        )}
      >
        {state === 'loading' ? 'Sending…' : 'Send message →'}
      </button>
      {submitError && (
        <p role="alert" className={errorClass}>
          {submitError}
        </p>
      )}
    </form>
  )
}
