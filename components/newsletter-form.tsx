'use client'

import { useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { focusRing } from '@/components/bazaar/styles'

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setState(res.ok ? 'done' : 'error')
  }

  if (state === 'done') {
    return (
      <div role="status" className="tone-sage border-2 border-current px-5 py-5 shadow-hard">
        <p className="text-lg font-black uppercase tracking-tight">You&apos;re in ✓</p>
        <p className="hand mt-1 text-[1.4rem] leading-tight">check your inbox for the confirmation email</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSubmit}
        className={cn('tone-panel flex border-2 border-current shadow-hard', compact ? 'flex-col sm:flex-row' : 'flex-col')}
      >
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={cn('min-h-12 flex-1 bg-transparent px-4 py-3 text-[15px] text-dm-ink placeholder:text-dm-ink-soft', focusRing)}
          suppressHydrationWarning
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className={cn(
            'tone-ink min-h-12 cursor-pointer px-6 text-xs font-bold uppercase tracking-[0.12em] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60',
            focusRing,
          )}
          suppressHydrationWarning
        >
          {state === 'loading' ? 'Sending…' : 'Subscribe →'}
        </button>
      </form>
      {state === 'error' && (
        <p role="alert" className="text-sm font-semibold text-destructive">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}
