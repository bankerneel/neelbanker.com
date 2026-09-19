import { ARTICLES, IDENTITY, NAV, PROJECT, STATS } from '@/app/design-lab/_content'

const INK = '#2a2145'
// drop-shadow (not box-shadow) so the shadow follows the torn clip-path
const TORN_SHADOW = 'drop-shadow(16px 16px 0 rgba(42,33,69,0.16))'

export default function DreamCollagePrototype() {
  return (
    <div
      className="surreal-sky relative min-h-screen overflow-hidden font-[family-name:var(--font-archivo)]"
      style={{ color: INK }}
    >
      {/* floating dream objects */}
      <div
        aria-hidden="true"
        className="long-shadow surreal-arch pointer-events-none absolute right-[7%] top-[14%] hidden h-64 w-40 bg-[#f3b6cf] lg:block"
      />
      <div
        aria-hidden="true"
        className="long-shadow pointer-events-none absolute left-[3%] top-[46%] hidden h-28 w-28 rounded-full bg-[#ffcf8b] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[30%] top-[6%] hidden h-20 w-20 rotate-[24deg] bg-[#a5b6ff] lg:block long-shadow"
      />

      {/* ── Nav on a torn strip ─────────────────────────── */}
      <header className="relative z-10 mx-auto mt-6 max-w-6xl px-6 sm:px-10">
        <div
          className="torn bg-[#fffdf6]/90 px-6 py-4 backdrop-blur-sm"
          style={{ filter: TORN_SHADOW }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="hand text-[1.9rem] leading-none">{IDENTITY.name}</span>
            <div className="hidden items-center gap-6 md:flex">
              {NAV.map((n) => (
                <span key={n} className="text-[13px] font-semibold opacity-70">
                  {n}
                </span>
              ))}
              <span className="rounded-full bg-[#e2557c] px-4 py-1.5 text-[12px] font-bold uppercase tracking-wide text-white">
                Work with me
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero — headline in the sky, copy on paper ───── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-16 sm:px-10">
        <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.3em] opacity-55">
          {IDENTITY.role}
        </p>

        <h1 className="text-[clamp(2.8rem,11vw,9rem)] font-black leading-[0.86] tracking-[-0.045em]">
          Building
          <br />
          <span className="hand font-normal text-[#e2557c]" style={{ fontSize: '1.05em' }}>
            what&apos;s
          </span>{' '}
          next.
        </h1>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* torn paper fragment */}
          <div
            className="torn bg-[#fffdf6] px-7 py-9"
            style={{ filter: TORN_SHADOW, transform: 'rotate(-1.4deg)' }}
          >
            <p className="text-[16px] leading-[1.75] opacity-80">{IDENTITY.standfirstLong}</p>
            <p className="hand mt-4 text-[1.45rem] text-[#e2557c]">
              ↳ the messy bits are the interesting bits
            </p>
          </div>

          {/* polaroids adrift */}
          <div className="relative min-h-[300px]">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className="paper-card long-shadow absolute w-[176px] p-3 pb-5"
                style={{
                  transform: `rotate(${['-7deg', '4deg', '-2deg'][i]})`,
                  left: `${i * 92}px`,
                  top: `${i * 54}px`,
                  zIndex: i,
                }}
              >
                <div
                  className="flex h-[104px] items-center justify-center"
                  style={{ background: ['#2a2145', '#e2557c', '#6a7fd4'][i] }}
                >
                  <span className="text-[2.5rem] font-black text-[#ffe9b8]">{s.v}</span>
                </div>
                <p className="hand mt-2 text-center text-[1.1rem] leading-tight">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <span
            className="rounded-full px-7 py-3.5 text-[14px] font-bold text-white"
            style={{ background: INK }}
          >
            Book a call
          </span>
          <span className="rounded-full border-2 border-dashed border-current/35 bg-white/45 px-7 py-3.5 text-[14px] font-bold backdrop-blur-sm">
            Read the writing
          </span>
        </div>
      </section>

      {/* ── Writing — torn scraps drifting ──────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <h2 className="hand mb-12 text-[2.8rem] leading-none">From the notebook…</h2>

        <div className="space-y-10">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="torn bg-[#fffdf6] px-7 py-8 sm:px-9"
              style={{
                filter: TORN_SHADOW,
                transform: `rotate(${['-0.9deg', '0.7deg', '-0.5deg'][i]})`,
                marginLeft: `${i * 52}px`,
              }}
            >
              <div className="mb-3 flex flex-wrap gap-x-5 text-[11px] font-bold uppercase tracking-[0.16em] opacity-50">
                <span>{a.pillar}</span>
                <span>{a.date}</span>
                <span>{a.read}</span>
              </div>
              <h3 className="mb-3 max-w-3xl text-[clamp(1.25rem,3vw,2rem)] font-bold leading-[1.15] tracking-tight">
                {a.title}
              </h3>
              <p className="max-w-2xl text-[14px] leading-[1.75] opacity-70">{a.excerpt}</p>
              <p className="hand mt-4 text-[1.25rem] text-[#e2557c]">read it →</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Project — an arch doorway ───────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-28 sm:px-10">
        <div
          className="surreal-arch long-shadow px-8 pb-12 pt-16 text-white sm:px-12"
          style={{ background: INK }}
        >
          <p className="mb-5 text-center text-[11px] font-bold uppercase tracking-[0.26em] opacity-55">
            Selected work
          </p>
          <h3 className="mx-auto mb-6 max-w-2xl text-center text-[clamp(1.5rem,3.6vw,2.6rem)] font-bold leading-[1.15]">
            {PROJECT.title}
          </h3>
          <p className="mx-auto max-w-xl text-center text-[14px] leading-[1.8] opacity-75">
            {PROJECT.excerpt}
          </p>
          <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 gap-6 sm:grid-cols-4">
            {PROJECT.meta.map(([k, v]) => (
              <div key={k} className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-50">{k}</p>
                <p className="hand mt-1 text-[1.3rem]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-20 sm:px-10">
        <p className="text-[clamp(1.7rem,5.5vw,4rem)] font-black leading-[1.04] tracking-[-0.04em]">
          Building systems with{' '}
          <span className="hand font-normal text-[#e2557c]">staying power</span>.
        </p>
        <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.24em] opacity-45">
          © 2026 Neel Banker · Direction J · Dream Collage
        </p>
      </footer>
    </div>
  )
}
