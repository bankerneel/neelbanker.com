import { HERO_LOGOS } from '@/components/hero-logos'

const SIGNAL_DOTS = [
  { x: 14, y: 22, color: 'rgba(163,230,53,0.6)' },
  { x: 24, y: 74, color: 'rgba(56,189,248,0.5)' },
  { x: 82, y: 30, color: 'rgba(56,189,248,0.6)' },
  { x: 86, y: 66, color: 'rgba(251,146,60,0.5)' },
]

/**
 * Desktop-only ambient constellation behind the hero copy.
 * Pure CSS animation (float + entrance) — no framer-motion, no pointer work.
 * Loaded lazily on desktop only via HeroConstellationLazy.
 */
export function HeroConstellation() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Two soft ambient blobs */}
      <div className="absolute inset-y-[-12%] left-[-10%] w-[34%]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(163,230,53,0.09)_0%,_rgba(163,230,53,0.03)_26%,_transparent_72%)] blur-3xl" />
      </div>
      <div className="absolute inset-y-[-16%] right-[-8%] w-[38%]">
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.10)_0%,_rgba(56,189,248,0.04)_24%,_transparent_70%)] blur-3xl" />
      </div>

      {/* Faint connective paths */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.07] text-foreground" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 180C180 200 250 300 430 320C600 340 760 250 920 260C1090 272 1190 360 1436 330" stroke="currentColor" strokeWidth="1" fill="none" />
        <path d="M24 480C190 430 290 520 470 500C640 480 740 390 910 395C1080 400 1200 470 1400 430" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>

      {/* Signal dots */}
      {SIGNAL_DOTS.map((dot) => (
        <div
          key={`${dot.x}-${dot.y}`}
          className="absolute h-2 w-2 animate-pulse rounded-full"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, background: dot.color }}
        />
      ))}

      {/* Side divider lines */}
      <div className="absolute inset-y-0 left-[32%] w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-40" />
      <div className="absolute inset-y-0 right-[32%] w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-40" />

      {/* Floating logo constellation */}
      {HERO_LOGOS.map((logo) => (
        <div
          key={logo.label}
          className="hero-badge-in group pointer-events-auto absolute"
          style={
            {
              left: `${logo.x}%`,
              top: `${logo.y}%`,
              width: logo.size,
              height: logo.size,
              color: logo.color,
              '--badge-delay': `${logo.delay + 0.2}s`,
            } as React.CSSProperties
          }
        >
          <div
            className="hero-float h-full w-full"
            style={
              {
                '--fx': logo.fx,
                '--fy': logo.fy,
                '--fdur': `${logo.fdur}s`,
                '--fdelay': `${logo.delay}s`,
              } as React.CSSProperties
            }
          >
            <div className="relative h-full w-full transition-transform duration-200 group-hover:scale-[1.16]">
              <div
                className="absolute inset-0 scale-110 rounded-full opacity-[0.14] blur-md transition-opacity duration-300 group-hover:opacity-70"
                style={{ background: logo.color }}
              />
              <div className="relative h-full w-full transition-[filter] duration-200 group-hover:brightness-125">
                <logo.Icon />
              </div>
              <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  {logo.label}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
