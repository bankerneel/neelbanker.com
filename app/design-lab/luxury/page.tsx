import { ARTICLES, IDENTITY, NAV, PROJECT, STATS } from '@/app/design-lab/_content'

const GOLD = '#a8874f'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-black/40">{children}</p>
  )
}

export default function LuxuryPrototype() {
  return (
    <div className="min-h-screen bg-[#f7f5f2] font-[family-name:var(--font-archivo)] text-[#1c1a17]">
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="border-b border-black/[0.08]">
        <nav className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-8">
          <span className="font-[family-name:var(--font-playfair)] text-[19px] tracking-[0.22em] uppercase">
            Neel Banker
          </span>
          <div className="hidden items-center gap-12 md:flex">
            {NAV.map((n) => (
              <span
                key={n}
                className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/45"
              >
                {n}
              </span>
            ))}
          </div>
        </nav>
      </header>

      {/* ── Hero — vast whitespace, centred ─────────────── */}
      <section className="mx-auto max-w-[1180px] px-8 pb-28 pt-28 text-center sm:pt-40">
        <Label>{IDENTITY.location}</Label>
        <h1 className="mx-auto mt-10 max-w-4xl font-[family-name:var(--font-playfair)] text-[clamp(2.8rem,7vw,6.5rem)] font-normal leading-[1.08] tracking-[-0.015em]">
          Building <em style={{ color: GOLD }}>what&apos;s</em> next.
        </h1>
        <div className="mx-auto mt-14 h-px w-16" style={{ background: GOLD }} />
        <p className="mx-auto mt-14 max-w-xl text-[16px] font-light leading-[2] text-black/60">
          {IDENTITY.standfirst}
        </p>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10">
          <span
            className="border-b pb-1.5 font-mono text-[10px] uppercase tracking-[0.34em]"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Enquire
          </span>
          <span className="border-b border-black/20 pb-1.5 font-mono text-[10px] uppercase tracking-[0.34em] text-black/55">
            The Writing
          </span>
        </div>
      </section>

      {/* ── Numbers — sparse, hairlines ─────────────────── */}
      <section className="border-y border-black/[0.08]">
        <div className="mx-auto grid max-w-[1180px] divide-y divide-black/[0.08] px-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {STATS.map((s) => (
            <div key={s.l} className="py-16 text-center">
              <p
                className="font-[family-name:var(--font-playfair)] text-[3.4rem] font-normal leading-none"
                style={{ color: GOLD }}
              >
                {s.v}
              </p>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.32em] text-black/40">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Writing — generous, restrained ──────────────── */}
      <section className="mx-auto max-w-[1180px] px-8 py-28">
        <div className="mb-20 text-center">
          <Label>Journal</Label>
          <h2 className="mt-6 font-[family-name:var(--font-playfair)] text-[clamp(1.9rem,3.6vw,3rem)] font-normal">
            Selected writing
          </h2>
        </div>

        <div className="mx-auto max-w-3xl">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className={`py-14 text-center ${i !== 0 ? 'border-t border-black/[0.08]' : ''}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-black/35">
                {a.pillar} · {a.date}
              </p>
              <h3 className="mx-auto mt-6 max-w-2xl font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,3vw,2.3rem)] font-normal leading-[1.25]">
                {a.title}
              </h3>
              <p className="mx-auto mt-6 max-w-xl text-[15px] font-light leading-[1.95] text-black/55">
                {a.excerpt}
              </p>
              <span
                className="mt-8 inline-block border-b pb-1 font-mono text-[10px] uppercase tracking-[0.3em]"
                style={{ borderColor: GOLD, color: GOLD }}
              >
                Read
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────── */}
      <section className="border-t border-black/[0.08]">
        <div className="mx-auto max-w-[1180px] px-8 py-28 text-center">
          <Label>Selected Work</Label>
          <h3 className="mx-auto mt-8 max-w-3xl font-[family-name:var(--font-playfair)] text-[clamp(1.8rem,4vw,3.2rem)] font-normal leading-[1.2]">
            {PROJECT.title}
          </h3>
          <p className="mx-auto mt-8 max-w-2xl text-[15px] font-light leading-[2] text-black/55">
            {PROJECT.excerpt}
          </p>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-10 sm:grid-cols-4">
            {PROJECT.meta.map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-black/35">{k}</p>
                <p className="mt-3 font-[family-name:var(--font-playfair)] text-[17px]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-black/[0.08]">
        <div className="mx-auto max-w-[1180px] px-8 py-24 text-center">
          <p className="font-[family-name:var(--font-playfair)] text-[clamp(1.6rem,4vw,3rem)] font-normal leading-[1.3]">
            Building systems with <em style={{ color: GOLD }}>staying power</em>.
          </p>
          <p className="mt-16 font-mono text-[9px] uppercase tracking-[0.34em] text-black/35">
            © 2026 Neel Banker · Direction F · Luxury Typography
          </p>
        </div>
      </footer>
    </div>
  )
}
