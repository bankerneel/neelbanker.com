import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllResourceMeta } from '@/lib/mdx'
import { ResourceCard } from '@/components/resource-card'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

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
          <FadeUp delay={0.05}>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                ← Home
              </Link>
              <span className="text-muted-foreground text-xs">/</span>
              <Link href="/newsletter" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                Newsletter
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
              Free Downloads
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              Resources
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              Practical guides built from real projects. Enter your email to download — no fluff.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Resource cards ───────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-12 border border-border p-8 sm:p-10">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-primary">Built from live delivery</p>
            <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
              These are practical downloadables distilled from the same systems work shown in the projects and writing sections: wallet architecture, custody flows, smart contract review patterns, and operational lessons that teams can use immediately.
            </p>
          </div>
        </FadeUp>
        <StaggerContainer className="grid gap-px bg-border sm:grid-cols-2">
          {resources.map((r) => (
            <StaggerItem key={r.slug} className="bg-background">
              <ResourceCard resource={r} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </>
  )
}
