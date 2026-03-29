'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/writing', label: 'Writing' },
  { href: '/resources', label: 'Resources' },
  { href: '/projects', label: 'Projects' },
  { href: '/newsletter', label: 'Newsletter' },
]

export function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-5xl xl:max-w-6xl items-center justify-between px-4 sm:px-6 py-4"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="text-sm font-extrabold tracking-[0.14em] uppercase text-foreground hover:text-primary transition-colors duration-200"
        >
          Neel Banker
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-sm tracking-wide transition-colors duration-200 hover:text-foreground',
                pathname.startsWith(href) ? 'text-foreground font-semibold' : 'text-muted-foreground'
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/work-with-me"
            className="border border-border px-3.5 py-1.5 text-sm font-semibold tracking-wide text-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground hover:border-primary"
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
          <span
            className={cn(
              'block w-5 h-[1.5px] bg-foreground transition-all duration-200 origin-center',
              open && 'rotate-45 translate-y-[6.5px]'
            )}
          />
          <span
            className={cn(
              'block w-5 h-[1.5px] bg-foreground transition-all duration-200',
              open && 'opacity-0 scale-x-0'
            )}
          />
          <span
            className={cn(
              'block w-5 h-[1.5px] bg-foreground transition-all duration-200 origin-center',
              open && '-rotate-45 -translate-y-[6.5px]'
            )}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300 ease-in-out',
          open ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="border-t border-border bg-background px-4 sm:px-6 pb-6 pt-4">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center py-3.5 text-sm tracking-wide border-b border-border last:border-0 transition-colors duration-200',
                pathname.startsWith(href) ? 'text-foreground font-semibold' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/work-with-me"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center border border-primary/50 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
          >
            Work With Me
          </Link>
        </div>
      </div>
    </header>
  )
}
