import { ARTICLES, IDENTITY, NAV, PROJECTS, STACK, STATS } from '@/app/design-lab/_content'

const CARD =
  'rounded-3xl border border-black/[0.07] bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:-translate-y-1'

const ACCENT = '#2f4bff'

export default function BentoPrototype() {
  return (
    <div className="min-h-screen bg-[#f2f2f4] font-[family-name:var(--font-archivo)] text-[#111113]">
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 sm:px-8">
        <span className="text-lg font-bold tracking-tight">{IDENTITY.name}</span>
        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((n) => (
            <span key={n} className="text-[13px] font-medium text-black/55">
              {n}
            </span>
          ))}
          <span
            className="rounded-full px-4 py-2 text-[13px] font-semibold text-white"
            style={{ background: ACCENT }}
          >
            Work With Me
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-28 sm:px-8">
        {/* ── Bento grid ────────────────────────────────── */}
        <div className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-3">
          {/* Hero — spans 2 */}
          <section className={`${CARD} md:col-span-2 md:row-span-2 flex flex-col justify-between`}>
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{ background: `${ACCENT}14`, color: ACCENT }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                Available for advisory
              </span>
              <h1 className="mt-6 text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.02] tracking-[-0.03em]">
                Building
                <br />
                what&apos;s next.
              </h1>
              <p className="mt-5 max-w-md text-[15px] leading-[1.65] text-black/55">
                {IDENTITY.standfirst}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <span
                className="rounded-full px-5 py-2.5 text-[13px] font-semibold text-white"
                style={{ background: ACCENT }}
              >
                Book a call
              </span>
              <span className="rounded-full border border-black/12 px-5 py-2.5 text-[13px] font-semibold">
                Read the writing
              </span>
            </div>
          </section>

          {/* Role card */}
          <section className={CARD}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
              Role
            </p>
            <p className="mt-3 text-[19px] font-semibold leading-[1.3] tracking-tight">
              {IDENTITY.role}
            </p>
            <p className="mt-3 text-[13px] text-black/50">{IDENTITY.location}</p>
          </section>

          {/* Stats card */}
          <section className={CARD}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
              By the numbers
            </p>
            <div className="space-y-3">
              {STATS.map((s) => (
                <div key={s.l} className="flex items-baseline justify-between gap-3">
                  <span className="text-3xl font-bold tracking-tight" style={{ color: ACCENT }}>
                    {s.v}
                  </span>
                  <span className="text-[12px] text-black/50">{s.l}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Writing — spans 2 */}
          <section className={`${CARD} md:col-span-2`}>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
                Latest writing
              </p>
              <span className="text-[12px] font-semibold" style={{ color: ACCENT }}>
                All articles →
              </span>
            </div>
            <div className="divide-y divide-black/[0.07]">
              {ARTICLES.map((a) => (
                <div key={a.n} className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0">
                  <span className="mt-0.5 rounded-md bg-black/[0.05] px-2 py-1 text-[10px] font-semibold text-black/50">
                    {a.pillar}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-snug tracking-tight">
                      {a.title}
                    </p>
                    <p className="mt-1 text-[12px] text-black/45">
                      {a.date} · {a.read}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Stack card */}
          <section className={CARD}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
              Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STACK.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-black/10 bg-black/[0.02] px-2.5 py-1 text-[11px] font-medium text-black/60"
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          {/* Projects card */}
          <section className={`${CARD} md:col-span-2`}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/40">
              Selected work
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {PROJECTS.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-black/[0.07] bg-black/[0.02] p-4"
                >
                  <p className="text-[14px] font-semibold tracking-tight">{p.title}</p>
                  <p className="mt-1 text-[12px] text-black/50">{p.sub}</p>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ color: ACCENT }}>
                    {p.tag}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA card — dark */}
          <section className="flex flex-col justify-between rounded-3xl bg-[#111113] p-7 text-white">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/40">
                Newsletter
              </p>
              <p className="mt-3 text-[19px] font-semibold leading-[1.3] tracking-tight">
                Weekly notes on architecture and delivery.
              </p>
            </div>
            <div className="mt-6 rounded-full bg-white/10 px-4 py-3 text-[13px] text-white/50">
              your@email.com
            </div>
          </section>
        </div>

        <p className="mt-10 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
          Direction E · Bento Grid
        </p>
      </main>
    </div>
  )
}
