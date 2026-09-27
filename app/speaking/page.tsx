import type { Metadata } from 'next'
import Link from 'next/link'
import { Band } from '@/components/bazaar/band'
import { MotionStage } from '@/components/motion/motion-stage'
import { FilmProgress, Scribbled } from '@/components/motion/scribbled'
import { TALKS } from '@/lib/talks'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'
import { chipLink, focusRing, pick, tilts } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Speaking',
  description: 'Talks on blockchain fundamentals, NFTs, and practical engineering at GDG Ahmedabad, ICAI Centre of Excellence, and internal sessions.',
}

const speakingProfile = [
  {
    label: 'Event formats',
    value: 'Conference talks, workshops, internal engineering sessions, and founder or leadership roundtables.',
    tone: 'tone-butter',
    tilt: 'rotate-[2.5deg]',
  },
  {
    label: 'Best topics',
    value: 'Blockchain architecture, wallet and custody systems, AI-augmented engineering, and technical leadership under delivery pressure.',
    tone: 'tone-sage',
    tilt: '-rotate-2',
  },
  {
    label: 'Audience fit',
    value: 'Engineering teams, Web3 builders, founder communities, developer groups, and product leaders navigating technical complexity.',
    tone: 'tone-sky',
    tilt: 'rotate-[1.5deg]',
  },
]

const invitationSignals = [
  'Available for conferences and internal sessions',
  'Best for technical and operator audiences',
  'Remote or in-person depending on fit',
]

const posterTones = ['tone-rose', 'tone-sky', 'tone-sage']

export default function SpeakingPage() {
  return (
    <>
      <FilmProgress />
      <PageIntro
        motion
        crumbs={[
          { href: '/', label: '← Home' },
          { href: '/about', label: 'About' },
        ]}
        kicker="Talks & sessions ✦"
        title="Speaking"
      >
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[540px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              I speak where technical fundamentals meet practical decision-making: blockchain architecture, digital
              ownership systems, developer tooling, and engineering judgment under delivery pressure.
            </p>
            <p className="mt-4 text-[15px] leading-[1.7] text-dm-ink-soft">
              The best sessions make complicated systems easier to understand without flattening the trade-offs.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">technical sessions, operator context</p>
          </Scrap>
          <ul className="hook-deal-any flex flex-col gap-5 lg:-ml-6 lg:mt-8 lg:w-[340px]">
            {speakingProfile.map((item, i) => (
              <li key={item.label} className={cn('border-2 border-current p-4 shadow-hard', item.tone, item.tilt, i > 0 && 'lg:-mt-2')}>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{item.label}</p>
                <p className="mt-1.5 text-[15px] font-semibold leading-[1.45]">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageIntro>

      {/* ── Talks ─────────────────────────────────────────────────────── */}
      <Band tone="night" edge="torn" bottomEdge="torn" pattern="stars" spotlight className="mt-24">
      <section aria-labelledby="talks" className="page-wrap py-24 sm:py-28">
        <div className="max-w-3xl">
          <h2 id="talks" data-sd className="sd-slam text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter">
            Recorded <Scribbled>talks</Scribbled>
          </h2>
          <p className="mt-4 text-[15px] leading-[1.75]">
            A small archive of public sessions across developer communities, professional audiences, and internal
            engineering environments.
          </p>
        </div>
        <ol className="mt-12 space-y-14">
          {TALKS.map((talk, i) => (
            <li key={talk.title} data-reveal className="rv-rise">
              <Scrap
                className={i % 2 ? 'rotate-[0.6deg]' : '-rotate-[0.6deg]'}
                paperClassName="tone-panel grid gap-7 p-5 sm:p-7 md:grid-cols-[minmax(0,260px)_minmax(0,1fr)] md:gap-9"
              >
                {/* the "poster": watch link */}
                <a
                  href={talk.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group relative flex min-h-[170px] cursor-pointer flex-col justify-between border-2 border-current p-4',
                    pick(posterTones, i),
                    focusRing,
                  )}
                >
                  <span className="ticket w-fit">{talk.type}</span>
                  <span className="flex items-center gap-3">
                    <span className="flex size-12 items-center justify-center rounded-full border-2 border-current bg-dm-panel text-dm-ink transition-[scale] duration-200 group-hover:scale-110">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-0.5 size-5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                      Watch talk <span className="sr-only">: {talk.title}</span> ↗
                    </span>
                  </span>
                </a>

                <div className="min-w-0 py-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-dm-ink-soft">{talk.venue}</p>
                  <h3 className="mt-2 text-[clamp(1.35rem,2.6vw,1.8rem)] font-black uppercase leading-[1.05] tracking-tight">
                    {talk.title}
                  </h3>
                  <p className="mt-4 max-w-3xl text-[15px] leading-[1.75]">{talk.description}</p>
                  <ul aria-label="Topics" className="mt-5 flex flex-wrap gap-1.5">
                    {talk.topics.map((topic) => (
                      <li key={topic} className="border border-current/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em]">
                        {topic}
                      </li>
                    ))}
                  </ul>
                  {talk.eventUrl && (
                    <a
                      href={talk.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(chipLink, 'tone-panel mt-5 -rotate-1')}
                    >
                      Event page ↗
                    </a>
                  )}
                </div>
              </Scrap>
            </li>
          ))}
        </ol>
      </section>
      </Band>

      {/* ── Invite ────────────────────────────────────────────────────── */}
      <section aria-labelledby="invite" className="page-wrap mt-24 sm:mt-28" data-sky-window>
          <div data-sd className="sd-moonrise surreal-arch dm-longshadow tone-lilac mx-auto max-w-[920px] px-7 pb-12 pt-24 text-center sm:px-14 sm:pt-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]">Invite to speak ✦</p>
            <h2 id="invite" className="mx-auto mt-4 max-w-2xl text-[clamp(1.6rem,4vw,2.6rem)] font-black uppercase leading-[1.04] tracking-tight">
              A session that helps people <span className="hand whitespace-nowrap text-[1.15em] font-normal lowercase">think better</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] font-medium leading-[1.75]">
              I&apos;m open to conferences, developer communities, and company sessions on blockchain architecture, AI ×
              Web3, custody infrastructure, and engineering leadership.
            </p>
            <ul className="mt-6 flex flex-wrap justify-center gap-2.5">
              {invitationSignals.map((item) => (
                <li key={item} className="ticket">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/work-with-me" data-magnetic className={cn(chipLink, 'magnetic tone-ink min-h-12 px-6 text-xs shadow-hard', pick(tilts, 0))}>
                Start the conversation →
              </Link>
              <Link href="/about" className={cn(chipLink, 'tone-panel min-h-12 px-6 text-xs', pick(tilts, 1))}>
                View profile
              </Link>
            </div>
          </div>
      </section>
      <MotionStage />
    </>
  )
}
