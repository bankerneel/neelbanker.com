import Link from 'next/link'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/resources', label: 'Resources' },
  { href: '/projects', label: 'Projects' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/work-with-me', label: 'Work With Me' },
  { href: 'https://linkedin.com/in/neelbanker', label: 'LinkedIn ↗', external: true },
  { href: 'https://github.com/neelbanker', label: 'GitHub ↗', external: true },
]

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-background">
      <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left: identity + tagline */}
          <div>
            <p className="font-extrabold text-4xl sm:text-5xl tracking-tighter uppercase mb-3">
              Neel Banker
            </p>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground italic mb-10">
              Senior Blockchain Architect · Ahmedabad, India
            </p>
            <p className="font-extrabold text-2xl uppercase tracking-tight text-primary">
              Building What&apos;s Next.
            </p>
          </div>

          {/* Right: links + copyright */}
          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="flex flex-col items-start md:items-end gap-3 mb-10">
              {navLinks.map(({ href, label, external }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-mono text-xs text-muted-foreground hover:text-primary underline decoration-primary/30 underline-offset-4 transition-colors"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {label}
                </Link>
              ))}
            </div>
            <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
              © {new Date().getFullYear()} Neel Banker — Proof of Work
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
