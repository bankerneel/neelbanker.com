import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Senior Blockchain Architect with 6+ years building Web3 infrastructure, smart contracts, and AI-native systems.',
}

export default function AboutPage() {
  return (
    <>
      {/* ── Page header ──────────────────────────────────── */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-16 sm:py-20">
          <div className="mb-10 flex flex-wrap items-center gap-3">
            <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              ← Home
            </Link>
            <span className="text-muted-foreground text-xs">/</span>
            <Link href="/work-with-me" className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary">
              Work With Me
            </Link>
          </div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Senior Blockchain Architect · Ahmedabad, India
          </p>
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tighter leading-[0.9] mb-6">
            About Neel
          </h1>
          <p className="text-base text-muted-foreground leading-[1.7] max-w-xl">
            6+ years designing smart contracts, custody infrastructure, and AI-native Web3 systems.
          </p>
        </div>
      </section>

      {/* ── Prose content ────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-6 sm:px-12 py-12 sm:py-16">
        <div className="prose prose-invert prose-zinc max-w-none">
          <p>
            I&apos;m Neel Banker — a Senior Blockchain Architect based in Ahmedabad, India. I design and ship distributed systems at the
            intersection of blockchain infrastructure, AI, and product engineering.
          </p>
          <h2>What I Do</h2>
          <p>
            My core work is designing custody infrastructure, smart contract systems, and Web3 backends that handle real money and real
            users. I&apos;ve worked across Ethereum, Polygon, Base, and Arbitrum — building everything from ERC-4337 account abstraction
            systems to multi-chain custody platforms using Fireblocks and BitGo.
          </p>
          <p>
            More recently, I&apos;ve been building at the intersection of AI and Web3: agents that can reason about on-chain state, execute
            transactions within policy constraints, and surface insights from blockchain data.
          </p>
          <h2>Tech</h2>
          <p>
            Solidity · ERC-4337 Account Abstraction · Fireblocks · BitGo · ethers.js · Node.js · Nest.js · Angular · PostgreSQL · AWS
          </p>
          <h2>Beyond Work</h2>
          <p>
            I run <a href="https://hindustanecolife.com" target="_blank" rel="noopener noreferrer">Hindustan Ecolife</a> — a nature and eco product business — as a side project. It keeps me honest about the full product stack: not just the backend, but the customer experience end to end.
          </p>
          <h2>Writing</h2>
          <p>
            I write <em>The Architect&apos;s Brief</em> — a weekly newsletter covering blockchain architecture, AI × Web3, and engineering
            leadership. If you build distributed systems or lead technical teams, it&apos;s for you.
          </p>
        </div>
      </div>
    </>
  )
}
