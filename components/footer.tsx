import Link from 'next/link'
import { Scrap } from '@/components/bazaar/scrap'
import { cn } from '@/lib/utils'
import type { CSSProperties } from 'react'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/resources', label: 'Resources' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/resume', label: 'Resume' },
  { href: '/work-with-me', label: 'Work with me' },
]

const elsewhere = [
  { href: 'https://linkedin.com/in/neelbanker', label: 'LinkedIn ↗' },
  { href: 'https://github.com/bankerneel', label: 'GitHub ↗' },
]

const ticker = ['Proof of work', 'Blockchain architecture', 'AI × Web3', 'Engineering leadership', 'Staying power']

// Where each finale shape flies in from (app/motion.css `sd-assemble`).
const from = (ax: string, ay: string, ar: string) => ({ '--ax': ax, '--ay': ay, '--ar': ar }) as CSSProperties

const tones = ['tone-sage', 'tone-butter', 'tone-sky', 'tone-rose', 'tone-lilac']
const tilts = ['-rotate-2', 'rotate-[1.5deg]', '-rotate-1', 'rotate-2', '-rotate-[1.5deg]', 'rotate-1']

const chip =
  'ticket min-h-10 cursor-pointer transition-[rotate,background-color,color] duration-200 hover:rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel'

export function Footer() {
  return (
    <footer className="relative mt-28 overflow-x-clip pb-16" data-sky-window>
      {/* second ticker, rolling the other way — the film's closing credits */}
      <div aria-hidden="true" className="relative z-10 rotate-[1deg]">
        <div className="tone-rose -mx-[3%] select-none overflow-hidden border-y-[3px] border-current py-2.5 shadow-hard">
          <div className="flex w-max animate-marquee whitespace-nowrap [animation-direction:reverse] [animation-duration:55s]">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((item, i) => (
              <span key={i} className="mx-5 text-[13px] font-black uppercase tracking-[0.1em]">
                {item} <span className="ml-5">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="page-wrap relative mt-28 sm:mt-20">
        <div className="relative">
          <p className="max-w-[16ch] text-[clamp(2rem,6.5vw,4.6rem)] font-black uppercase leading-[0.96] tracking-tighter sm:max-w-none">
            Building systems with{' '}
            <span data-sd className="sd-write hand inline-block whitespace-nowrap text-[1.12em] font-normal lowercase text-dm-accent-ink">
              staying power
            </span>
          </p>
          {/* the finale: the hero's arch, sun and zig card reassemble beside the last line */}
          <div aria-hidden="true" className="pointer-events-none absolute bottom-full right-0 mb-5 flex items-end gap-3 sm:bottom-1 sm:mb-0 lg:right-4 lg:gap-5">
            <div data-sd className="sd-assemble surreal-arch h-16 w-10 bg-dm-lilac shadow-hard sm:h-20 sm:w-12" style={from('-40vw', '30vh', '-40deg')} />
            <div data-sd className="sd-assemble finale-sun size-9 rounded-full bg-dm-butter shadow-hard sm:size-12" style={from('30vw', '-40vh', '0deg')} />
            <div data-sd className="sd-assemble tone-sky h-14 w-11 rotate-[6deg] border-2 border-current sm:h-16 sm:w-12" style={from('20vw', '50vh', '70deg')}>
              <div className="pat-zig h-full w-full opacity-30" />
            </div>
          </div>
        </div>

      <div className="mt-12 flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        <Scrap className="w-full max-w-[520px] -rotate-1" paperClassName="tone-panel px-7 py-9 sm:px-9">
          <p className="text-2xl font-black uppercase tracking-tighter">Neel Banker</p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-dm-ink-soft">
            Distributed systems &amp; blockchain architect · Ahmedabad, India
          </p>
          <p className="mt-5 text-[15px] font-medium leading-[1.75]">
            Architecture for blockchain, AI-native systems, and technical organizations that need calm technical
            direction when complexity is already high.
          </p>
          <p className="hand mt-4 text-[1.45rem] leading-none text-dm-accent-ink">pinned to the wall, slightly crooked</p>
        </Scrap>

        <nav aria-label="Footer" className="flex-1">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.22em]">Wander around</p>
          <ul className="flex flex-wrap gap-3">
            {navLinks.map(({ href, label }, i) => (
              <li key={href}>
                <Link href={href} className={cn(chip, tones[i % tones.length], tilts[i % tilts.length])}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mb-5 mt-10 text-[11px] font-bold uppercase tracking-[0.22em]">Elsewhere</p>
          <ul className="flex flex-wrap gap-3">
            {elsewhere.map(({ href, label }, i) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(chip, 'tone-panel', i ? 'rotate-1' : '-rotate-1')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mt-16 text-[11px] font-bold uppercase tracking-[0.18em] text-dm-ink-soft">
        © {new Date().getFullYear()} Neel Banker ✦ Proof of work
      </p>
      </div>
    </footer>
  )
}
