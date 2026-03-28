import type { Metadata } from 'next'
import { getAllResourceMeta } from '@/lib/mdx'
import { ResourceCard } from '@/components/resource-card'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides and playbooks on blockchain architecture and smart contract security.',
}

export default function ResourcesPage() {
  const resources = getAllResourceMeta()
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold">Free Resources</h1>
      <p className="mb-10 text-muted-foreground">
        Practical guides built from real projects. Enter your email to download — no fluff.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {resources.map((r) => <ResourceCard key={r.slug} resource={r} />)}
      </div>
    </div>
  )
}
