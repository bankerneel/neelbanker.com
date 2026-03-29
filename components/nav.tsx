'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/about', label: 'About' },
  { href: '/writing', label: 'Writing' },
  { href: '/resources', label: 'Resources' },
  { href: '/projects', label: 'Projects' },
  { href: '/newsletter', label: 'Newsletter' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] items-center justify-between px-6 sm:px-12 py-4"
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 font-extrabold tracking-tighter text-xl uppercase text-foreground hover:text-primary transition-colors duration-200"
        >
          Neel Banker
          <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" aria-hidden="true" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-foreground',
                pathname.startsWith(href) ? 'text-foreground font-semibold' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/work-with-me"
            className="border border-primary text-primary px-4 py-1.5 font-mono text-xs uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            Work With Me
          </Link>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={cn('block w-5 h-[1.5px] bg-foreground transition-all duration-200 origin-center', open && 'rotate-45 translate-y-[6.5px]')} />
          <span className={cn('block w-5 h-[1.5px] bg-foreground transition-all duration-200', open && 'opacity-0 scale-x-0')} />
          <span className={cn('block w-5 h-[1.5px] bg-foreground transition-all duration-200 origin-center', open && '-rotate-45 -translate-y-[6.5px]')} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={cn('md:hidden overflow-hidden transition-all duration-300 ease-in-out', open ? 'max-h-96' : 'max-h-0')}>
        <div className="border-t border-border bg-background px-6 pb-6 pt-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center py-3.5 font-mono text-xs uppercase tracking-widest border-b border-border last:border-0 transition-colors duration-200',
                pathname.startsWith(href) ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/work-with-me"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center border border-primary/50 px-4 py-3 font-mono text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
          >
            Work With Me
          </Link>
        </div>
      </div>
    </header>
  )
}
