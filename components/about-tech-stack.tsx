'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Layers, Brain, Shield, Server, Cloud, Wrench } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as const

const categories = [
  {
    label: 'Blockchain & Distributed Systems',
    Icon: Layers,
    color: '#627EEA',
    items: [
      { name: 'Ethereum', color: '#627EEA' },
      { name: 'Hyperledger Fabric', color: '#2D9CDB' },
      { name: 'Solana', color: '#9945FF' },
      { name: 'Polygon', color: '#8247E5' },
      { name: 'OP Stack / L2', color: '#FF0420' },
      { name: 'Arbitrum', color: '#28A0F0' },
      { name: 'Solidity', color: '#c8c8c8' },
      { name: 'Base', color: '#0052FF' },
      { name: 'Hyperledger Besu', color: '#2D9CDB' },
      { name: 'SKALE', color: '#00D4FF' },
    ],
  },
  {
    label: 'AI & ML',
    Icon: Brain,
    color: '#D4A574',
    items: [
      { name: 'Claude API', color: '#D4A574' },
      { name: 'LangChain', color: '#10a37f' },
      { name: 'Chroma (Vector DB)', color: '#2D9CDB' },
      { name: 'GPT4All / LlamaCpp', color: '#888888' },
      { name: 'Multi-model Workflows', color: '#E8A838' },
    ],
  },
  {
    label: 'Custody & Security',
    Icon: Shield,
    color: '#FF6600',
    items: [
      { name: 'Fireblocks NCW', color: '#FF6600' },
      { name: 'BitGo', color: '#F7931A' },
      { name: 'AWS CloudHSM', color: '#FF9900' },
      { name: 'ERC-4337 AA', color: '#E8A838' },
      { name: 'WalletConnect', color: '#3B99FC' },
    ],
  },
  {
    label: 'Backend & APIs',
    Icon: Server,
    color: '#68A063',
    items: [
      { name: 'Node.js', color: '#68A063' },
      { name: 'NestJS', color: '#E0234E' },
      { name: 'Go', color: '#00ADD8' },
      { name: 'Python (Django, Flask)', color: '#3776AB' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Nx Monorepo', color: '#143157' },
      { name: 'WebSocket / Noise', color: '#888888' },
    ],
  },
  {
    label: 'Infrastructure & Cloud',
    Icon: Cloud,
    color: '#FF9900',
    items: [
      { name: 'AWS (EKS, S3, IAM)', color: '#FF9900' },
      { name: 'Docker', color: '#2496ED' },
      { name: 'Kubernetes', color: '#326CE5' },
      { name: 'MongoDB', color: '#47A248' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'CouchDB', color: '#E42528' },
    ],
  },
  {
    label: 'Tools & Process',
    Icon: Wrench,
    color: '#FFC517',
    items: [
      { name: 'Hardhat', color: '#FFC517' },
      { name: 'Truffle', color: '#5E4694' },
      { name: 'Jira / Confluence', color: '#0052CC' },
      { name: 'GitHub / GitLab', color: '#888888' },
      { name: 'Husky / ESLint', color: '#4B32C3' },
    ],
  },
]

export function AboutTechStack() {
  const reduced = useReducedMotion()

  return (
    <div className="space-y-8">
      {categories.map((cat, ci) => (
        <motion.div
          key={cat.label}
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={reduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: ci * 0.08, ease }}
        >
          {/* Category header */}
          <div className="flex items-center gap-2 mb-3">
            <cat.Icon size={13} style={{ color: cat.color }} aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {cat.label}
            </span>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {cat.items.map((item, ii) => (
              <motion.span
                key={item.name}
                initial={reduced ? false : { opacity: 0, scale: 0.92 }}
                whileInView={reduced ? {} : { opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: ci * 0.08 + ii * 0.04,
                  ease,
                }}
                className="flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-foreground transition-colors duration-200 cursor-default"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: item.color }}
                  aria-hidden="true"
                />
                {item.name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
