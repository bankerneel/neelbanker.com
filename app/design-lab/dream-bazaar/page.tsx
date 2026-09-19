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
const TORN_SHADOW = 'drop-shadow(11px 11px 0 var(--dm-shadow))'

export default function DreamBazaarPrototype() {
  return (
    <ThemeShell base="lab-dreammax" darkClass="lab-dreammax-dark" className="font-[family-name:var(--font-archivo)]">
      {/* floating dream furniture */}
      <div
        aria-hidden="true"
        className="surreal-arch dm-longshadow pointer-events-none absolute right-[5%] top-[16%] hidden h-72 w-44 lg:block"
        style={{ background: LILAC }}
      />
      <div
        aria-hidden="true"
        className="dm-longshadow pointer-events-none absolute left-[2%] top-[58%] hidden h-32 w-32 rounded-full lg:block"
        style={{ background: BUTTER }}
      />

      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="relative z-20 mx-auto max-w-[1400px] px-5 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className="border-[3px] px-4 py-2 text-2xl font-black uppercase tracking-tighter"
            style={{ borderColor: INK, background: PANEL, color: INK, boxShadow: `5px 5px 0 ${SHADOW}`, transform: 'rotate(-1.4deg)' }}
          >
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
                  transform: `rotate(${i % 2 ? '2deg' : '-2deg'})`,
                }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* ── The wall — everything overlaps ──────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-16 pt-10">
        <h1
          className="relative z-20 text-[clamp(2.8rem,12vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.05em]"
          style={{ color: INK }}
        >
          <span className="block">Building</span>
          <span className="hand block font-normal lowercase" style={{ color: TERRA, fontSize: '1.2em', lineHeight: 0.85 }}>
            what&apos;s
          </span>
          <span className="max-outline block" style={{ '--stroke': INK } as React.CSSProperties}>
            Next.
          </span>
        </h1>

        {/* scattered, overlapping scraps */}
        <div className="relative mt-8 flex flex-wrap items-start justify-center gap-y-6">
          {/* copy scrap */}
          <div
            className="torn relative z-30 w-full max-w-[460px] px-7 py-8 lg:-mr-12"
            style={{ background: PANEL, color: INK, filter: TORN_SHADOW, transform: 'rotate(-1.6deg)' }}
          >
            <p className="text-[15px] font-medium leading-[1.7]">{IDENTITY.standfirstLong}</p>
            <p className="hand mt-3 text-[1.5rem]" style={{ color: TERRA }}>
              pinned to the wall, slightly crooked
            </p>
          </div>

          {/* pattern swatch */}
          <div
            className="relative z-10 hidden h-[190px] w-[150px] border-[3px] lg:block lg:-ml-6 lg:mt-14"
            style={{ borderColor: ON_ACCENT, background: SKY, boxShadow: `7px 7px 0 ${SHADOW}`, transform: 'rotate(4deg)' }}
          >
            <div aria-hidden="true" className="pat-zig h-full w-full opacity-[0.3]" style={{ color: ON_ACCENT }} />
          </div>

          {/* polaroid stats, overlapping */}
          {STATS.map((s, i) => (
            <div
              key={s.l}
              className="relative w-[168px] p-3 pb-5"
              style={{
                background: PANEL,
                boxShadow: `9px 9px 0 ${SHADOW}`,
                transform: `rotate(${['-6deg', '5deg', '-3deg'][i]})`,
                zIndex: 20 - i,
                marginLeft: i === 0 ? 0 : '-26px',
                marginTop: `${i * 22}px`,
              }}
            >
              <div
                className="flex h-[104px] items-center justify-center"
                style={{ background: [TERRA, ROSE, SAGE][i] }}
              >
                <span className="text-[2.5rem] font-black leading-none" style={{ color: ON_ACCENT }}>
                  {s.v}
                </span>
              </div>
              <p className="hand mt-2 text-center text-[1.1rem] leading-tight" style={{ color: INK }}>
                {s.l}
              </p>
            </div>
          ))}
        </div>

        {/* ticket-stub stack chips */}
        <div className="relative z-20 mt-12 flex flex-wrap justify-center gap-2">
          {STACK.map((s, i) => (
            <span
              key={s}
              className="border-[2px] px-3 py-1.5 text-[11px] font-bold uppercase"
              style={{
                borderColor: ON_ACCENT,
                background: [ROSE, BUTTER, SKY, SAGE, LILAC, TERRA][i % 6],
                color: ON_ACCENT,
                transform: `rotate(${i % 2 ? '2.2deg' : '-2.2deg'})`,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Writing — pinned at angles, overlapping ─────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20">
        <h2
          className="mb-10 text-[clamp(1.9rem,6vw,4rem)] font-black uppercase leading-none tracking-tighter"
          style={{ color: INK }}
        >
          From the <span className="hand font-normal lowercase" style={{ color: TERRA }}>notebook</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-y-10">
          {ARTICLES.map((a, i) => (
            <article
              key={a.n}
              className="torn relative w-full max-w-[380px] px-6 py-8"
              style={{
                background: [BUTTER, PANEL, ROSE][i],
                color: i === 1 ? INK : ON_ACCENT,
                filter: TORN_SHADOW,
                transform: `rotate(${['-2.4deg', '1.6deg', '-1.2deg'][i]})`,
                marginLeft: i === 0 ? 0 : '-30px',
                marginTop: `${i * 26}px`,
                zIndex: 10 + i,
              }}
            >
              <div
                className="mb-3 inline-block border-[2px] px-2 py-1 text-[10px] font-bold uppercase"
                style={{ borderColor: 'currentColor' }}
              >
                {a.pillar} · {a.dateShort}
              </div>
              <h3 className="mb-2 text-[1.15rem] font-black uppercase leading-tight tracking-tight">
                {a.title}
              </h3>
              <p className="text-[13px] font-medium leading-[1.65]">{a.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Work — an arch portal ───────────────────────── */}
      <section className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20">
        <div
          className="surreal-arch dm-longshadow px-8 pb-12 pt-16 sm:px-12"
          style={{ background: LILAC, color: ON_ACCENT }}
        >
          <p className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.24em]">
            Selected work ✦
          </p>
          <h3 className="mx-auto mb-5 max-w-2xl text-center text-[clamp(1.4rem,3.6vw,2.4rem)] font-black uppercase leading-[1.1]">
            {PROJECT.title}
          </h3>
          <p className="mx-auto max-w-xl text-center text-[14px] font-medium leading-[1.75]">
            {PROJECT.excerpt}
          </p>
          <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-4">
            {PROJECT.meta.map(([k, v]) => (
              <div key={k} className="text-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-70">{k}</p>
                <p className="hand mt-1 text-[1.35rem]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 mx-auto max-w-[1400px] px-5 pb-24">
        <p
          className="text-[clamp(1.7rem,6.5vw,4.6rem)] font-black uppercase leading-[0.96] tracking-tighter"
          style={{ color: INK }}
        >
          Building systems with{' '}
          <span className="hand font-normal lowercase" style={{ color: TERRA }}>
            staying power
          </span>
        </p>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: INK, opacity: 0.6 }}>
          © 2026 Neel Banker ★ Direction P ★ Dream Bazaar
        </p>
      </footer>
    </ThemeShell>
  )
}
