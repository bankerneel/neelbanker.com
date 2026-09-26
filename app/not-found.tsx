import type { Metadata } from 'next'
import Link from 'next/link'
import { Scrap } from '@/components/bazaar/scrap'
import { chipLink, pick, tilts, tones } from '@/components/bazaar/styles'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Page not found',
}

const destinations = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/work-with-me', label: 'Work with me' },
]

export default function NotFound() {
  return (
    <section className="page-wrap relative pb-10 pt-12 sm:pt-16">
      <div
        aria-hidden="true"
        className="surreal-arch dm-longshadow pointer-events-none absolute right-[6%] top-6 hidden h-72 w-44 bg-dm-lilac lg:block"
      />

      <p className="hand relative z-10 -rotate-2 text-[1.9rem] leading-none text-dm-accent-ink sm:text-[2.3rem]">
        this page wandered off ✦
      </p>
      <h1 className="relative z-10 mt-2 text-[clamp(5rem,22vw,15rem)] font-black leading-[0.82] tracking-[-0.05em]">
        4<span className="max-outline">0</span>4
      </h1>

      <div className="relative z-10 mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
        <Scrap className="w-full max-w-[520px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
          <p className="text-[1.15rem] font-bold uppercase leading-[1.2] tracking-tight">
            Nothing is pinned at this address.
          </p>
          <p className="mt-3 text-[15px] leading-[1.7] text-dm-ink-soft">
            The link may be old, or the page may have moved during the redesign. Try one of these instead.
          </p>
        </Scrap>
        <nav aria-label="Suggested pages" className="lg:mt-10">
          <ul className="flex flex-wrap gap-3">
            {destinations.map((d, i) => (
              <li key={d.href}>
                <Link href={d.href} className={cn(chipLink, 'min-h-11 px-5', i === 0 ? 'tone-ink shadow-hard' : pick(tones, i - 1), pick(tilts, i))}>
                  {d.label} {i === 0 ? '←' : '→'}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
