import { ThemeShell } from '@/app/design-lab/_components/theme-shell'
import { ARTICLES, IDENTITY, NAV, PROJECT, PROJECTS, STACK, STATS } from '@/app/design-lab/_content'

const PANEL = 'var(--dm-panel)'
const INK = 'var(--dm-ink)'
const ON_ACCENT = 'var(--dm-on-accent)'
const ROSE = 'var(--dm-rose)'
const BUTTER = 'var(--dm-butter)'
const SKY = 'var(--dm-sky-c)'
const LILAC = 'var(--dm-lilac)'
const SAGE = 'var(--dm-sage)'
const TERRA = 'var(--dm-terra)'
const SHADOW = 'var(--dm-shadow)'

// clip-path clips borders and box-shadows, so torn panels use drop-shadow
const TORN_SHADOW = 'drop-shadow(13px 13px 0 var(--dm-shadow))'

export default function TornMaximalismPrototype() {
  return (
    <ThemeShell base="lab-dreammax" darkClass="lab-dreammax-dark" className="font-[family-name:var(--font-archivo)]">
      {/* ── Nav — a torn strip carrying bordered chips ──── */}
      <header className="relative z-10 mx-auto mt-5 max-w-[1400px] px-5">
        <div className="torn px-6 py-4" style={{ background: PANEL, filter: TORN_SHADOW }}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-2xl font-black uppercase tracking-tighter" style={{ color: INK }}>
              {IDENTITY.name}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {NAV.map((n, i) => (
                <span
                  key={n}
                  className="border-[2px] px-3 py-1.5 text-[12px] font-bold uppercase"
                  style={{
                    borderColor: ON_ACCENT,
                    background: [SAGE, BUTTER, SKY, ROSE][i],
                    color: ON_ACCENT,
                    transform: `rotate(${i % 2 ? '1.3deg' : '-1.3deg'})`,
                  }}
                >
                  {n}
                </span>
              ))}
              <span
                className="border-[2px] px-4 py-1.5 text-[12px] font-bold uppercase"
                style={{ borderColor: ON_ACCENT, background: LILAC, color: ON_ACCENT, boxShadow: `3px 3px 0 ${SHADOW}` }}
              >
                Work with me ★
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Marquee ─────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto mt-5 max-w-[1400px] overflow-hidden border-y-[3px] py-2"
        style={{ borderColor: ON_ACCENT, background: SKY, color: ON_ACCENT }}
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
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 py-14">
        <div
          aria-hidden="true"
          className="pat-dots pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{ color: INK }}
        />
        <div className="relative">
          <div
            className="mb-6 inline-block border-[2px] px-4 py-2 text-[12px] font-bold uppercase tracking-[0.1em]"
            style={{ borderColor: INK, background: PANEL, color: INK, boxShadow: `4px 4px 0 ${ROSE}` }}
          >
            ★ {IDENTITY.role} ★ {IDENTITY.location} ★
          </div>

          <h1
            className="text-[clamp(3rem,13vw,11rem)] font-black uppercase leading-[0.8] tracking-[-0.05em]"
            style={{ color: INK }}
          >
            <span className="block">Building</span>
            <span
              className="hand block font-normal lowercase"
              style={{ color: TERRA, fontSize: '1.15em', lineHeight: 0.9 }}
            >
              what&apos;s
            </span>
            <span className="max-outline block" style={{ '--stroke': INK } as React.CSSProperties}>
              Next.
            </span>
          </h1>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* torn copy fragment */}
            <div
              className="torn px-8 py-9"
              style={{ background: PANEL, color: INK, filter: TORN_SHADOW, transform: 'rotate(-0.8deg)' }}
            >
              <p className="text-[16px] font-medium leading-[1.7]">{IDENTITY.standfirstLong}</p>
              <p className="hand mt-3 text-[1.6rem] leading-tight" style={{ color: TERRA }}>
                torn from somewhere better
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span
                  className="border-[3px] px-6 py-3 text-[13px] font-bold uppercase"
                  style={{ borderColor: ON_ACCENT, background: LILAC, color: ON_ACCENT, boxShadow: `4px 4px 0 ${SHADOW}` }}
                >
                  Book a call →
                </span>
                <span
                  className="border-[3px] px-6 py-3 text-[13px] font-bold uppercase"
                  style={{ borderColor: ON_ACCENT, background: BUTTER, color: ON_ACCENT, boxShadow: `4px 4px 0 ${SHADOW}` }}
                >
                  Read the writing
                </span>
              </div>
            </div>

            {/* patterned stat bars */}
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
                    transform: `rotate(${i % 2 ? '0.7deg' : '-0.7deg'})`,
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="pat-stripes absolute inset-0 opacity-[0.14]"
                    style={{ color: ON_ACCENT }}
                  />
                  <span className="relative text-[12px] font-bold uppercase tracking-[0.12em]">{s.l}</span>
                  <span className="relative text-[2.8rem] font-black leading-none">{s.v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Writing — torn cards ────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16">
        <h2
          className="mb-10 text-[clamp(2rem,7vw,5rem)] font-black uppercase leading-none tracking-tighter"
          style={{ color: INK }}
        >
          Latest <span className="hand font-normal lowercase" style={{ color: TERRA }}>writing</span>
        </h2>

        <div className="grid gap-7 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="torn px-6 py-8"
              style={{
                background: [BUTTER, PANEL, ROSE][i],
                color: i === 1 ? INK : ON_ACCENT,
                filter: TORN_SHADOW,
                transform: `rotate(${['-1.4deg', '0.9deg', '-0.6deg'][i]})`,
              }}
            >
              <div
                className="mb-3 inline-block border-[2px] px-2 py-1 text-[10px] font-bold uppercase"
                style={{ borderColor: 'currentColor' }}
              >
                {a.pillar}
              </div>
              <h3 className="mb-2 text-[1.2rem] font-black uppercase leading-tight tracking-tight">
                {a.title}
              </h3>
              <p className="text-[13px] font-medium leading-[1.65]">{a.excerpt}</p>
              <p className="hand mt-3 text-[1.25rem]">read it →</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20">
        <div
          className="border-[3px] p-8"
          style={{ borderColor: ON_ACCENT, background: LILAC, color: ON_ACCENT, boxShadow: `8px 8px 0 ${SHADOW}` }}
        >
          <h2 className="mb-6 text-[clamp(1.8rem,6vw,3.6rem)] font-black uppercase leading-none tracking-tighter">
            Selected work ✦
          </h2>
          <div className="torn px-7 py-8" style={{ background: PANEL, color: INK, filter: TORN_SHADOW }}>
            <h3 className="mb-4 text-[clamp(1.4rem,4vw,2.4rem)] font-black uppercase leading-[1.05] tracking-tight">
              {PROJECT.title}
            </h3>
            <p className="max-w-2xl text-[15px] font-medium leading-[1.75]">{PROJECT.excerpt}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {PROJECTS.map((p, i) => (
                <span
                  key={p.title}
                  className="border-[2px] px-3 py-1.5 text-[12px] font-bold uppercase"
                  style={{ borderColor: ON_ACCENT, background: [ROSE, BUTTER, SKY, SAGE][i], color: ON_ACCENT }}
                >
                  {p.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24">
        <p
          className="text-[clamp(1.8rem,7vw,5rem)] font-black uppercase leading-[0.95] tracking-tighter"
          style={{ color: INK }}
        >
          Building systems with{' '}
          <span className="hand font-normal lowercase" style={{ color: TERRA }}>
            staying power
          </span>
        </p>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: INK, opacity: 0.6 }}>
          © 2026 Neel Banker ★ Direction O ★ Torn Maximalism
        </p>
      </footer>
    </ThemeShell>
  )
}
