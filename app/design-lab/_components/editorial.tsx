import { ARTICLES, IDENTITY, NAV, PROJECT, SPECIMEN } from '@/app/design-lab/_content'

function RuleLabel({ section, title }: { section: string; title: string }) {
  return (
    <div className="rule-label mb-10">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
        <span className="text-[color:var(--accent)]">§{section}</span>
        <span className="ml-3">{title}</span>
      </span>
    </div>
  )
}

/**
 * Shared Maximalist Editorial layout. The palette comes entirely from CSS
 * custom properties, so light / dark / duotone are the same component with a
 * different variant class.
 */
export function Editorial({ variant, label }: { variant: string; label: string }) {
  return (
    <div className={`lab-editorial ${variant}`}>
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="border-b border-[color:var(--rule)]">
        <nav className="mx-auto flex max-w-[1400px] items-baseline justify-between px-6 py-5 sm:px-10">
          <span className="serif text-2xl">{IDENTITY.name}</span>
          <div className="hidden items-baseline gap-8 md:flex">
            {NAV.map((n) => (
              <span
                key={n}
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]"
              >
                {n}
              </span>
            ))}
            <span className="border-b-2 border-[color:var(--accent)] pb-0.5 font-mono text-[11px] uppercase tracking-[0.2em]">
              Work With Me
            </span>
          </div>
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="border-b border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-16 sm:px-10 sm:pt-24">
          <div className="mb-10 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--accent)]">
              §00 — Index
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {IDENTITY.role}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-[color:var(--muted)]">
              {IDENTITY.location}
            </span>
          </div>

          <h1 className="serif display mb-12" style={{ fontSize: 'clamp(3.5rem, 15vw, 16rem)' }}>
            Building
            <br />
            <em className="text-[color:var(--accent)]">what&apos;s</em> next.
          </h1>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <p className="serif max-w-2xl text-[clamp(1.25rem,2.1vw,1.75rem)] leading-[1.45]">
              {IDENTITY.standfirst}
            </p>
            <aside className="border-l border-[color:var(--rule)] pl-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                Currently
              </p>
              <p className="mt-2 text-[13px] leading-[1.6] text-[color:var(--muted)]">
                {IDENTITY.currently}
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Writing index ───────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
        <RuleLabel section="01" title="Writing" />

        {ARTICLES.map((a) => (
          <article
            key={a.n}
            className="grid gap-x-10 gap-y-4 border-b border-[color:var(--rule)] py-10 lg:grid-cols-[80px_minmax(0,1fr)_240px]"
          >
            <span className="serif text-3xl text-[color:var(--accent)]">{a.roman}</span>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1">
                {[a.pillar, a.dateShort, a.read].map((m) => (
                  <span
                    key={m}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <h2 className="serif mb-4 text-[clamp(1.9rem,4vw,3.4rem)] leading-[1.02]">
                {a.title}
              </h2>
              <p className="max-w-2xl text-[15px] leading-[1.75] text-[color:var(--muted)]">
                {a.excerpt}
              </p>
            </div>

            <aside className="hidden border-l border-[color:var(--rule)] pl-5 lg:block">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                Note
              </p>
              <p className="mt-2 text-[12px] leading-[1.6] text-[color:var(--muted)]">{a.note}</p>
            </aside>
          </article>
        ))}
      </section>

      {/* ── Reading specimen ────────────────────────────── */}
      <section className="border-y border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
          <RuleLabel section="02" title="Reading Specimen" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="max-w-[68ch]">
              <h2 className="serif mb-8 text-[clamp(2.2rem,5vw,4.2rem)] leading-[0.98]">
                {SPECIMEN.title}
              </h2>

              <div className="lab-dropcap lab-justify space-y-5 text-[17px] leading-[1.75]">
                {SPECIMEN.paras.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>

              <blockquote className="serif my-10 border-l-2 border-[color:var(--accent)] pl-7 text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.25]">
                {SPECIMEN.pullquote}
              </blockquote>

              <div className="lab-justify space-y-5 text-[17px] leading-[1.75]">
                <p>{SPECIMEN.closing}</p>
              </div>
            </div>

            <aside className="space-y-8 lg:border-l lg:border-[color:var(--rule)] lg:pl-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--accent)]">
                  Marginalia
                </p>
                <p className="mt-2 text-[12px] leading-[1.65] text-[color:var(--muted)]">
                  The gutter carries context without interrupting the column — references,
                  caveats, and definitions live here.
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Filed under
                </p>
                <p className="serif mt-2 text-xl">Engineering Leadership</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  Folio
                </p>
                <p className="serif mt-2 text-xl">02 / 14</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Selected work ───────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
        <RuleLabel section="03" title="Selected Work" />

        <div className="grid gap-x-10 gap-y-6 border-b border-[color:var(--rule)] pb-12 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h3 className="serif mb-5 text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.0]">
              {PROJECT.title}
            </h3>
            <p className="max-w-2xl text-[16px] leading-[1.75] text-[color:var(--muted)]">
              {PROJECT.excerpt}
            </p>
          </div>
          <aside className="grid grid-cols-2 gap-y-5 border-l border-[color:var(--rule)] pl-6 lg:grid-cols-1">
            {PROJECT.meta.map(([k, v]) => (
              <div key={k}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted)]">
                  {k}
                </p>
                <p className="serif mt-1 text-lg">{v}</p>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t border-[color:var(--rule)]">
        <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-10">
          <p className="serif leading-[0.9]" style={{ fontSize: 'clamp(2.5rem, 9vw, 8rem)' }}>
            Building systems with{' '}
            <em className="text-[color:var(--accent)]">staying power</em>.
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--rule)] pt-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              © 2026 {IDENTITY.name} — Proof of Work
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--muted)]">
              {label}
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
