import { ThemeShell } from '@/app/design-lab/_components/theme-shell'
import { ARTICLES, IDENTITY, NAV, PROJECT, STACK, STATS } from '@/app/design-lab/_content'

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

const PORTALS = [
  { bg: 'var(--dm-terra)', pat: 'pat-stripes' },
  { bg: 'var(--dm-sky-c)', pat: 'pat-dots' },
  { bg: 'var(--dm-sage)', pat: 'pat-zig' },
]

export default function PatternDreamscapePrototype() {
  return (
    <ThemeShell base="lab-dreammax" darkClass="lab-dreammax-dark" className="font-[family-name:var(--font-archivo)]">
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="relative z-20 mx-auto max-w-[1400px] px-5 pt-6">
        <div
          className="flex flex-wrap items-center justify-between gap-3 border-[3px] px-5 py-3"
          style={{ borderColor: INK, background: PANEL, color: INK, boxShadow: `6px 6px 0 ${SHADOW}` }}
        >
          <span className="text-xl font-black uppercase tracking-tighter">{IDENTITY.name}</span>
          <div className="flex flex-wrap items-center gap-2">
            {NAV.map((n, i) => (
              <span
                key={n}
                className="border-[2px] px-3 py-1 text-[11px] font-bold uppercase"
                style={{ borderColor: ON_ACCENT, background: [SAGE, BUTTER, SKY, ROSE][i], color: ON_ACCENT }}
              >
                {n}
              </span>
            ))}
            <span
              className="border-[2px] px-3 py-1 text-[11px] font-bold uppercase"
              style={{ borderColor: ON_ACCENT, background: LILAC, color: ON_ACCENT }}
            >
              Work with me ★
            </span>
          </div>
        </div>
      </header>

      {/* ── Hero — headline over an arcade of portals ───── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-10 pt-12">
        <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: INK, opacity: 0.7 }}>
          ★ {IDENTITY.role} ★ {IDENTITY.location} ★
        </p>

        <h1
          className="relative z-20 text-[clamp(2.8rem,12vw,10.5rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]"
          style={{ color: INK }}
        >
          <span className="block">Building</span>
          <span className="hand block font-normal lowercase" style={{ color: TERRA, fontSize: '1.18em', lineHeight: 0.85 }}>
            what&apos;s
          </span>
          <span className="max-outline block" style={{ '--stroke': INK } as React.CSSProperties}>
            Next.
          </span>
        </h1>

        {/* the arcade: three patterned portals, each holding a stat */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PORTALS.map((p, i) => (
            <div
              key={STATS[i].l}
              /* generous pb so the label clears the copy panel overlapping below */
              className="surreal-arch dm-longshadow relative flex min-h-[270px] flex-col items-center justify-end overflow-hidden border-[3px] px-5 pb-24 pt-12 sm:pb-28"
              style={{ borderColor: ON_ACCENT, background: p.bg, color: ON_ACCENT }}
            >
              <div
                aria-hidden="true"
                className={`${p.pat} pointer-events-none absolute inset-0 opacity-[0.18]`}
                style={{ color: ON_ACCENT }}
              />
              <span className="relative text-[3.6rem] font-black leading-none">{STATS[i].v}</span>
              <span className="relative mt-2 text-center text-[11px] font-bold uppercase tracking-[0.16em]">
                {STATS[i].l}
              </span>
            </div>
          ))}
        </div>

        {/* copy panel floating in front of the arcade */}
        <div
          className="dm-longshadow relative z-20 mx-auto -mt-10 max-w-3xl border-[3px] px-8 py-8"
          style={{ borderColor: INK, background: PANEL, color: INK }}
        >
          <p className="text-[16px] font-medium leading-[1.7]">{IDENTITY.standfirstLong}</p>
          <p className="hand mt-3 text-[1.55rem] leading-tight" style={{ color: TERRA }}>
            built where the doorways lead somewhere else
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
      </section>

      {/* ── Marquee ─────────────────────────────────────── */}
      <div
        className="relative z-10 mx-auto mt-6 max-w-[1400px] overflow-hidden border-y-[3px] py-2"
        style={{ borderColor: ON_ACCENT, background: ROSE, color: ON_ACCENT }}
      >
        <div className="max-marquee flex w-max whitespace-nowrap">
          {[...STACK, ...STACK].map((s, i) => (
            <span key={`${s}-${i}`} className="mx-5 text-[13px] font-bold uppercase tracking-wider">
              {s} ✦
            </span>
          ))}
        </div>
      </div>

      {/* ── Writing — each article is a doorway ─────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 py-16">
        <h2
          className="mb-10 text-[clamp(1.9rem,6vw,4.2rem)] font-black uppercase leading-none tracking-tighter"
          style={{ color: INK }}
        >
          Latest <span className="hand font-normal lowercase" style={{ color: TERRA }}>writing</span>
        </h2>

        <div className="grid gap-7 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="surreal-arch dm-longshadow relative overflow-hidden border-[3px] px-6 pb-8 pt-10"
              style={{
                borderColor: i === 1 ? INK : ON_ACCENT,
                background: [BUTTER, PANEL, ROSE][i],
                color: i === 1 ? INK : ON_ACCENT,
              }}
            >
              <div
                aria-hidden="true"
                className={`${['pat-dots', 'pat-zig', 'pat-stripes'][i]} pointer-events-none absolute inset-0 opacity-[0.1]`}
                style={{ color: 'currentColor' }}
              />
              <div className="relative">
                <div
                  className="mb-3 inline-block border-[2px] px-2 py-1 text-[10px] font-bold uppercase"
                  style={{ borderColor: 'currentColor' }}
                >
                  {a.pillar}
                </div>
                <h3 className="mb-2 text-[1.15rem] font-black uppercase leading-tight tracking-tight">
                  {a.title}
                </h3>
                <p className="text-[13px] font-medium leading-[1.65]">{a.excerpt}</p>
                <p className="hand mt-3 text-[1.2rem]">read it →</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Work ────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20">
        <div
          className="dm-longshadow border-[3px] p-8 sm:p-10"
          style={{ borderColor: INK, background: PANEL, color: INK }}
        >
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ opacity: 0.7 }}>
            Selected work ✦
          </p>
          <h3 className="mb-5 text-[clamp(1.5rem,4vw,2.6rem)] font-black uppercase leading-[1.05] tracking-tight">
            {PROJECT.title}
          </h3>
          <p className="max-w-2xl text-[15px] font-medium leading-[1.75]">{PROJECT.excerpt}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {PROJECT.meta.map(([k, v], i) => (
              <div
                key={k}
                className="border-[2px] px-4 py-3"
                style={{ borderColor: ON_ACCENT, background: [ROSE, BUTTER, SKY, SAGE][i], color: ON_ACCENT }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-75">{k}</p>
                <p className="mt-1 text-[15px] font-black">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24">
        <p
          className="text-[clamp(1.7rem,6.5vw,4.8rem)] font-black uppercase leading-[0.96] tracking-tighter"
          style={{ color: INK }}
        >
          Building systems with{' '}
          <span className="hand font-normal lowercase" style={{ color: TERRA }}>
            staying power
          </span>
        </p>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: INK, opacity: 0.6 }}>
          © 2026 Neel Banker ★ Direction Q ★ Pattern Dreamscape
        </p>
      </footer>
    </ThemeShell>
  )
}
