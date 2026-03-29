'use client'
import { useState } from 'react'
import type { ResourceMeta } from '@/types/content'

export function ResourceCard({ resource }: { resource: ResourceMeta }) {
  const [email, setEmail] = useState('')
  const [optIn, setOptIn] = useState(false)
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('loading')
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, optIn, slug: resource.slug }),
    })
    setState(res.ok ? 'done' : 'error')
    if (res.ok) {
      const { url } = await res.json()
      window.open(url, '_blank')
    }
  }

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Free Download</p>
      <h3 className="font-extrabold text-base uppercase tracking-tight mb-2">{resource.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">{resource.description}</p>

      {state === 'done' ? (
        <p className="font-mono text-xs text-primary uppercase tracking-widest">Download started. Check your inbox for a copy.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            suppressHydrationWarning
            className="border border-border bg-muted px-3 py-2.5 text-sm font-mono placeholder:text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
          />
          <label className="flex items-start gap-2.5 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-0.5 cursor-pointer accent-[hsl(72_100%_49%)]"
            />
            Send me The Architect&apos;s Brief — weekly insights on blockchain &amp; AI
          </label>
          <button
            type="submit"
            disabled={state === 'loading'}
            className="cursor-pointer bg-primary px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {state === 'loading' ? 'Sending…' : 'Download Free →'}
          </button>
          {state === 'error' && (
            <p className="font-mono text-xs text-red-400 uppercase tracking-widest">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  )
}
