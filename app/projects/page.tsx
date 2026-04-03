import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllProjectMeta } from '@/lib/mdx'
import { ProjectBrowser } from '@/components/project-browser'
import { FadeUp } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real blockchain systems I have designed and shipped — with lessons learned.',
}

export default function ProjectsPage() {
  const projects = getAllProjectMeta()
  const signals = [
    { label: 'Wallet & Custody', value: 'NCW, Fireblocks, BitGo, ERC-4337' },
    { label: 'Chains & Infrastructure', value: 'OP Stack, Fabric, custom EVM, bridge systems' },
    { label: 'AI Systems', value: 'Agent workflows, local LLMs, ranking and orchestration' },
  ]

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
              <Link href="/work-with-me" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
                Work With Me
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
              Proof of Work
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
              Projects
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
              Systems designed and shipped. Every entry includes the problem, architecture decisions, and what I&apos;d do differently.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Project cards ────────────────────────────────── */}
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-12 grid gap-px bg-border lg:grid-cols-3">
            {signals.map((signal) => (
              <div key={signal.label} className="bg-background p-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{signal.label}</p>
                <p className="text-sm leading-[1.7] text-foreground">{signal.value}</p>
              </div>
            ))}
          </div>
        </FadeUp>
        <ProjectBrowser projects={projects} />
      </div>
    </>
  )
}
