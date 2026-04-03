import type { Metadata } from 'next'
import Link from 'next/link'
import { ResourceCard } from '@/components/resource-card'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'
import { getAllResourceMeta } from '@/lib/mdx'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides and playbooks on blockchain architecture and smart contract security.',
}

const signals = [
  {
    label: 'Built from delivery',
    value: 'Distilled from live systems work across custody, security reviews, and production architecture.',
  },
  {
    label: 'Short and practical',
    value: 'Made to help teams move faster, not to pad word count with generic advice.',
  },
  {
    label: 'Email-gated only',
    value: 'Enter an email to get the file and optionally opt into the newsletter. No clutter beyond that.',
  },
]

export default function ResourcesPage() {
  const resources = getAllResourceMeta()

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
          <FadeUp delay={0.05}>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                ← Home
              </Link>
              <span className="text-xs text-muted-foreground">/</span>
              <Link
                href="/newsletter"
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Newsletter
              </Link>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Free Downloads
            </p>
          </FadeUp>
          <FadeUp delay={0.25}>
            <h1 className="mb-6 font-semibold text-4xl uppercase tracking-tighter leading-[0.9] sm:text-5xl md:text-6xl">
              Resources
            </h1>
          </FadeUp>
          <FadeUp delay={0.4}>
            <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground">
              Practical guides built from real projects. These are compact working resources on custody, wallet architecture, and smart contract review patterns teams can use immediately.
            </p>
          </FadeUp>
        </div>
      </section>

      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-12 sm:py-16">
        <FadeUp>
          <div className="mb-16 grid gap-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-end">
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Resource profile</p>
              <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                Focused downloads for teams in motion
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
              The point here is not “lead magnet” content. These downloads are short operational guides drawn from the same systems thinking reflected in the case studies and writing archive.
            </p>
          </div>
        </FadeUp>

        <StaggerContainer className="mb-20 grid gap-px bg-border lg:grid-cols-3">
          {signals.map((item) => (
            <StaggerItem key={item.label} className="bg-background">
              <div className="h-full px-5 py-5 sm:px-6">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-primary">{item.label}</p>
                <p className="text-sm leading-[1.8] text-muted-foreground">{item.value}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mb-8 grid gap-4 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <FadeUp>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Available now</p>
              <h2 className="font-semibold text-2xl uppercase tracking-tight sm:text-3xl">
                Downloadable guides and checklists
              </h2>
            </div>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p className="max-w-2xl text-sm leading-[1.8] text-muted-foreground">
              Each download opens immediately after submission and also sends a copy to the inbox, so teams can share it internally or come back later.
            </p>
          </FadeUp>
        </div>

        <StaggerContainer className="grid gap-4 xl:grid-cols-2">
          {resources.map((resource) => (
            <StaggerItem key={resource.slug}>
              <ResourceCard resource={resource} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </>
  )
}
