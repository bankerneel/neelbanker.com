import { ARTICLES, IDENTITY, NAV, PROJECT, PROJECTS, STATS } from '@/app/design-lab/_content'

const INK = '#2f2a24'
const PALETTE = ['#e0603f', '#2f7d6b', '#e8a838', '#4a5fc1']

export default function CutPaperPrototype() {
  return (
    <div
      className="relative min-h-screen overflow-hidden bg-[#f2e8d5] font-[family-name:var(--font-archivo)]"
      style={{ color: INK }}
    >
      {/* flat cut shapes — no gradients, hard shadows only */}
      <div
        aria-hidden="true"
        className="cut-shadow surreal-arch pointer-events-none absolute right-[6%] top-[12%] hidden h-72 w-44 bg-[#e0603f] lg:block"
      />
      <div
        aria-hidden="true"
        className="cut-shadow pointer-events-none absolute left-[-4%] top-[52%] hidden h-52 w-52 rounded-full bg-[#2f7d6b] lg:block"
      />
      <div
        aria-hidden="true"
        className="cut-shadow-sm pointer-events-none absolute right-[27%] top-[5%] hidden h-24 w-24 rotate-[16deg] bg-[#e8a838] lg:block"
      />

      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 sm:px-10">
        <span className="text-xl font-black tracking-tight">{IDENTITY.name}</span>
        <div className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <span key={n} className="text-[13px] font-bold opacity-70">
              {n}
            </span>
          ))}
          <span className="cut-shadow-sm bg-[#e0603f] px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-[#f2e8d5]">
            Work with me
          </span>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-10 sm:px-10">
        <p className="mb-7 text-[11px] font-bold uppercase tracking-[0.3em] opacity-55">
          {IDENTITY.role} · {IDENTITY.location}
        </p>

        <h1 className="text-[clamp(2.8rem,11vw,9.5rem)] font-black leading-[0.85] tracking-[-0.05em]">
          Building
          <br />
          <span className="text-[#e0603f]">what&apos;s</span> next.
        </h1>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div className="cut-shadow bg-[#fffaf0] px-8 py-9">
            <p className="text-[16px] leading-[1.75] opacity-80">{IDENTITY.standfirstLong}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span
                className="cut-shadow-sm px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-[#f2e8d5]"
                style={{ background: INK }}
              >
                Book a call
              </span>
              <span className="border-2 px-6 py-3 text-[13px] font-bold uppercase tracking-wide" style={{ borderColor: INK }}>
                Read the writing
              </span>
            </div>
          </div>

          {/* stat chips as cut shapes */}
          <div className="grid gap-4">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className="cut-shadow-sm flex items-center justify-between px-6 py-5"
                style={{ background: PALETTE[i], color: '#f7f0e2' }}
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] opacity-85">
                  {s.l}
                </span>
                <span className="text-[2.4rem] font-black leading-none">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Writing — flat panels ───────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <h2 className="mb-12 text-[clamp(1.9rem,5vw,3.4rem)] font-black tracking-[-0.03em]">
          Writing
        </h2>

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <article key={a.n} className="cut-shadow bg-[#fffaf0] p-7">
              <span
                className="mb-5 inline-block h-3 w-16"
                style={{ background: PALETTE[i] }}
                aria-hidden="true"
              />
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] opacity-50">
                {a.pillar} · {a.date}
              </p>
              <h3 className="mb-3 text-[1.2rem] font-bold leading-snug tracking-tight">
                {a.title}
              </h3>
              <p className="text-[13px] leading-[1.7] opacity-70">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Work — arch panel ───────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div
            className="surreal-arch cut-shadow mx-auto h-[300px] w-full max-w-[260px]"
            style={{ background: '#2f7d6b' }}
            aria-hidden="true"
          />
          <div>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.26em] opacity-55">
              Selected work
            </p>
            <h3 className="mb-5 text-[clamp(1.6rem,4vw,2.8rem)] font-black leading-[1.08] tracking-[-0.03em]">
              {PROJECT.title}
            </h3>
            <p className="max-w-xl text-[15px] leading-[1.8] opacity-75">{PROJECT.excerpt}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {PROJECTS.map((p, i) => (
                <span
                  key={p.title}
                  className="px-4 py-2 text-[12px] font-bold"
                  style={{ background: PALETTE[i], color: '#f7f0e2' }}
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t-4 px-6 sm:px-10" style={{ borderColor: INK }}>
        <div className="mx-auto max-w-6xl py-16">
          <p className="text-[clamp(1.8rem,6vw,4.4rem)] font-black leading-[1.02] tracking-[-0.04em]">
            Building systems with <span className="text-[#e0603f]">staying power</span>.
          </p>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.24em] opacity-45">
            © 2026 Neel Banker · Direction K · Cut-Paper Diorama
          </p>
        </div>
      </footer>
    </div>
  )
}
