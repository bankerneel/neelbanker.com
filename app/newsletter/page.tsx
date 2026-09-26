import type { Metadata } from 'next'
import { NewsletterForm } from '@/components/newsletter-form'
import { FadeUp } from '@/components/scroll-reveal'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'
import { pick, tilts } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: "The Architect's Brief",
  description: 'Weekly newsletter on Blockchain Architecture, AI × Web3, and Engineering Leadership.',
}

const highlights = [
  {
    label: 'Blockchain Architecture',
    tone: 'tone-sage',
    detail: 'ERC-4337, custody infrastructure, DeFi patterns, and real deployment decisions.',
  },
  {
    label: 'AI × Web3',
    tone: 'tone-sky',
    detail: 'On-chain agents, LLM tooling, and practical workflow notes from production-facing builds.',
  },
  {
    label: 'Engineering Leadership',
    tone: 'tone-rose',
    detail: 'Scaling teams, architecture decisions, and what senior technical judgment looks like in practice.',
  },
]

const signals = ['One strong idea each week', 'No filler or growth-hack cadence', 'Built for builders and technical leaders']

const sectionTitle = 'text-[clamp(2rem,5vw,3.4rem)] font-black uppercase leading-none tracking-tighter'
const handWord = 'hand text-[1.15em] font-normal lowercase text-dm-accent-ink'

export default function NewsletterPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { href: '/', label: '← Home' },
          { href: '/writing', label: 'Writing' },
        ]}
        kicker="Free · weekly ✦"
        title={
          <>
            The Architect&apos;s <span className="max-outline">Brief</span>
          </>
        }
      >
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[540px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              One architectural insight per week. Rotating across blockchain, AI × Web3, and engineering leadership. No
              fluff, no filler, and no trend-chasing for its own sake.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">short, opinionated, grounded in delivery</p>
          </Scrap>
          <ul className="flex flex-wrap gap-3 lg:-ml-4 lg:mt-12 lg:max-w-[320px] lg:flex-col lg:items-start">
            {signals.map((item, i) => (
              <li key={item} className={cn('ticket shadow-hard', ['tone-butter', 'tone-lilac', 'tone-sage'][i], pick(tilts, i))}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </PageIntro>

      {/* ── Subscribe portal ──────────────────────────────────────────── */}
      <section aria-labelledby="join" className="page-wrap mt-24">
        <div className="surreal-arch dm-longshadow tone-lilac mx-auto max-w-[880px] px-6 pb-12 pt-24 text-center sm:px-14 sm:pt-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em]">Subscribe ✦</p>
          <h2 id="join" className="mt-4 text-[clamp(1.9rem,4.6vw,3rem)] font-black uppercase leading-[1.02] tracking-tight">
            Join the <span className="hand whitespace-nowrap text-[1.15em] font-normal lowercase">list</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-medium leading-[1.7]">
            Weekly delivery. Clear unsubscribe. No spam. The note lands in your inbox when there is something worth
            sending.
          </p>
          <div className="mx-auto mt-8 max-w-lg text-left">
            <NewsletterForm compact />
          </div>
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.18em]">Unsubscribe anytime. No spam, ever.</p>
        </div>
      </section>

      {/* ── What you get ──────────────────────────────────────────────── */}
      <section aria-labelledby="what-you-get" className="page-wrap mt-24 sm:mt-28">
        <FadeUp>
          <h2 id="what-you-get" className={sectionTitle}>
            What you <span className={handWord}>get</span>
          </h2>
          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            {highlights.map((h, i) => (
              <Scrap
                key={h.label}
                className={cn(
                  'relative w-full lg:flex-1',
                  ['-rotate-[1.4deg]', 'rotate-[1.2deg] lg:-ml-6 lg:mt-10', '-rotate-[0.8deg] lg:-ml-6 lg:mt-3'][i],
                )}
                paperClassName={cn(h.tone, 'px-7 py-9')}
              >
                <span className="ticket">Pillar {i + 1}</span>
                <h3 className="mt-5 text-[1.3rem] font-black uppercase leading-[1.1] tracking-tight">{h.label}</h3>
                <p className="mt-3 text-[15px] font-medium leading-[1.7]">{h.detail}</p>
              </Scrap>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ── Fit ───────────────────────────────────────────────────────── */}
      <section aria-labelledby="fit" className="page-wrap mt-24 sm:mt-28">
        <div className="tone-panel mx-auto max-w-3xl -rotate-[0.6deg] border-2 border-dashed border-current px-7 py-9 sm:px-10">
          <h2 id="fit" className="hand text-[2rem] leading-none text-dm-accent-ink">Good fit if…</h2>
          <p className="mt-4 text-[1.05rem] leading-[1.75]">
            You build or lead technical systems, care about architecture quality, and prefer signal over content volume.
            If you only want news summaries, this is probably not for you.
          </p>
        </div>
      </section>
    </>
  )
}
