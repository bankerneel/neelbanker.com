import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Senior Blockchain Architect with 6+ years building Web3 infrastructure, smart contracts, and AI-native systems.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">About</h1>
      <div className="prose prose-invert prose-zinc max-w-none">
        <p>
          I'm Neel Banker — a Senior Blockchain Architect based in Ahmedabad, India. I design and ship distributed systems at the intersection of blockchain infrastructure, AI, and product engineering.
        </p>
        <h2>What I Do</h2>
        <p>
          My core work is designing custody infrastructure, smart contract systems, and Web3 backends that handle real money and real users. I've worked across Ethereum, Polygon, Base, and Arbitrum — building everything from ERC-4337 account abstraction systems to multi-chain custody platforms using Fireblocks and BitGo.
        </p>
        <p>
          More recently, I've been building at the intersection of AI and Web3: agents that can reason about on-chain state, execute transactions within policy constraints, and surface insights from blockchain data.
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
          I write <em>The Architect's Brief</em> — a weekly newsletter covering blockchain architecture, AI × Web3, and engineering leadership. If you build distributed systems or lead technical teams, it's for you.
        </p>
      </div>
    </div>
  )
}
