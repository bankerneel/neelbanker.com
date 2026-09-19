import { ARTICLES, IDENTITY, NAV, PROJECT, PROJECTS, STACK, STATS } from '@/app/design-lab/_content'

// Surface tokens. Rule: an element's border matches the text colour of the
// surface it sits on — which is identical in light, and keeps accent fills
// legible in dark.
const GROUND = 'var(--max-ground)'
const PANEL = 'var(--max-panel)'
const INK = 'var(--max-ink)' // text/border on ground + panel
const ON_ACCENT = 'var(--max-on-accent)' // text/border on accent fills
const CONTRAST = 'var(--max-accent-contrast)'
const ROSE = 'var(--max-rose)'
const SAGE = 'var(--max-sage)'
const BUTTER = 'var(--max-butter)'
const SKY = 'var(--max-sky)'
const LILAC = 'var(--max-lilac)'
const TERRA = 'var(--max-terra)'
const SHADOW = 'var(--max-shadow)'

/**
 * Maximalism — one layout, two moods. The palette lives entirely in CSS
 * custom properties (.lab-max / .lab-max-dark), so a real light/dark toggle
 * on the site would only need to swap that class.
 */
export function Maximalism({ variant, label }: { variant: string; label: string }) {
  return (
    <div
      className={`lab-max ${variant} min-h-screen overflow-hidden font-[family-name:var(--font-archivo)]`}
    >
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="border-b-[3px]" style={{ borderColor: INK, background: BUTTER, color: ON_ACCENT }}>
        <nav className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-5 py-4">
          <span
            className="border-[3px] px-4 py-1.5 text-2xl font-black uppercase tracking-tighter"
            style={{ borderColor: INK, background: PANEL, color: INK, boxShadow: `4px 4px 0 ${SHADOW}` }}
          >
            {IDENTITY.name}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {NAV.map((n, i) => {
              const isPanel = i === 1
              return (
                <span
                  key={n}
                  className="border-[2px] px-3 py-1.5 text-[12px] font-bold uppercase"
                  style={{
                    borderColor: isPanel ? INK : ON_ACCENT,
                    background: [SAGE, PANEL, SKY, ROSE][i],
                    color: isPanel ? INK : ON_ACCENT,
                    transform: `rotate(${i % 2 ? '1.2deg' : '-1.2deg'})`,
                  }}
                >
                  {n}
                </span>
              )
            })}
            <span
              className="border-[2px] px-4 py-1.5 text-[12px] font-bold uppercase"
              style={{
                borderColor: ON_ACCENT,
                background: LILAC,
                color: ON_ACCENT,
                boxShadow: `3px 3px 0 ${SHADOW}`,
              }}
            >
              Work with me ★
            </span>
          </div>
        </nav>
      </header>

      {/* ── Marquee ─────────────────────────────────────── */}
      <div
        className="overflow-hidden border-b-[3px] py-2"
        style={{ borderColor: INK, background: SKY, color: ON_ACCENT }}
      >
        <div className="max-marquee flex w-max whitespace-nowrap">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={`${s}-${i}`} className="mx-5 text-[13px] font-bold uppercase tracking-wider">
              {s} ✦
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ────────────────────────────────────────── */}
      <section
        className="relative border-b-[3px] px-5 py-12"
        style={{ borderColor: INK, background: GROUND, color: INK }}
      >
        <div
          aria-hidden="true"
          className="pat-dots pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{ color: INK }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <div
            className="mb-6 inline-block border-[2px] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{ borderColor: INK, background: PANEL, boxShadow: `4px 4px 0 ${ROSE}` }}
          >
            ★ {IDENTITY.role} ★ {IDENTITY.location} ★
          </div>

          <h1 className="text-[clamp(3rem,13vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.05em]">
            <span className="block">Building</span>
            <span
              className="block font-[family-name:var(--font-playfair)] italic lowercase tracking-[-0.02em]"
              style={{ color: TERRA }}
            >
              what&apos;s
            </span>
            <span className="max-outline block" style={{ '--stroke': INK } as React.CSSProperties}>
              Next.
            </span>
          </h1>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div
              className="border-[3px] p-7"
              style={{ borderColor: INK, background: PANEL, boxShadow: `7px 7px 0 ${SAGE}` }}
            >
              <p className="text-[16px] font-medium leading-[1.7]">{IDENTITY.standfirstLong}</p>
              <p className="hand mt-3 text-[1.6rem] leading-tight" style={{ color: TERRA }}>
                more is more — just quieter about it
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span
                  className="border-[3px] px-6 py-3 text-[13px] font-bold uppercase"
                  style={{
                    borderColor: ON_ACCENT,
                    background: LILAC,
                    color: ON_ACCENT,
                    boxShadow: `4px 4px 0 ${SHADOW}`,
                  }}
                >
                  Book a call →
                </span>
                <span
                  className="border-[3px] px-6 py-3 text-[13px] font-bold uppercase"
                  style={{
                    borderColor: ON_ACCENT,
                    background: BUTTER,
                    color: ON_ACCENT,
                    boxShadow: `4px 4px 0 ${SHADOW}`,
                  }}
                >
                  Read the writing
                </span>
              </div>
            </div>

            <div className="grid gap-4">
              {STATS.map((s, i) => (
                <div
                  key={s.l}
                  className="relative flex items-center justify-between overflow-hidden border-[3px] px-6 py-4"
                  style={{
                    borderColor: ON_ACCENT,
                    background: [TERRA, ROSE, SAGE][i],
                    color: ON_ACCENT,
                    boxShadow: `6px 6px 0 ${SHADOW}`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pat-stripes absolute inset-0 opacity-[0.12]"
                    style={{ color: ON_ACCENT }}
                  />
                  <span className="relative text-[12px] font-bold uppercase tracking-[0.12em]">
                    {s.l}
                  </span>
                  <span className="relative text-[2.8rem] font-black leading-none">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Writing ─────────────────────────────────────── */}
      <section
        className="relative border-b-[3px] px-5 py-12"
        style={{ borderColor: INK, background: PANEL, color: INK }}
      >
        <div
          aria-hidden="true"
          className="pat-zig pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ color: LILAC }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <h2 className="mb-8 text-[clamp(2rem,7vw,5rem)] font-black uppercase leading-none tracking-tighter">
            Latest{' '}
            <span
              className="font-[family-name:var(--font-playfair)] italic lowercase"
              style={{ color: TERRA }}
            >
              writing
            </span>
          </h2>

          <div className="grid gap-6 md:grid-cols-3">
            {ARTICLES.map((a, i) => {
              const isPanel = i === 1
              return (
                <article
                  key={a.n}
                  className="border-[3px] p-6"
                  style={{
                    borderColor: isPanel ? INK : ON_ACCENT,
                    background: [BUTTER, PANEL, ROSE][i],
                    color: isPanel ? INK : ON_ACCENT,
                    boxShadow: `6px 6px 0 ${[SKY, ROSE, LILAC][i]}`,
                    transform: `rotate(${['-1deg', '0.7deg', '-0.5deg'][i]})`,
                  }}
                >
                  <div
                    className="mb-3 inline-block border-[2px] px-2 py-1 text-[10px] font-bold uppercase"
                    style={{ borderColor: INK, background: PANEL, color: INK }}
                  >
                    {a.pillar}
                  </div>
                  <h3 className="mb-2 text-[1.2rem] font-black uppercase leading-tight tracking-tight">
                    {a.title}
                  </h3>
                  <p className="text-[13px] font-medium leading-[1.65]">{a.excerpt}</p>
                  <p className="mt-4 text-[12px] font-bold uppercase">Read it ▸▸</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────── */}
      <section
        className="border-b-[3px] px-5 py-12"
        style={{ borderColor: INK, background: LILAC, color: ON_ACCENT }}
      >
        <div className="mx-auto max-w-[1400px]">
          <h2 className="mb-8 text-[clamp(1.8rem,6vw,4rem)] font-black uppercase leading-none tracking-tighter">
            Selected work ✦
          </h2>
          <div
            className="border-[3px] p-7"
            style={{ borderColor: INK, background: PANEL, color: INK, boxShadow: `7px 7px 0 ${SHADOW}` }}
          >
            <h3 className="mb-4 text-[clamp(1.4rem,4vw,2.6rem)] font-black uppercase leading-[1.05] tracking-tight">
              {PROJECT.title}
            </h3>
            <p className="max-w-2xl text-[15px] font-medium leading-[1.75]">{PROJECT.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {PROJECTS.map((p, i) => (
                <span
                  key={p.title}
                  className="border-[2px] px-3 py-1.5 text-[12px] font-bold uppercase"
                  style={{
                    borderColor: ON_ACCENT,
                    background: [ROSE, BUTTER, SKY, SAGE][i],
                    color: ON_ACCENT,
                  }}
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative px-5 py-14" style={{ background: ROSE, color: ON_ACCENT }}>
        <div
          aria-hidden="true"
          className="pat-stripes pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{ color: ON_ACCENT }}
        />
        <div className="relative mx-auto max-w-[1400px]">
          <p className="text-[clamp(1.8rem,7vw,5.5rem)] font-black uppercase leading-[0.95] tracking-tighter">
            Building systems with{' '}
            <span
              className="font-[family-name:var(--font-playfair)] italic lowercase"
              style={{ color: CONTRAST }}
            >
              staying power
            </span>
          </p>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em] opacity-70">
            © 2026 Neel Banker ★ {label}
          </p>
        </div>
      </footer>
    </div>
  )
}
