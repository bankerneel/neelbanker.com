import type { Metadata } from 'next'
import Link from 'next/link'
import { Archivo, Caveat, Instrument_Serif, Playfair_Display } from 'next/font/google'
import { DIRECTIONS } from '@/app/design-lab/_content'
import './lab.css'

const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
})

const instrument = Instrument_Serif({
  variable: '--font-instrument',
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '600'],
})

export const metadata: Metadata = {
  title: 'Design Lab',
  description: 'Internal redesign prototypes — not part of the live site.',
  robots: { index: false, follow: false },
}

export default function DesignLabLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      data-design-lab
      className={`${archivo.variable} ${instrument.variable} ${playfair.variable} ${caveat.variable}`}
    >
      {children}
      <LabSwitcher />
    </div>
  )
}

function LabSwitcher() {
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[70] w-full -translate-x-1/2 px-4">
      <div className="pointer-events-auto mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-0.5 rounded-full border border-black/15 bg-white/90 p-1 shadow-xl backdrop-blur-md">
        <Link
          href="/design-lab"
          className="cursor-pointer rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/45 transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          Lab
        </Link>
        {DIRECTIONS.map((d) => (
          <Link
            key={d.slug}
            href={`/design-lab/${d.slug}`}
            title={d.title}
            className="cursor-pointer rounded-full px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-black/70 transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
          >
            {d.tag}
          </Link>
        ))}
        <Link
          href="/"
          className="cursor-pointer rounded-full px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/40 transition-colors duration-200 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
        >
          Live ↗
        </Link>
      </div>
    </div>
  )
}
