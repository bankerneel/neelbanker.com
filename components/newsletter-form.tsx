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
    return <p className="text-sm text-emerald-400">✓ You&apos;re in. Check your inbox to confirm.</p>
  }

  return (
    <form onSubmit={handleSubmit} className={`flex gap-2 ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 rounded-md border border-border bg-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
      />
      <button
        type="submit"
        disabled={state === 'loading'}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50 whitespace-nowrap"
      >
        {state === 'loading' ? '…' : 'Get The Architect&apos;s Brief →'}
      </button>
      {state === 'error' && (
        <p className="text-sm text-red-400">Something went wrong. Try again.</p>
      )}
    </form>
  )
}
