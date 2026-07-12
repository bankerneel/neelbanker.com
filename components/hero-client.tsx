import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'
import { HeroConstellationLazy } from '@/components/hero-constellation-lazy'
import { HERO_LOGOS } from '@/components/hero-logos'

const highlightCards = [
  { label: 'Current Focus', value: 'L2, Custody, AI Delivery' },
  { label: 'Operating Mode', value: 'Architecture + Team Systems' },
  { label: 'Base', value: 'Ahmedabad · Global Projects' },
]

export function HeroClient() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-background" />

      {/* Subtle dot-grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.45,
        }}
      />

      {/* Film-grain texture — static, tactile depth without extra motion */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '180px 180px',
        }}
      />

      {/* Desktop-only ambient constellation — lazy, never loads on mobile */}
      <div className="hidden lg:block">
        <HeroConstellationLazy />
      </div>

      {/* Center-weighted vignette so background sits behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            'radial-gradient(ellipse 42% 60% at 50% 48%, transparent 0%, transparent 52%, hsl(var(--background) / 0.9) 80%, hsl(var(--background)) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 py-20 sm:px-12 md:py-28">
        <div className="max-w-3xl">
          {/* Left scrim keeps copy legible over the constellation */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[10%] hidden h-[72%] w-[56%] lg:block"
            style={{
              background:
                'linear-gradient(90deg, hsl(var(--background) / 0.96) 0%, hsl(var(--background) / 0.82) 48%, transparent 100%)',
            }}
          />

          <div className="hero-fade-up mb-8 flex max-w-full items-start gap-3">
            <span className="mt-2 h-px w-8 shrink-0 bg-gradient-to-r from-primary/80 to-transparent" aria-hidden="true" />
            <p className="min-w-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Distributed Systems &amp; Blockchain Architect · Ahmedabad, India
            </p>
          </div>

          <h1
            className="mb-12 font-extrabold uppercase leading-[0.85] tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 10rem)' }}
          >
            <span className="hero-word" style={{ '--word-delay': '0.15s' } as React.CSSProperties}>
              Building
            </span>
            <span className="hero-word italic text-stroke" style={{ '--word-delay': '0.3s' } as React.CSSProperties}>
              What&apos;s
            </span>
            <span className="hero-word" style={{ '--word-delay': '0.45s' } as React.CSSProperties}>
              Next.
            </span>
          </h1>

          <div className="hero-fade-up max-w-[440px]" style={{ '--fade-delay': '0.6s' } as React.CSSProperties}>
            <p className="mb-8 text-[17px] leading-[1.7] text-muted-foreground">
              Seven years building blockchain infrastructure, custody systems, and AI-augmented
              engineering workflows for teams shipping under real delivery pressure. Writing weekly
              about architecture, execution, and what holds up in production.
            </p>
            <div className="rounded-sm">
              <NewsletterForm />
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Free · Weekly · No Spam
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work-with-me"
                className="inline-flex cursor-pointer items-center bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Book a Call →
              </Link>
              <Link
                href="/about"
                className="inline-flex cursor-pointer items-center border border-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                About Neel →
              </Link>
            </div>
          </div>

          <div
            className="hero-fade-up mt-10 grid gap-px bg-border sm:grid-cols-3"
            style={{ '--fade-delay': '0.8s' } as React.CSSProperties}
          >
            {highlightCards.map((item) => (
              <div key={item.label} className="group relative bg-background/90 px-4 py-4 backdrop-blur-sm sm:px-5">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-70" />
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {item.label}
                </p>
                <p className="text-sm font-semibold uppercase tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: compact static signal band */}
      <div className="relative z-10 mt-12 select-none px-6 pb-4 lg:hidden">
        <div className="border border-border bg-background/70 px-4 py-4 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Tech stack
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">In production</p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {HERO_LOGOS.map((logo) => (
              <div key={logo.label} className="border border-border bg-background/80 px-2 py-2.5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div style={{ width: 20, height: 20, color: logo.color }}>
                    <logo.Icon />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: logo.color }} />
                </div>
                <span className="block truncate font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
                  {logo.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
