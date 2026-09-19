import { ARTICLES, IDENTITY, NAV, PROJECT, STACK, STATS } from '@/app/design-lab/_content'

const INK = '#332b23'

export default function DeskOfDreamsPrototype() {
  return (
    <div
      className="desk-surface relative min-h-screen overflow-hidden font-[family-name:var(--font-archivo)]"
      style={{ color: INK }}
    >
      {/* desk objects that misbehave */}
      <div
        aria-hidden="true"
        className="coffee-ring pointer-events-none absolute right-[12%] top-[8%] hidden h-28 w-28 lg:block"
      />
      {/* a photo floating well above the desk */}
      <div
        aria-hidden="true"
        className="paper-card pointer-events-none absolute right-[6%] top-[38%] hidden h-24 w-32 rotate-[9deg] lg:block"
        style={{ boxShadow: '38px 38px 0 rgba(51,43,35,0.13)' }}
      />

      {/* ── Nav — a strip of tape ───────────────────────── */}
      <header className="relative z-10 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-7 sm:px-10">
        <span className="hand text-[2.1rem] leading-none">{IDENTITY.name}</span>
        <div className="hidden items-center gap-5 md:flex">
          {NAV.map((n, i) => (
            <span
              key={n}
              className="px-2.5 py-1 text-[12px] font-bold"
              style={{
                background: ['#d9e4cf', '#f3dca0', '#f0cfc6', '#cfd8ec'][i],
                transform: `rotate(${i % 2 ? '1.1deg' : '-1.3deg'})`,
              }}
            >
              {n}
            </span>
          ))}
          <span
            className="bg-[#c4503f] px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-[#f6efe2]"
            style={{ transform: 'rotate(1.4deg)', boxShadow: '3px 3px 0 rgba(51,43,35,0.22)' }}
          >
            Work with me
          </span>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-6 sm:px-10">
        <span
          className="mb-6 inline-block bg-[#f3dca0] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ transform: 'rotate(-1.6deg)', boxShadow: '2px 2px 0 rgba(51,43,35,0.18)' }}
        >
          {IDENTITY.location}
        </span>

        <h1 className="text-[clamp(2.6rem,9vw,7rem)] font-black leading-[0.9] tracking-[-0.04em]">
          Building{' '}
          <span className="hand font-normal text-[#c4503f]" style={{ fontSize: '1.12em' }}>
            what&apos;s
          </span>
          <br />
          next.
        </h1>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          {/* a ruled index card */}
          <div
            className="paper-card p-7"
            style={{
              transform: 'rotate(-1deg)',
              backgroundImage:
                'repeating-linear-gradient(transparent, transparent 25px, rgba(51,43,35,0.09) 25px, rgba(51,43,35,0.09) 26px)',
            }}
          >
            <p className="text-[15px] leading-[26px] opacity-80">{IDENTITY.standfirstLong}</p>
            <p className="hand mt-4 text-[1.4rem] leading-tight text-[#c4503f]">
              ↳ mostly custody, L2, and the messy bits in between
            </p>
          </div>

          {/* polaroid whose photo escapes the frame */}
          <div className="relative min-h-[320px]">
            {STATS.map((s, i) => (
              <div
                key={s.l}
                className="paper-card absolute w-[184px] p-3 pb-6"
                style={{
                  transform: `rotate(${['-6deg', '3.5deg', '-1.5deg'][i]})`,
                  left: `${i * 88}px`,
                  top: `${i * 58}px`,
                  zIndex: i,
                  boxShadow: `${14 + i * 12}px ${14 + i * 12}px 0 rgba(51,43,35,0.12)`,
                }}
              >
                <div className="relative flex h-[110px] items-center justify-center bg-[#332b23]">
                  {/* the number spills out of the photo — the surreal beat */}
                  <span
                    className="absolute text-[3.4rem] font-black leading-none text-[#f3dca0]"
                    style={{ top: '-18px', left: '10px' }}
                  >
                    {s.v}
                  </span>
                </div>
                <p className="hand mt-2 text-center text-[1.15rem] leading-tight">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <span
            className="px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide text-[#f6efe2]"
            style={{ background: INK, boxShadow: '4px 4px 0 rgba(51,43,35,0.25)' }}
          >
            Book a call
          </span>
          <span
            className="border-2 border-dashed px-6 py-3.5 text-[13px] font-bold uppercase tracking-wide"
            style={{ borderColor: 'rgba(51,43,35,0.4)', transform: 'rotate(-0.8deg)' }}
          >
            Read the writing
          </span>
        </div>
      </section>

      {/* ── Stack — washi tape ──────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-wrap gap-2">
          {STACK.map((s, i) => (
            <span
              key={s}
              className="px-3 py-1.5 text-[11px] font-bold"
              style={{
                background: ['#d9e4cf', '#f3dca0', '#f0cfc6', '#cfd8ec'][i % 4],
                transform: `rotate(${i % 2 ? '1.3deg' : '-1.5deg'})`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Writing — pinned notes lifting off the desk ─── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:px-10">
        <h2 className="hand mb-12 text-[2.7rem] leading-none">From the notebook…</h2>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="paper-card tape p-6 pt-9"
              style={{
                transform: `rotate(${['-1.8deg', '1.3deg', '-0.7deg'][i]})`,
                // each note floats a little higher off the desk than the last
                boxShadow: `${12 + i * 14}px ${12 + i * 14}px 0 rgba(51,43,35,0.11)`,
              }}
            >
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] opacity-45">
                {a.pillar} · {a.date}
              </p>
              <h3 className="mb-3 text-[1.15rem] font-bold leading-snug tracking-tight">
                {a.title}
              </h3>
              <p className="text-[13px] leading-[1.7] opacity-65">{a.excerpt}</p>
              <p className="hand mt-4 text-[1.2rem] text-[#c4503f]">read it →</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Project — an open folder ────────────────────── */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 sm:px-10">
        <div
          className="paper-card p-8 sm:p-11"
          style={{ transform: 'rotate(0.5deg)', boxShadow: '26px 26px 0 rgba(51,43,35,0.12)' }}
        >
          <span
            className="mb-5 inline-block bg-[#c4503f] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f6efe2]"
            style={{ transform: 'rotate(-1.4deg)' }}
          >
            Selected work
          </span>
          <h3 className="mb-4 max-w-3xl text-[clamp(1.5rem,3.6vw,2.5rem)] font-black leading-[1.1] tracking-tight">
            {PROJECT.title}
          </h3>
          <p className="max-w-2xl text-[15px] leading-[1.8] opacity-70">{PROJECT.excerpt}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PROJECT.meta.map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-45">{k}</p>
                <p className="hand mt-1 text-[1.4rem]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t-2 border-dashed" style={{ borderColor: 'rgba(51,43,35,0.28)' }}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <p className="hand text-[clamp(2rem,6.5vw,4.4rem)] leading-[1.04]">
            Building systems with staying power.
          </p>
          <p className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
            © 2026 Neel Banker · Direction L · Desk of Dreams
          </p>
        </div>
      </footer>
    </div>
  )
}
