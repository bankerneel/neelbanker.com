import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="font-mono text-sm font-bold">NB</p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Neel Banker. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="https://linkedin.com/in/neelbanker" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
          <Link href="https://github.com/neelbanker" className="hover:text-foreground" target="_blank" rel="noopener noreferrer">GitHub</Link>
          <Link href="/newsletter" className="hover:text-foreground">Newsletter</Link>
        </div>
      </div>
    </footer>
  )
}
