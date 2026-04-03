import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllResourceMeta } from '@/lib/mdx'
import { ResourceCard } from '@/components/resource-card'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides and playbooks on blockchain architecture and smart contract security.',
}

export default function ResourcesPage() {
  const resources = getAllResourceMeta()
  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              ← Home
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <Link href="/newsletter" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              Newsletter
            </Link>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Free Downloads
          </p>
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
            Resources
          </h1>
          <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
            Practical guides built from real projects. Enter your email to download — no fluff.
          </p>
        </div>
      </section>

      {/* ── Resource cards ───────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {resources.map((r) => <ResourceCard key={r.slug} resource={r} />)}
        </div>
      </div>
    </>
  )
}
