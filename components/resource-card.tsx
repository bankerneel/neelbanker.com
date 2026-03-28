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
    <div className="rounded-lg border border-border p-6">
      <h3 className="mb-2 text-base font-semibold">{resource.title}</h3>
      <p className="mb-4 text-sm text-muted-foreground">{resource.description}</p>

      {state === 'done' ? (
        <p className="text-sm text-emerald-400">✓ Download started. Check your inbox for a copy too.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-md border border-border bg-muted px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-0.5"
            />
            Send me The Architect&#39;s Brief — weekly insights on blockchain &amp; AI
          </label>
          <button
            type="submit"
            disabled={state === 'loading'}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {state === 'loading' ? 'Sending…' : 'Download Free →'}
          </button>
          {state === 'error' && <p className="text-sm text-red-400">Something went wrong. Please try again.</p>}
        </form>
      )}
    </div>
  )
}
