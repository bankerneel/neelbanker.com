import { ARTICLES, IDENTITY, NAV, PROJECT, STACK, STATS } from '@/app/design-lab/_content'

const CYAN = '#22d3ee'

export default function CybercorePrototype() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070a] font-mono text-[#c8f5ff]">
      {/* background layers */}
      <div aria-hidden="true" className="cyber-grid pointer-events-none absolute inset-0 opacity-60" />
      <div aria-hidden="true" className="cyber-scan pointer-events-none absolute inset-0 z-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-40"
        style={{
          background:
            'radial-gradient(60% 100% at 50% 0%, rgba(34,211,238,0.28) 0%, transparent 70%)',
        }}
      />

      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="relative z-10 border-b border-cyan-400/20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
          <span className="text-sm font-bold uppercase tracking-[0.2em]" style={{ color: CYAN }}>
            [ NEEL_BANKER ]
          </span>
          <div className="hidden items-center gap-6 md:flex">
            {NAV.map((n) => (
              <span key={n} className="text-[11px] uppercase tracking-[0.18em] text-cyan-100/50">
                ./{n.toLowerCase()}
              </span>
            ))}
            <span
              className="border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ borderColor: CYAN, color: CYAN }}
            >
              &gt; connect
            </span>
          </div>
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em] text-cyan-100/45">
          <span style={{ color: CYAN }}>● SYS.ONLINE</span>
          <span>{IDENTITY.role}</span>
          <span>LAT 23.02 / LON 72.57</span>
        </div>

        <h1
          className="cyber-glitch text-[clamp(2.6rem,10vw,8rem)] font-bold uppercase leading-[0.88] tracking-[-0.03em] text-white"
        >
          Building
          <br />
          What&apos;s Next<span style={{ color: CYAN }}>_</span>
        </h1>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <p className="max-w-xl text-[14px] leading-[1.8] text-cyan-100/65">
            {IDENTITY.standfirstLong}
          </p>

          <div className="cyber-frame border border-cyan-400/25 bg-cyan-400/[0.04] p-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.22em]" style={{ color: CYAN }}>
              ── runtime
            </p>
            {STATS.map((s) => (
              <div
                key={s.l}
                className="flex items-baseline justify-between border-b border-cyan-400/10 py-2 last:border-0"
              >
                <span className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/50">
                  {s.l}
                </span>
                <span className="text-xl font-bold" style={{ color: CYAN }}>
                  {s.v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stack readout ───────────────────────────────── */}
      <section className="relative z-10 border-y border-cyan-400/20 bg-cyan-400/[0.03]">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-7 gap-y-2 px-6 py-4 sm:px-10">
          {STACK.map((s) => (
            <span key={s} className="text-[11px] uppercase tracking-[0.16em] text-cyan-100/55">
              <span style={{ color: CYAN }}>#</span> {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Writing ─────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <p className="mb-8 text-[11px] uppercase tracking-[0.24em]" style={{ color: CYAN }}>
          ── /var/log/writing
        </p>

        <div className="space-y-3">
          {ARTICLES.map((a) => (
            <article
              key={a.n}
              className="cyber-frame border border-cyan-400/20 bg-[#070b10] p-5 transition-colors duration-200 hover:border-cyan-400/50"
            >
              <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] uppercase tracking-[0.18em] text-cyan-100/40">
                <span style={{ color: CYAN }}>[{a.n}]</span>
                <span>{a.pillar}</span>
                <span>{a.dateShort}</span>
                <span>{a.read}</span>
              </div>
              <h2 className="mb-2 text-[clamp(1.1rem,2.4vw,1.6rem)] font-bold uppercase leading-tight tracking-tight text-white">
                {a.title}
              </h2>
              <p className="max-w-3xl text-[13px] leading-[1.75] text-cyan-100/55">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Project ─────────────────────────────────────── */}
      <section className="relative z-10 border-t border-cyan-400/20">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
          <p className="mb-8 text-[11px] uppercase tracking-[0.24em]" style={{ color: CYAN }}>
            ── deployed_systems
          </p>
          <div className="cyber-frame grid gap-8 border border-cyan-400/25 p-7 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <h3 className="mb-4 text-[clamp(1.4rem,3vw,2.2rem)] font-bold uppercase leading-tight text-white">
                {PROJECT.title}
              </h3>
              <p className="max-w-xl text-[13px] leading-[1.8] text-cyan-100/60">
                {PROJECT.excerpt}
              </p>
            </div>
            <div>
              {PROJECT.meta.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between border-b border-cyan-400/10 py-2"
                >
                  <span className="text-[10px] uppercase tracking-[0.18em] text-cyan-100/40">
                    {k}
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: CYAN }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-cyan-400/20 py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-10">
          <p className="cyber-glitch text-[clamp(1.6rem,5vw,3.4rem)] font-bold uppercase leading-tight text-white">
            Building systems with staying power<span style={{ color: CYAN }}>_</span>
          </p>
          <p className="mt-10 text-[10px] uppercase tracking-[0.24em] text-cyan-100/35">
            © 2026 NEEL_BANKER · DIRECTION G · CYBERCORE
          </p>
        </div>
      </footer>
    </div>
  )
}
