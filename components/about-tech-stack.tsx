import { Brain, Cloud, Layers, Server, Shield, Wrench } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pick, softTilts } from '@/components/bazaar/styles'

const categories = [
  {
    label: 'Blockchain & Distributed Systems',
    Icon: Layers,
    tone: 'tone-sage',
    summary: 'Protocol design, L2 delivery, multi-chain architecture, and contract execution layers.',
    signal: '10 systems',
    items: ['Ethereum', 'Hyperledger Fabric', 'Solana', 'Polygon', 'OP Stack / L2', 'Arbitrum', 'Solidity', 'Base', 'Hyperledger Besu', 'SKALE'],
  },
  {
    label: 'AI & ML',
    Icon: Brain,
    tone: 'tone-sky',
    summary: 'Practical AI tooling for engineering acceleration, retrieval workflows, and multi-model systems.',
    signal: '5 workflows',
    items: ['Claude API', 'LangChain', 'Chroma (Vector DB)', 'GPT4All / LlamaCpp', 'Multi-model Workflows'],
  },
  {
    label: 'Custody & Security',
    Icon: Shield,
    tone: 'tone-rose',
    summary: 'Wallet infrastructure, security boundaries, HSM-backed systems, and account abstraction rails.',
    signal: '5 custody rails',
    items: ['Fireblocks (Non-Custodial)', 'BitGo', 'AWS CloudHSM', 'Account Abstraction (ERC-4337)', 'WalletConnect'],
  },
  {
    label: 'Backend & APIs',
    Icon: Server,
    tone: 'tone-butter',
    summary: 'Service design, API contracts, monorepo systems, and event-driven backend execution.',
    signal: '7 backend tools',
    items: ['Node.js', 'NestJS', 'Go', 'Python (Django, Flask)', 'TypeScript', 'Nx Monorepo', 'WebSocket / Noise'],
  },
  {
    label: 'Infrastructure & Cloud',
    Icon: Cloud,
    tone: 'tone-lilac',
    summary: 'Deployment surfaces, orchestration, databases, and operating environments for production systems.',
    signal: '6 infra layers',
    items: ['AWS (EKS, S3, IAM)', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'CouchDB'],
  },
  {
    label: 'Tools & Process',
    Icon: Wrench,
    tone: 'tone-terra',
    summary: 'Delivery standards, smart contract tooling, and the systems that keep teams shipping sanely.',
    signal: '5 delivery tools',
    items: ['Hardhat', 'Truffle', 'Jira / Confluence', 'GitHub / GitLab', 'Husky / ESLint'],
  },
]

const summary = [
  ['6', 'capability lanes'],
  ['38', 'named tools, grouped'],
]

/** The capability map: six labelled index cards, each with a coloured header tab. */
export function AboutTechStack() {
  return (
    <div>
      <ul className="flex flex-wrap gap-4">
        {summary.map(([value, label], i) => (
          <li
            key={label}
            className={cn(
              'tone-panel flex items-baseline gap-2 border-2 border-current px-4 py-2.5 shadow-hard',
              i ? 'rotate-[1.5deg]' : '-rotate-2',
            )}
          >
            <span className="text-2xl font-black leading-none">{value}</span>
            <span className="hand text-[1.25rem] leading-none text-dm-accent-ink">{label}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((cat, i) => (
          <li
            key={cat.label}
            className={cn(
              'tone-panel flex flex-col border-2 border-current shadow-hard transition-[rotate] duration-200 hover:rotate-0',
              pick(softTilts, i),
            )}
          >
            <div className={cn('flex items-center justify-between gap-3 border-b-2 border-dm-ink px-5 py-3', cat.tone)}>
              <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                <cat.Icon size={16} aria-hidden="true" />
                {cat.label}
              </p>
              <span className="hand shrink-0 text-[1.15rem] leading-none">{cat.signal}</span>
            </div>
            <div className="flex flex-1 flex-col gap-5 px-5 py-5">
              <p className="text-[15px] leading-[1.65] text-dm-ink-soft">{cat.summary}</p>
              <ul aria-label={`${cat.label} tools`} className="mt-auto flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="border border-current/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.1em]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
