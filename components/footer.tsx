import Link from 'next/link'
import { FadeUp, StaggerContainer, StaggerItem } from '@/components/scroll-reveal'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/resources', label: 'Resources' },
  { href: '/projects', label: 'Projects' },
  { href: '/speaking', label: 'Speaking' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: 'https://linkedin.com/in/neelbanker', label: 'LinkedIn ↗', external: true },
  { href: 'https://github.com/neelbanker', label: 'GitHub ↗', external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-background">
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr]">

          {/* Left: identity + tagline */}
          <FadeUp>
            <div>
              <p className="font-extrabold text-4xl sm:text-5xl tracking-tighter uppercase mb-3">
                Neel Banker
              </p>
              <p className="mb-8 font-mono text-xs uppercase tracking-widest text-muted-foreground italic">
                Senior Blockchain Architect · Ahmedabad, India
              </p>
              <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">
                Architecture for blockchain, AI-native systems, and technical organizations that need calm technical direction when complexity is already high.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Blockchain architecture', 'AI-augmented engineering', 'Leadership and delivery'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-11 items-center border border-border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:border-primary/40 hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-8 font-semibold text-xl uppercase tracking-tight text-primary sm:text-2xl">
                Building systems with staying power.
              </p>
            </div>
          </FadeUp>

          {/* Right: links + copyright */}
          <FadeUp delay={0.1}>
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">Navigate</p>
                <StaggerContainer className="grid gap-px bg-border sm:grid-cols-2">
                {navLinks.map(({ href, label, external }, index) => (
                  <StaggerItem
                    key={href}
                    className={index === navLinks.length - 1 ? 'sm:col-span-2' : undefined}
                  >
                    <Link
                      href={href}
                      className="flex min-h-14 cursor-pointer items-center bg-background px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-5"
                      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {label}
                    </Link>
                  </StaggerItem>
                ))}
                </StaggerContainer>
              </div>
              <p className="mt-10 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                © {new Date().getFullYear()} Neel Banker — Proof of Work
              </p>
            </div>
          </FadeUp>

        </div>
      </div>
    </footer>
  )
}
