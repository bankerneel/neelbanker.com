import { Brain, Cloud, Layers, Server, Shield, Wrench } from 'lucide-react'

const categories = [
  {
    label: 'Blockchain & Distributed Systems',
    Icon: Layers,
    accent: 'bg-primary',
    tint: 'text-primary',
    summary: 'Protocol design, L2 delivery, multi-chain architecture, and contract execution layers.',
    signal: '10 systems',
    items: ['Ethereum', 'Hyperledger Fabric', 'Solana', 'Polygon', 'OP Stack / L2', 'Arbitrum', 'Solidity', 'Base', 'Hyperledger Besu', 'SKALE'],
  },
  {
    label: 'AI & ML',
    Icon: Brain,
    accent: 'bg-[hsl(190_100%_52%)]',
    tint: 'text-[hsl(190_100%_52%)]',
    summary: 'Practical AI tooling for engineering acceleration, retrieval workflows, and multi-model systems.',
    signal: '5 workflows',
    items: ['Claude API', 'LangChain', 'Chroma (Vector DB)', 'GPT4All / LlamaCpp', 'Multi-model Workflows'],
  },
  {
    label: 'Custody & Security',
    Icon: Shield,
    accent: 'bg-[hsl(25_100%_60%)]',
    tint: 'text-[hsl(25_100%_60%)]',
    summary: 'Wallet infrastructure, security boundaries, HSM-backed systems, and account abstraction rails.',
    signal: '5 custody rails',
    items: ['Fireblocks (Non-Custodial)', 'BitGo', 'AWS CloudHSM', 'Account Abstraction (ERC-4337)', 'WalletConnect'],
  },
  {
    label: 'Backend & APIs',
    Icon: Server,
    accent: 'bg-primary/80',
    tint: 'text-primary',
    summary: 'Service design, API contracts, monorepo systems, and event-driven backend execution.',
    signal: '7 backend tools',
    items: ['Node.js', 'NestJS', 'Go', 'Python (Django, Flask)', 'TypeScript', 'Nx Monorepo', 'WebSocket / Noise'],
  },
  {
    label: 'Infrastructure & Cloud',
    Icon: Cloud,
    accent: 'bg-[hsl(190_100%_52%)]/80',
    tint: 'text-[hsl(190_100%_52%)]',
    summary: 'Deployment surfaces, orchestration, databases, and operating environments for production systems.',
    signal: '6 infra layers',
    items: ['AWS (EKS, S3, IAM)', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'CouchDB'],
  },
  {
    label: 'Tools & Process',
    Icon: Wrench,
    accent: 'bg-[hsl(25_100%_60%)]/80',
    tint: 'text-[hsl(25_100%_60%)]',
    summary: 'Delivery standards, smart contract tooling, and the systems that keep teams shipping sanely.',
    signal: '5 delivery tools',
    items: ['Hardhat', 'Truffle', 'Jira / Confluence', 'GitHub / GitLab', 'Husky / ESLint'],
  },
]

export function AboutTechStack() {
  return (
    <div className="space-y-6">
      <div className="grid gap-px bg-border md:grid-cols-3">
        {[
          ['6 capability lanes', 'From protocol and custody to cloud and delivery systems.'],
          ['38 named tools', 'Grouped into readable domains instead of one long skills wall.'],
          ['Built for live delivery', 'Optimized for shipping teams, not just technical breadth on paper.'],
        ].map(([title, copy]) => (
          <div key={title} className="bg-background px-5 py-5 sm:px-6">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{title}</p>
            <p className="text-[15px] leading-[1.7] text-muted-foreground">{copy}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-px bg-border xl:grid-cols-2">
        {categories.map((cat) => (
          <div
            key={cat.label}
            className="group relative overflow-hidden bg-background transition-colors duration-200 hover:bg-muted/20"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-border" />

            <div className="flex h-full flex-col gap-6 px-5 py-6 sm:px-6 sm:py-7">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`flex h-9 w-9 items-center justify-center border border-border ${cat.tint}`}>
                      <cat.Icon size={16} aria-hidden="true" />
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {cat.label}
                    </p>
                  </div>
                  <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">{cat.summary}</p>
                </div>
                <div className="shrink-0 border border-border px-3 py-2 text-right">
                  <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${cat.tint}`}>Scope</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground">{cat.signal}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="inline-flex min-h-11 items-center border border-border/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-200 group-hover:border-primary/40 group-hover:text-foreground hover:border-primary hover:text-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-auto border-t border-dashed border-border pt-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {cat.signal}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
