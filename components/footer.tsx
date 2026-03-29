import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="mx-auto max-w-5xl xl:max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-2xl font-extrabold tracking-tight uppercase">Neel Banker</p>
            <p className="mt-1 text-sm text-muted-foreground">Senior Blockchain Architect · Ahmedabad, India</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/writing" className="hover:text-foreground transition-colors">Writing</Link>
            <Link href="/resources" className="hover:text-foreground transition-colors">Resources</Link>
            <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <Link href="/newsletter" className="hover:text-foreground transition-colors">Newsletter</Link>
            <Link href="/work-with-me" className="hover:text-foreground transition-colors">Work With Me</Link>
            <Link href="https://linkedin.com/in/neelbanker" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">LinkedIn ↗</Link>
            <Link href="https://github.com/neelbanker" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">GitHub ↗</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} Neel Banker. All rights reserved.</p>
          <p className="text-xs text-muted-foreground font-mono tracking-widest uppercase">Building what&apos;s next.</p>
        </div>
      </div>
    </footer>
  )
}
