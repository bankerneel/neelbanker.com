import { ARTICLES, IDENTITY, NAV, PROJECTS, STACK, STATS } from '@/app/design-lab/_content'

const TILTS = ['-1.6deg', '1.2deg', '-0.8deg']

export default function ScrapbookPrototype() {
  return (
    <div
      className="min-h-screen font-[family-name:var(--font-archivo)] text-[#2a2521]"
      style={{
        background:
          'repeating-linear-gradient(0deg, rgba(0,0,0,0.018) 0px, rgba(0,0,0,0.018) 1px, transparent 1px, transparent 26px), #f0e9dc',
      }}
    >
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 sm:px-10">
        <span className="hand text-[2rem] leading-none">Neel Banker</span>
        <div className="hidden items-center gap-5 md:flex">
          {NAV.map((n, i) => (
            <span
              key={n}
              className="border-b-2 border-dashed border-[#2a2521]/25 pb-0.5 text-[13px] font-semibold"
              style={{ transform: `rotate(${i % 2 ? '0.8deg' : '-0.8deg'})` }}
            >
              {n}
            </span>
          ))}
          <span
            className="bg-[#e4574b] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white shadow-[2px_2px_0_rgba(0,0,0,0.18)]"
            style={{ transform: 'rotate(1.4deg)' }}
          >
            Work with me
          </span>
        </div>
      </header>

      {/* ── Hero — layered collage ──────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span
              className="mb-5 inline-block bg-[#f5d76e] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] shadow-[2px_2px_0_rgba(0,0,0,0.15)]"
              style={{ transform: 'rotate(-1.8deg)' }}
            >
              {IDENTITY.location}
            </span>

            <h1 className="text-[clamp(2.6rem,7.5vw,5.4rem)] font-black leading-[0.95] tracking-[-0.035em]">
              Building{' '}
              <span className="hand font-normal text-[#e4574b]" style={{ fontSize: '1.15em' }}>
                what&apos;s
              </span>{' '}
              next.
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-[1.7] text-[#2a2521]/70">
              {IDENTITY.standfirstLong}
            </p>

            <p className="hand mt-5 text-[1.5rem] leading-tight text-[#2a2521]/60">
              ↳ mostly custody, L2 and the messy bits in between
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="bg-[#2a2521] px-6 py-3 text-[13px] font-bold uppercase tracking-wide text-[#f0e9dc] shadow-[3px_3px_0_rgba(0,0,0,0.2)]">
                Book a call
              </span>
              <span
                className="border-2 border-dashed border-[#2a2521]/40 px-6 py-3 text-[13px] font-bold uppercase tracking-wide"
                style={{ transform: 'rotate(-1deg)' }}
              >
                Read the writing
              </span>
            </div>
          </div>

          {/* polaroid stack */}
          <div className="relative min-h-[320px]">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className="paper-card absolute w-[188px] p-3 pb-6"
                style={{
                  transform: `rotate(${['-5deg', '3.5deg', '-1.5deg'][i]})`,
                  left: `${i * 84}px`,
                  top: `${i * 62}px`,
                  zIndex: i,
                }}
              >
                <div className="flex h-[112px] items-center justify-center bg-[#2a2521]">
                  <span className="text-[2.6rem] font-black text-[#f5d76e]">{s.v}</span>
                </div>
                <p className="hand mt-2 text-center text-[1.15rem] leading-tight">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Washi tape divider ──────────────────────────── */}
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap gap-2">
          {STACK.map((s, i) => (
            <span
              key={s}
              className="px-3 py-1.5 text-[11px] font-semibold"
              style={{
                background: ['#cfe3d4', '#f5d76e', '#f2c4bb', '#cdd9ef'][i % 4],
                transform: `rotate(${i % 2 ? '1.2deg' : '-1.4deg'})`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Writing — taped cards ───────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <h2 className="hand mb-12 text-[2.6rem] leading-none">From the notebook…</h2>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="paper-card tape p-6 pt-8"
              style={{ transform: `rotate(${TILTS[i]})` }}
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#2a2521]/45">
                {a.pillar} · {a.date}
              </p>
              <h3 className="mb-3 text-[1.15rem] font-bold leading-snug tracking-tight">
                {a.title}
              </h3>
              <p className="text-[13px] leading-[1.7] text-[#2a2521]/65">{a.excerpt}</p>
              <p className="hand mt-4 text-[1.2rem] text-[#e4574b]">read it →</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Projects — pinned index cards ───────────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <h2 className="hand mb-10 text-[2.4rem] leading-none">Things I built</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="paper-card relative p-5"
              style={{ transform: `rotate(${i % 2 ? '1.4deg' : '-1.6deg'})` }}
            >
              <span
                className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-[#e4574b] shadow-[1px_1px_2px_rgba(0,0,0,0.3)]"
                aria-hidden="true"
              />
              <p className="mt-2 text-[15px] font-bold tracking-tight">{p.title}</p>
              <p className="mt-1 text-[12px] text-[#2a2521]/60">{p.sub}</p>
              <p className="hand mt-3 text-[1.1rem] text-[#2a2521]/55">{p.tag}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t-2 border-dashed border-[#2a2521]/25">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <p className="hand text-[clamp(2rem,6vw,4rem)] leading-[1.05]">
            Building systems with staying power.
          </p>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#2a2521]/40">
            © 2026 Neel Banker · Direction H · Scrapbook
          </p>
        </div>
      </footer>
    </div>
  )
}
