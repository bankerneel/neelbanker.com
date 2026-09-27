import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import { Scrap } from '@/components/bazaar/scrap'
import { chipLink } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'

const stats = [
  { value: '7+', label: 'years building', tone: 'tone-terra', tilt: '-rotate-6' },
  { value: '50+', label: 'engineers led', tone: 'tone-rose', tilt: 'rotate-[5deg]' },
  { value: '15+', label: 'production platforms', tone: 'tone-sage', tilt: '-rotate-3' },
]

const techStack = [
  'Hyperledger Fabric', 'OP Stack / L2', 'Solidity', 'ERC-4337', 'Fireblocks NCW', 'BitGo', 'Node.js', 'NestJS',
  'Go', 'Python', 'Claude API', 'Ethereum', 'Polygon', 'Solana', 'Base', 'Arbitrum', 'Account Abstraction',
  'Docker', 'AWS EKS', 'HSM',
]

// Depth for pointer parallax (--depth) and scroll pull-back (--px).
const depth = (px: string, d: string) => ({ '--px': px, '--depth': d }) as CSSProperties

/**
 * The homepage "wall" — the approved Dream Bazaar prototype
 * (app/design-lab/dream-bazaar) on real content. Static server component.
 * The opening hook is CSS only (app/motion.css): paper strips rip off the
 * headline, shapes rise/drop/swing in, the polaroids are dealt. The hero
 * paragraph is the LCP element, so it only ever moves, never fades.
 */
export function HomeHero() {
  return (
    <>
      <section className="hero-stage page-wrap relative pt-8 sm:pt-12" aria-labelledby="hero-title" data-hero data-ambient data-sky-window>
        {/* dream furniture — decorative only */}
        <div
          aria-hidden="true"
          className="px-layer px-scroll pointer-events-none absolute right-[5%] top-[6%] hidden lg:block"
          style={depth('-160px', '18px')}
        >
          <div className="hook-rise amb-float surreal-arch dm-longshadow h-80 w-48 bg-dm-lilac" />
        </div>
        <div
          aria-hidden="true"
          className="px-layer px-scroll pointer-events-none absolute right-[24%] top-[44%] hidden xl:block"
          style={depth('-300px', '34px')}
        >
          <div className="hook-drop amb-drift dm-longshadow size-32 rounded-full bg-dm-butter" />
        </div>

        <p className="hook-pop ticket tone-panel relative z-20 -rotate-1">
          Distributed systems &amp; blockchain architect · Ahmedabad, India
        </p>

        <h1
          id="hero-title"
          className="px-head relative z-20 mt-6 text-[clamp(2.8rem,16vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]"
        >
          <span className="hook-line block">
            Building
            <span aria-hidden="true" className="hook-strip torn tone-terra" />
          </span>
          <span className="hook-line hand block text-[1.2em] font-normal lowercase leading-[0.85] text-dm-accent-ink">
            <span className="hook-write">what&apos;s</span>
            <span aria-hidden="true" className="hook-strip torn tone-rose" />
          </span>
          <span className="hook-line block">
            <span className="hook-flood max-outline inline-block">Next.</span>
            <span aria-hidden="true" className="hook-strip torn tone-sky" />
          </span>
        </h1>

        {/* scattered, overlapping scraps */}
        <div className="relative mt-10 flex flex-col items-start gap-10 lg:flex-row lg:justify-center">
          <Scrap className="hook-settle relative z-30 w-full max-w-[480px] -rotate-[1.6deg] lg:-mr-10" paperClassName="tone-panel px-7 py-8 sm:px-8">
            <p className="text-[16px] font-medium leading-[1.7]">
              Seven years building blockchain infrastructure, custody systems, and AI-augmented engineering workflows
              for teams shipping under real delivery pressure. Writing weekly about architecture, execution, and what
              holds up in production.
            </p>
            <p className="hand mt-3 text-[1.5rem] leading-none text-dm-accent-ink">pinned to the wall, slightly crooked</p>
          </Scrap>

          <div
            aria-hidden="true"
            className="px-layer relative z-10 hidden lg:-ml-6 lg:mt-14 lg:block"
            style={depth('0px', '10px')}
          >
            <div className="hook-swing amb-sway tone-sky h-[190px] w-[150px] rotate-[4deg] border-[3px] border-current shadow-[7px_7px_0_var(--dm-shadow)]">
              <div className="pat-zig h-full w-full opacity-30" />
            </div>
          </div>

          <ul aria-label="At a glance" className="hook-deal flex items-start pl-1">
            {stats.map((s, i) => (
              <li
                key={s.label}
                className={cn(
                  'relative w-[96px] bg-dm-panel p-2.5 pb-3.5 shadow-[9px_9px_0_var(--dm-shadow)] min-[360px]:w-[108px] sm:w-[160px] sm:p-3 sm:pb-5',
                  s.tilt,
                  i > 0 && '-ml-3 sm:-ml-6',
                )}
                style={{ zIndex: 20 - i, marginTop: `${i * 22}px` }}
              >
                <div className={cn('flex h-[78px] items-center justify-center sm:h-[104px]', s.tone)}>
                  <span
                    aria-hidden="true"
                    className="count text-[2rem] font-black leading-none sm:text-[2.5rem]"
                    style={{ '--to': parseInt(s.value, 10) } as CSSProperties}
                  />
                  <span className="sr-only">{s.value}</span>
                </div>
                <p className="hand mt-2 text-center text-[1rem] leading-tight text-dm-ink sm:text-[1.1rem]">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* subscribe + next steps — a straight strip, since it holds a form */}
        <div className="hook-settle-late tone-panel relative z-20 mt-14 flex flex-col gap-5 border-2 border-current p-5 shadow-hard-lg sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-[260px]">
            <p className="text-[1.05rem] font-black uppercase leading-tight tracking-tight">The Architect&apos;s Brief</p>
            <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-dm-ink-soft">Free · weekly · no spam</p>
          </div>
          <div className="w-full lg:max-w-[460px]">
            <NewsletterForm compact />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/work-with-me" data-magnetic className={cn(chipLink, 'magnetic tone-terra min-h-11 px-5 shadow-hard -rotate-1')}>
              Book a call →
            </Link>
            <Link href="/about" className={cn(chipLink, 'tone-panel min-h-11 px-5 rotate-1')}>
              About Neel →
            </Link>
          </div>
        </div>
      </section>

      {/* ticker tape — the marquee separator, as a strip of butter tape */}
      <div className="relative z-10 mt-20 -rotate-[1.2deg]">
        <p className="sr-only">Stack in production: {techStack.join(', ')}.</p>
        <div
          aria-hidden="true"
          className="tone-butter -mx-[3%] select-none overflow-hidden border-y-[3px] border-current py-3 shadow-hard"
        >
          <div className="flex w-max animate-marquee whitespace-nowrap">
            {[...techStack, ...techStack].map((item, i) => (
              <span key={i} className="mx-5 text-sm font-black uppercase tracking-[0.08em]">
                {item} <span className="ml-5">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
