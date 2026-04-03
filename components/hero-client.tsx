'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'

// ── Inline SVG tech logos ─────────────────────────────────────────────────
const EthereumIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 2L6 16.5L16 21.5L26 16.5L16 2Z" fill="currentColor" opacity="0.9"/>
    <path d="M16 21.5L6 16.5L16 30L26 16.5L16 21.5Z" fill="currentColor" opacity="0.6"/>
    <path d="M16 2L16 21.5L26 16.5L16 2Z" fill="currentColor" opacity="0.7"/>
    <path d="M16 21.5L16 30L26 16.5L16 21.5Z" fill="currentColor" opacity="0.4"/>
  </svg>
)

const PolygonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M21.5 11.5L16 8L10.5 11.5V18.5L16 22L21.5 18.5V11.5Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 8L10.5 11.5L16 15L21.5 11.5L16 8Z" fill="currentColor"/>
    <path d="M10.5 11.5V18.5L16 22V15L10.5 11.5Z" fill="currentColor" opacity="0.7"/>
    <path d="M21.5 11.5L16 15V22L21.5 18.5V11.5Z" fill="currentColor" opacity="0.5"/>
    <circle cx="16" cy="4" r="2" fill="currentColor"/>
    <circle cx="6" cy="21" r="2" fill="currentColor"/>
    <circle cx="26" cy="21" r="2" fill="currentColor"/>
    <line x1="16" y1="6" x2="10.5" y2="11.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="16" y1="6" x2="21.5" y2="11.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="20.1" x2="10.5" y2="18.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="24" y1="20.1" x2="21.5" y2="18.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const OpenAIIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 4.5C12.5 4.5 9.5 6.5 8 9.5C6.2 9.8 4.5 10.8 3.5 12.3C1.5 15.5 2 19.5 4.3 22C3.8 23.8 4 25.7 5 27.2C7 30.4 11 31.5 14.3 30.1C15.4 31 16.7 31.5 18.1 31.5C21.6 31.5 24.6 29.5 26.1 26.5C27.9 26.2 29.6 25.2 30.6 23.7C32.6 20.5 32.1 16.5 29.8 14C30.3 12.2 30.1 10.3 29.1 8.8C27.1 5.6 23.1 4.5 19.8 5.9C18.7 5 17.4 4.5 16 4.5Z" fill="currentColor"/>
    <path d="M16 10.5V21.5M11.5 13V19M20.5 13V19M9 16.5H23" stroke="hsl(var(--background))" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const SolidityIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <polygon points="16,8 22,11.5 22,18.5 16,22 10,18.5 10,11.5" fill="currentColor" opacity="0.3"/>
    <text x="16" y="19" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="monospace">S</text>
  </svg>
)

const BaseIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor"/>
    <path d="M16 7C11 7 7 11 7 16C7 21 11 25 16 25C20.4 25 24 21.8 24.7 17.5H16V14.5H27.9C27.97 15 28 15.5 28 16C28 22.6 22.6 28 16 28C9.4 28 4 22.6 4 16C4 9.4 9.4 4 16 4V7Z" fill="hsl(var(--background))"/>
  </svg>
)

const NodejsIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">node</text>
  </svg>
)

const TypeScriptIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor"/>
    <path d="M17.5 16.5V24H15V16.5H11.5V14H21V16.5H17.5Z" fill="hsl(var(--background))"/>
    <path d="M22 21.5C22.5 22.2 23.3 22.5 24.5 22.5C25.7 22.5 26.5 22 26.5 21.2C26.5 20.4 25.9 20 24.5 19.6C22.5 19 21.5 18.2 21.5 16.8C21.5 15.3 22.7 14.2 24.7 14.2C25.8 14.2 26.8 14.5 27.5 15.1L26.5 16.7C26 16.2 25.4 15.9 24.7 15.9C23.7 15.9 23.2 16.3 23.2 16.9C23.2 17.5 23.7 17.8 25 18.2C27 18.8 28 19.7 28 21.2C28 22.8 26.8 24 24.5 24C23.1 24 21.9 23.6 21 22.9L22 21.5Z" fill="hsl(var(--background))"/>
  </svg>
)

const FireblocksIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 7C13 11 11 14 13 17C14 14 17 13.5 17 13.5C16 16 18 19 16 25C19 22 21 18 19 14C21 15 22 17 22 19C24 16 23 10 16 7Z" fill="currentColor"/>
  </svg>
)

const ArbitrumIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 7L22 21H10L16 7Z" fill="currentColor"/>
    <path d="M13 16L16 9L19 16H13Z" fill="hsl(var(--background))" opacity="0.5"/>
  </svg>
)

const ClaudeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 12C10 9.8 11.8 8 14 8C16.2 8 18 9.8 18 12V16C18 18.2 16.2 20 14 20C11.8 20 10 18.2 10 16V12Z" fill="currentColor"/>
    <path d="M14 20L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 12L22 12C23.1 12 24 12.9 24 14V18C24 19.1 23.1 20 22 20L18 20" fill="currentColor" opacity="0.6"/>
  </svg>
)

const ReactIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 16 16)"/>
    <circle cx="16" cy="16" r="2.5" fill="currentColor"/>
  </svg>
)

const AAIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="12" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">4337</text>
  </svg>
)

// ── Logo constellation data ───────────────────────────────────────────────
interface TechLogo {
  label: string
  color: string
  Icon: React.FC
  size: number
  x: number
  y: number
  delay: number
  floatAmplitude: number
  floatDuration: number
}

const TECH_LOGOS: TechLogo[] = [
  { label: 'Ethereum', color: '#627EEA', Icon: EthereumIcon, size: 52, x: 15, y: 8, delay: 0, floatAmplitude: 8, floatDuration: 4.2 },
  { label: 'Polygon', color: '#8247E5', Icon: PolygonIcon, size: 44, x: 72, y: 22, delay: 0.3, floatAmplitude: 10, floatDuration: 5.1 },
  { label: 'OpenAI', color: '#10a37f', Icon: OpenAIIcon, size: 48, x: 48, y: 5, delay: 0.6, floatAmplitude: 7, floatDuration: 3.8 },
  { label: 'Solidity', color: '#d0d0d0', Icon: SolidityIcon, size: 38, x: 85, y: 55, delay: 0.2, floatAmplitude: 9, floatDuration: 4.7 },
  { label: 'Base', color: '#0052FF', Icon: BaseIcon, size: 42, x: 8, y: 62, delay: 0.8, floatAmplitude: 6, floatDuration: 5.5 },
  { label: 'Node.js', color: '#68A063', Icon: NodejsIcon, size: 40, x: 60, y: 72, delay: 0.4, floatAmplitude: 11, floatDuration: 4.0 },
  { label: 'TypeScript', color: '#3178C6', Icon: TypeScriptIcon, size: 36, x: 28, y: 80, delay: 1.0, floatAmplitude: 8, floatDuration: 4.9 },
  { label: 'Fireblocks', color: '#FF6600', Icon: FireblocksIcon, size: 46, x: 80, y: 8, delay: 0.5, floatAmplitude: 9, floatDuration: 5.8 },
  { label: 'Arbitrum', color: '#28A0F0', Icon: ArbitrumIcon, size: 38, x: 5, y: 35, delay: 0.7, floatAmplitude: 7, floatDuration: 4.3 },
  { label: 'Claude', color: '#D4A574', Icon: ClaudeIcon, size: 44, x: 88, y: 75, delay: 0.9, floatAmplitude: 10, floatDuration: 6.0 },
  { label: 'React', color: '#61DAFB', Icon: ReactIcon, size: 40, x: 42, y: 88, delay: 1.2, floatAmplitude: 8, floatDuration: 5.2 },
  { label: 'ERC-4337', color: '#E8A838', Icon: AAIcon, size: 36, x: 18, y: 50, delay: 0.15, floatAmplitude: 12, floatDuration: 4.6 },
]

// ── Floating badge component ──────────────────────────────────────────────
function TechBadge({ logo, shouldAnimate }: { logo: TechLogo; shouldAnimate: boolean }) {
  const floatY = shouldAnimate ? [0, -logo.floatAmplitude, 0] : [0]
  const floatX = shouldAnimate ? [0, logo.floatAmplitude * 0.3, 0] : [0]

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${logo.x}%`,
        top: `${logo.y}%`,
        width: logo.size,
        height: logo.size,
        color: logo.color,
      }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: logo.delay + 0.8,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="w-full h-full relative group"
        animate={shouldAnimate ? { y: floatY, x: floatX } : {}}
        transition={shouldAnimate ? {
          duration: logo.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: logo.delay,
        } : {}}
        title={logo.label}
      >
        {/* glow halo */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-25 scale-110 group-hover:opacity-50 transition-opacity duration-500"
          style={{ background: logo.color }}
        />
        <logo.Icon />
        {/* tooltip */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            {logo.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Animated heading word ─────────────────────────────────────────────────
function HeroWord({
  children,
  delay,
  italic = false,
}: {
  children: React.ReactNode
  delay: number
  italic?: boolean
}) {
  return (
    <motion.span
      className={`block${italic ? ' italic text-stroke' : ''}`}
      initial={{ opacity: 0, y: 40, skewY: 2 }}
      animate={{ opacity: 1, y: 0, skewY: 0 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

// ── Main exported hero ────────────────────────────────────────────────────
export function HeroClient() {
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced

  return (
    <section className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-20 md:py-28 relative overflow-hidden border-b border-border">
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

      {/* Radial vignette to fade the dot-grid on the left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 80% at 30% 50%, transparent 20%, hsl(var(--background)) 80%)',
        }}
      />

      <div className="relative flex flex-col lg:flex-row justify-between items-start gap-12">
        {/* ── Left: text content ─────────────────────────────── */}
        <div className="flex-1 z-10">
          <motion.p
            className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground mb-8"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            Senior Blockchain Architect · Ahmedabad, India
          </motion.p>

          <h1
            className="font-extrabold uppercase leading-[0.85] tracking-tighter mb-12"
            style={{ fontSize: 'clamp(3rem, 9vw, 10rem)' }}
          >
            <HeroWord delay={0.2}>Building</HeroWord>
            <HeroWord delay={0.35} italic>What&apos;s</HeroWord>
            <HeroWord delay={0.5}>Next.</HeroWord>
          </h1>

          <motion.div
            className="max-w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-base leading-[1.7] text-muted-foreground mb-8">
              6+ years designing smart contracts, custody infrastructure, and AI-native Web3 systems.
              Writing weekly on the future of decentralised tech.
            </p>
            <NewsletterForm />
            <p className="font-mono text-[10px] text-muted-foreground mt-3 tracking-widest uppercase">
              Free · Weekly · No Spam
            </p>
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center border border-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer focus-visible:ring-2 focus-visible:ring-primary"
              >
                About Neel →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ── Right: tech logo constellation ─────────────────── */}
        <div
          aria-hidden="true"
          className="relative hidden lg:block shrink-0 pointer-events-none select-none"
          style={{ width: '48%', height: '500px' }}
        >
          {/* Faint connecting lines — decorative */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <line x1="15%" y1="8%" x2="48%" y2="5%" stroke="currentColor" strokeWidth="1"/>
            <line x1="48%" y1="5%" x2="80%" y2="8%" stroke="currentColor" strokeWidth="1"/>
            <line x1="80%" y1="8%" x2="72%" y2="22%" stroke="currentColor" strokeWidth="1"/>
            <line x1="85%" y1="55%" x2="72%" y2="22%" stroke="currentColor" strokeWidth="1"/>
            <line x1="88%" y1="75%" x2="85%" y2="55%" stroke="currentColor" strokeWidth="1"/>
            <line x1="60%" y1="72%" x2="88%" y2="75%" stroke="currentColor" strokeWidth="1"/>
            <line x1="42%" y1="88%" x2="60%" y2="72%" stroke="currentColor" strokeWidth="1"/>
            <line x1="28%" y1="80%" x2="42%" y2="88%" stroke="currentColor" strokeWidth="1"/>
            <line x1="8%" y1="62%" x2="28%" y2="80%" stroke="currentColor" strokeWidth="1"/>
            <line x1="5%" y1="35%" x2="8%" y2="62%" stroke="currentColor" strokeWidth="1"/>
            <line x1="18%" y1="50%" x2="5%" y2="35%" stroke="currentColor" strokeWidth="1"/>
            <line x1="15%" y1="8%" x2="18%" y2="50%" stroke="currentColor" strokeWidth="1"/>
          </svg>

          {TECH_LOGOS.map((logo) => (
            <TechBadge key={logo.label} logo={logo} shouldAnimate={shouldAnimate} />
          ))}

          {/* Central label */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60 block">
              The Stack
            </span>
          </motion.div>
        </div>
      </div>

      {/* Mobile: horizontal logo strip ────────────────────────── */}
      <motion.div
        className="flex lg:hidden flex-wrap gap-4 mt-10 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        {TECH_LOGOS.slice(0, 8).map((logo) => (
          <div
            key={logo.label}
            className="flex items-center gap-1.5"
            title={logo.label}
          >
            <div style={{ width: 22, height: 22, color: logo.color }}>
              <logo.Icon />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              {logo.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
