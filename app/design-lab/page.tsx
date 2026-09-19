import Link from 'next/link'
import { DIRECTIONS } from '@/app/design-lab/_content'

export default function DesignLabIndex() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-black sm:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-black/50">
          Design exploration · unlisted · not indexed
        </p>
        <h1 className="mb-6 text-5xl font-extrabold uppercase tracking-tighter sm:text-6xl">
          Design Lab
        </h1>
        <p className="mb-4 max-w-2xl text-lg leading-[1.7] text-black/65">
          Seventeen redesign directions for neelbanker.com, each built as a working page
          with the same real content — so they can be judged against each other rather
          than against a mood board.
        </p>
        <p className="mb-14 max-w-2xl text-[15px] leading-[1.7] text-black/45">
          None of these affect the live site. Directions O–Q carry a working light/dark
          toggle.
        </p>

        <div className="grid gap-px bg-black/15 sm:grid-cols-2 lg:grid-cols-3">
          {DIRECTIONS.map((d) => (
            <Link
              key={d.slug}
              href={`/design-lab/${d.slug}`}
              className="group relative block cursor-pointer bg-white p-7 transition-colors duration-200 hover:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <div className="mb-3 flex items-center gap-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
                  Direction {d.tag}
                </p>
                {d.selected && (
                  <span className="bg-black px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white">
                    Selected
                  </span>
                )}
              </div>
              <h2 className="mb-3 text-xl font-bold uppercase tracking-tight">{d.title}</h2>
              <p className="text-[14px] leading-[1.65] text-black/55">{d.note}</p>
              <span className="mt-5 inline-block font-mono text-[11px] uppercase tracking-widest">
                View →
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.18em] text-black/35">
          ← Back to{' '}
          <Link href="/" className="cursor-pointer underline hover:text-black">
            neelbanker.com
          </Link>
        </p>
      </div>
    </main>
  )
}
