const NAV = ['Writing', 'Projects', 'Resources', 'About']

const ARTICLES = [
  {
    n: '01',
    pillar: 'Blockchain',
    date: 'Apr 03, 2026',
    title: 'Designing a Staking Contract That Will Not Get Exploited',
    excerpt:
      'Most staking bugs are not exotic. They come from predictable mistakes in reward math, withdrawal flow, upgradeability, and trust boundaries.',
  },
  {
    n: '02',
    pillar: 'Leadership',
    date: 'Apr 01, 2026',
    title: 'Why I Stopped Writing Smart Contracts Before Auditing Them',
    excerpt:
      'Auditing changed how I write Solidity. Once you spend enough time reading production-bound contracts for failure modes, your default design instincts change.',
  },
  {
    n: '03',
    pillar: 'Blockchain',
    date: 'Feb 18, 2026',
    title: 'L2 Chains Are Not Hard to Deploy — The Hard Part Comes After',
    excerpt:
      'Deploying an OP Stack L2 takes a week. Running one in production takes ongoing engineering. The sequencer, bridge, and oracle design are where the real work begins.',
  },
]

const STATS = [
  { v: '7+', l: 'Years Building' },
  { v: '50+', l: 'Engineers Led' },
  { v: '15+', l: 'Production Platforms' },
]

const STACK = [
  'Hyperledger Fabric',
  'OP Stack / L2',
  'Solidity',
  'ERC-4337',
  'Fireblocks',
  'BitGo',
  'Node.js',
  'Go',
]

const TAGS = ['Flutter', 'Django', 'BDK', 'Noise Protocol', 'MongoDB']

export default function RetroPrototype() {
  return (
    <div className="lab-retro lab-grain">
      {/* ── Nav ─────────────────────────────────────────── */}
      <header className="border-b-2 border-[color:var(--ink)]">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
          <span className="display text-xl">Neel Banker</span>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <span key={n} className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {n}
              </span>
            ))}
            <span className="sticker px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em]">
              Work With Me
            </span>
          </div>
        </nav>
      </header>

      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-[color:var(--ink)]">
        <div
          aria-hidden="true"
          className="lab-halftone-lg pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] text-[color:var(--accent)] opacity-70 lg:block"
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
          <div className="mb-8 flex items-center gap-4">
            <span className="h-[3px] w-14 bg-[var(--accent)]" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">
              Distributed Systems &amp; Blockchain Architect · Ahmedabad, India
            </p>
          </div>

          <h1 className="display mb-10" style={{ fontSize: 'clamp(3rem, 12vw, 11rem)' }}>
            <span className="misreg">
              <span className="misreg-ghost" aria-hidden="true">
                Building
              </span>
              Building
            </span>
            <span className="misreg">
              <span className="misreg-ghost" aria-hidden="true">
                What&apos;s Next.
              </span>
              What&apos;s Next.
            </span>
          </h1>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <p className="max-w-xl text-[17px] font-medium leading-[1.65]">
              Seven years building blockchain infrastructure, custody systems, and
              AI-augmented engineering workflows for teams shipping under real delivery
              pressure. Writing weekly about architecture, execution, and what holds up in
              production.
            </p>
            <div className="flex flex-wrap items-start gap-3">
              <span className="bg-[var(--ink)] px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--paper)]">
                Book a Call →
              </span>
              <span className="border-2 border-[color:var(--ink)] px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em]">
                Read the Writing
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack ticker ────────────────────────────────── */}
      <div className="overflow-hidden border-b-2 border-[color:var(--ink)] bg-[var(--accent)] py-3">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 px-4">
          {STACK.map((s) => (
            <span
              key={s}
              className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--paper)]"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats (inverted) ────────────────────────────── */}
      <section className="relative overflow-hidden border-b-2 border-[color:var(--ink)] bg-[var(--ink)] text-[color:var(--paper)]">
        <div
          aria-hidden="true"
          className="lab-halftone pointer-events-none absolute inset-0 text-[color:var(--paper)] opacity-20"
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3 sm:px-10">
          {STATS.map((s) => (
            <div key={s.l}>
              <p className="display text-6xl sm:text-7xl" style={{ color: 'var(--accent)' }}>
                {s.v}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] opacity-80">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Writing ─────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <h2 className="display text-4xl sm:text-5xl">Latest Writing</h2>
          <span className="shrink-0 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            All Articles →
          </span>
        </div>

        <div className="border-t-2 border-[color:var(--ink)]">
          {ARTICLES.map((a) => (
            <article
              key={a.n}
              className="grid gap-4 border-b-2 border-[color:var(--ink)] py-7 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="display text-3xl text-[color:var(--accent)]">{a.n}</span>
              <div>
                <h3 className="display mb-2 text-2xl sm:text-[1.7rem]">{a.title}</h3>
                <p className="max-w-2xl text-[15px] leading-[1.7] text-[color:var(--muted)]">
                  {a.excerpt}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-end">
                <span className="sticker px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em]">
                  {a.pillar}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted)]">
                  {a.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── Case study ──────────────────────────────────── */}
      <section className="border-t-2 border-[color:var(--ink)]">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Featured Case Study
          </p>
          <div className="grid gap-8 border-2 border-[color:var(--ink)] p-7 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="display mb-4 text-3xl sm:text-4xl">
                Project Atlas — Multi-Chain Non-Custodial Wallet
              </h3>
              <p className="max-w-xl text-[15px] leading-[1.75] text-[color:var(--muted)]">
                Production non-custodial wallet platform supporting Bitcoin (BDK/UTXO),
                Ethereum, and EVM chains. Flutter frontend, Django backend, encrypted
                WebSocket sync, and CloudFront-backed delivery.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {TAGS.map((t) => (
                  <span
                    key={t}
                    className="border border-[color:var(--rule)] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[190px] overflow-hidden bg-[var(--accent)]">
              <div
                aria-hidden="true"
                className="lab-halftone-lg absolute inset-0 text-[color:var(--ink)] opacity-45"
              />
              <span className="display absolute bottom-4 right-5 text-7xl text-[color:var(--paper)]">
                01
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────── */}
      <footer className="border-t-2 border-[color:var(--ink)] bg-[var(--ink)] text-[color:var(--paper)]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
          <p className="display text-5xl sm:text-6xl" style={{ color: 'var(--accent)' }}>
            Building systems
            <br />
            with staying power.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[color:var(--paper)] pt-6 opacity-90">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              © 2026 Neel Banker — Proof of Work
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
              Direction A · Retro Duotone
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
