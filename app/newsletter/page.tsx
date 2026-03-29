import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/newsletter-form'

export const metadata: Metadata = {
  title: "The Architect's Brief",
  description: 'Weekly newsletter on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

export default function NewsletterPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="mb-3 font-mono text-sm font-semibold text-primary">Free · Weekly</p>
      <h1 className="mb-4 text-4xl font-extrabold">The Architect&apos;s Brief</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        One architectural insight per week. Rotating across blockchain, AI × Web3, and engineering leadership. No fluff, no filler.
      </p>
      <div className="mb-8 rounded-lg border border-border bg-muted/20 p-5">
        <p className="mb-3 text-sm font-semibold">What you get:</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>⛓️ Deep dives on blockchain architecture (ERC-4337, custody, DeFi patterns)</li>
          <li>🤖 AI × Web3 practical guides (on-chain agents, LLM tooling)</li>
          <li>🏗️ Engineering leadership (team decisions, scaling tech orgs)</li>
          <li>Links to the week&apos;s best reads in the space</li>
        </ul>
      </div>
      <NewsletterForm />
      <p className="mt-3 text-xs text-muted-foreground">Unsubscribe anytime. No spam, ever.</p>
    </div>
  )
}
