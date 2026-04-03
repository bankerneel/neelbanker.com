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
    return <p className="text-sm text-emerald-400 font-mono">✓ You&apos;re in. Check your inbox.</p>
  }

  return (
    <div className="space-y-2">
      <form
        onSubmit={handleSubmit}
        className={`flex border border-border focus-within:border-primary transition-colors duration-200 ${compact ? 'flex-row' : 'flex-col sm:flex-row'}`}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="flex-1 bg-transparent border-none outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset text-foreground px-4 py-3.5 text-sm placeholder:text-muted-foreground font-mono"
          suppressHydrationWarning
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="cursor-pointer bg-primary text-primary-foreground font-mono font-bold text-xs uppercase tracking-widest px-6 py-3.5 hover:bg-foreground hover:text-background transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          suppressHydrationWarning
        >
          {state === 'loading' ? '…' : 'Subscribe →'}
        </button>
      </form>
      {state === 'error' && (
        <p className="text-xs text-red-400 font-mono">Something went wrong. Try again.</p>
      )}
    </div>
  )
}
