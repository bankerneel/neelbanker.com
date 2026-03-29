import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticleMeta } from '@/lib/mdx'
import { PillarFilter } from '@/components/pillar-filter'

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

export default function WritingPage() {
  const articles = getAllArticleMeta()
  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              ← Home
            </Link>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
            The Architect&apos;s Brief
          </p>
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
            Writing
          </h1>
          <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
            Weekly articles on Blockchain Architecture, AI × Web3, and Engineering Leadership.
          </p>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12">
        <PillarFilter articles={articles} />
      </div>
    </>
  )
}
