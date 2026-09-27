import type { Metadata } from 'next'
import { ResourceCard } from '@/components/resource-card'
import { getAllResourceMeta } from '@/lib/mdx'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'
import { Band } from '@/components/bazaar/band'
import { MotionStage } from '@/components/motion/motion-stage'
import { FilmProgress, Scribbled } from '@/components/motion/scribbled'
import { pick, tones } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Free Resources',
  description: 'Free guides and playbooks on blockchain architecture and smart contract security.',
}

const signals = [
  {
    label: 'Built from delivery',
    value: 'Distilled from live systems work across custody, security reviews, and production architecture.',
    tone: 'tone-butter',
    tilt: 'rotate-[2.5deg]',
  },
  {
    label: 'Short and practical',
    value: 'Made to help teams move faster, not to pad word count with generic advice.',
    tone: 'tone-sage',
    tilt: '-rotate-2',
  },
  {
    label: 'Email-gated only',
    value: 'Enter an email to get the file and optionally opt into the newsletter. No clutter beyond that.',
    tone: 'tone-sky',
    tilt: 'rotate-[1.5deg]',
  },
]

export default function ResourcesPage() {
  const resources = getAllResourceMeta()

  return (
    <>
      <FilmProgress />
      <PageIntro
        motion
        crumbs={[
          { href: '/', label: '← Home' },
          { href: '/newsletter', label: 'Newsletter' },
        ]}
        kicker="Free downloads ✦"
        title="Resources"
      >
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[540px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              Practical guides built from real projects — compact working resources on custody, wallet architecture,
              and smart contract review patterns teams can use immediately.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-dm-ink-soft">
              Not &ldquo;lead magnet&rdquo; content: short operational guides drawn from the same systems thinking as
              the case studies and the writing archive.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">focused downloads for teams in motion</p>
          </Scrap>
          <ul className="hook-deal-any flex flex-col gap-5 lg:-ml-6 lg:mt-8 lg:w-[340px]">
            {signals.map((signal, i) => (
              <li
                key={signal.label}
                className={cn('border-2 border-current p-4 shadow-hard', signal.tone, signal.tilt, i > 0 && 'lg:-mt-2')}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{signal.label}</p>
                <p className="mt-1.5 text-[15px] font-semibold leading-[1.45]">{signal.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageIntro>

      <Band tone="panel" edge="perf" bottomEdge="torn" pattern="ruled" className="mt-24">
      <section aria-labelledby="available" className="page-wrap py-24 sm:py-28">
        <div className="max-w-3xl">
          <h2 id="available" data-sd className="sd-slam text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter">
            Grab a <Scribbled>guide</Scribbled>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75] text-dm-ink-soft">
            Each download opens immediately after submission and also sends a copy to the inbox, so teams can share it
            internally or come back later.
          </p>
        </div>
        <ul className="mt-10 grid gap-10 xl:grid-cols-2">
          {resources.map((resource, i) => (
            <li key={resource.slug}>
              <ResourceCard resource={resource} tone={pick(tones, i + 1)} />
            </li>
          ))}
        </ul>
      </section>
      </Band>
      <MotionStage />
    </>
  )
}
