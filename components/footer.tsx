import Link from 'next/link'
import { Scrap } from '@/components/bazaar/scrap'
import { cn } from '@/lib/utils'

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

const tones = ['tone-sage', 'tone-butter', 'tone-sky', 'tone-rose', 'tone-lilac']
const tilts = ['-rotate-2', 'rotate-[1.5deg]', '-rotate-1', 'rotate-2', '-rotate-[1.5deg]', 'rotate-1']

const chip =
  'ticket min-h-10 cursor-pointer transition-[rotate,background-color,color] duration-200 hover:rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel'

export function Footer() {
  return (
    <footer className="page-wrap relative mt-28 pb-16">
      <p className="text-[clamp(2rem,6.5vw,4.6rem)] font-black uppercase leading-[0.96] tracking-tighter">
        Building systems with{' '}
        <span className="hand whitespace-nowrap text-[1.12em] font-normal lowercase text-dm-accent-ink">staying power</span>
      </p>

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
    </footer>
  )
}
