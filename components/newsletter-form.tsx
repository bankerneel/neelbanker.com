'use client'

import { useState } from 'react'

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
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
      <div className="border border-primary/20 bg-primary/5 px-5 py-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">You&apos;re in</p>
        <p className="mt-2 text-sm leading-[1.8] text-muted-foreground">
          Check your inbox for the confirmation email.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <form
        onSubmit={handleSubmit}
        className={`border border-border bg-background transition-colors duration-200 focus-within:border-primary ${
          compact ? 'flex flex-col sm:flex-row' : 'flex flex-col'
        }`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="min-h-12 flex-1 bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground [color-scheme:dark] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          suppressHydrationWarning
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="cursor-pointer bg-primary px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
          suppressHydrationWarning
        >
          {state === 'loading' ? 'Sending…' : 'Subscribe →'}
        </button>
      </form>
      {state === 'error' && (
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-red-400">
          Something went wrong. Try again.
        </p>
      )}
    </div>
  )
}
