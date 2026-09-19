import { ARTICLES, IDENTITY, NAV, PROJECT, STATS } from '@/app/design-lab/_content'

const DEEP = '#241d3f'

export default function SurrealismPrototype() {
  return (
    <div
      className="surreal-sky relative min-h-screen overflow-hidden font-[family-name:var(--font-archivo)]"
      style={{ color: DEEP }}
    >
      {/* floating objects */}
      <div
        aria-hidden="true"
        className="long-shadow pointer-events-none absolute left-[6%] top-[18%] hidden h-40 w-40 rounded-full bg-[#ff9d6e] lg:block"
      />
      <div
        aria-hidden="true"
        className="surreal-arch long-shadow pointer-events-none absolute right-[9%] top-[26%] hidden h-56 w-36 bg-[#8a7cf0] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[24%] top-[8%] hidden h-24 w-24 rotate-[18deg] bg-[#ffe27a] lg:block long-shadow"
      />

      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-7 sm:px-10">
        <span className="text-lg font-bold tracking-tight">{IDENTITY.name}</span>
        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <span key={n} className="text-[13px] font-medium opacity-65">
              {n}
            </span>
          ))}
          <span className="rounded-full bg-white/70 px-5 py-2 text-[13px] font-semibold backdrop-blur-sm">
            Work with me
          </span>
        </div>
      </header>

      {/* ── Hero — impossible scale ─────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-16 sm:px-10 sm:pt-24">
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em] opacity-55">
          {IDENTITY.role}
        </p>

        <h1 className="text-[clamp(3rem,13vw,12rem)] font-black leading-[0.82] tracking-[-0.05em]">
          Building
          <br />
          <span className="italic font-[family-name:var(--font-instrument)] font-normal tracking-[-0.02em]">
            what&apos;s
          </span>{' '}
          next.
        </h1>

        {/* a door where a paragraph should be */}
        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[1fr_260px]">
          <p className="max-w-xl text-[17px] leading-[1.75] opacity-75">
            {IDENTITY.standfirstLong}
          </p>
          <div className="surreal-arch long-shadow bg-white/75 p-6 pt-10 backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] opacity-50">
              Currently
            </p>
            <p className="mt-3 text-[13px] leading-[1.65] opacity-75">{IDENTITY.currently}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <span
            className="rounded-full px-7 py-3.5 text-[14px] font-semibold text-white"
            style={{ background: DEEP }}
          >
            Book a call
          </span>
          <span className="rounded-full border border-current/25 bg-white/50 px-7 py-3.5 text-[14px] font-semibold backdrop-blur-sm">
            Read the writing
          </span>
        </div>
      </section>

      {/* ── Stats — floating orbs ───────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className="long-shadow flex aspect-square flex-col items-center justify-center rounded-full bg-white/70 backdrop-blur-sm"
              style={{ transform: `translateY(${[0, 34, 12][i]}px)` }}
            >
              <span className="text-[3.4rem] font-black leading-none tracking-tight">{s.v}</span>
              <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] opacity-55">
                {s.l}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Writing — stacked planes ────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <h2 className="mb-12 text-[clamp(1.8rem,5vw,3.4rem)] font-black tracking-[-0.03em]">
          Writing
        </h2>

        <div className="space-y-6">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="long-shadow rounded-[2rem] bg-white/75 p-7 backdrop-blur-sm sm:p-9"
              style={{ marginLeft: `${i * 46}px` }}
            >
              <div className="mb-3 flex flex-wrap gap-x-5 text-[11px] font-semibold uppercase tracking-[0.16em] opacity-50">
                <span>{a.pillar}</span>
                <span>{a.date}</span>
                <span>{a.read}</span>
              </div>
              <h3 className="mb-3 max-w-3xl text-[clamp(1.3rem,3vw,2.1rem)] font-bold leading-[1.15] tracking-tight">
                {a.title}
              </h3>
              <p className="max-w-2xl text-[14px] leading-[1.75] opacity-70">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Project ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 sm:px-10">
        <div className="long-shadow rounded-[2.5rem] p-8 text-white sm:p-12" style={{ background: DEEP }}>
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] opacity-55">
            Selected work
          </p>
          <h3 className="mb-6 max-w-3xl text-[clamp(1.6rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight">
            {PROJECT.title}
          </h3>
          <p className="max-w-2xl text-[15px] leading-[1.8] opacity-75">{PROJECT.excerpt}</p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PROJECT.meta.map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-50">
                  {k}
                </p>
                <p className="mt-2 text-[16px] font-semibold">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <p className="text-[clamp(1.8rem,6vw,4.4rem)] font-black leading-[1.02] tracking-[-0.04em]">
          Building systems with{' '}
          <span className="italic font-[family-name:var(--font-instrument)] font-normal">
            staying power
          </span>
          .
        </p>
        <p className="mt-12 text-[10px] font-semibold uppercase tracking-[0.24em] opacity-45">
          © 2026 Neel Banker · Direction I · Surrealism
        </p>
      </footer>
    </div>
  )
}
