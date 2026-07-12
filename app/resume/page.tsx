import type { Metadata } from 'next'
import Link from 'next/link'
import { ResumeActions } from '@/components/resume-actions'

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Neel Banker — Distributed Systems & Blockchain Architect and AI-augmented engineering leader. View online, download as PDF, or grab the LaTeX source.',
}

const ACCENT = 'text-[#1a4a8a]'

const skills: [string, string][] = [
  [
    'Blockchain & Distributed Systems',
    'Hyperledger Fabric, Ethereum, Solidity, EVM, OP Stack (L2), Arbitrum, Solana, Bitcoin (BDK, BRC-20, Ordinals), EOSIO, SKALE, Polygon, Hyperledger Besu',
  ],
  [
    'Custody & Wallets',
    'Fireblocks (NCW, Web3 Provider), Non-Custodial Wallet architecture, AWS CloudHSM, GCP Cloud HSM, WalletConnect',
  ],
  [
    'AI & ML',
    'Claude API, LangChain, GPT4All, Ollama (custom models), Llama.cpp, Weaviate (vector DB), multi-model workflows, AI-augmented engineering',
  ],
  [
    'Backend',
    'Node.js, NestJS, Python (Django, FastAPI), Go, TypeScript, REST, WebSocket (Noise protocol), Microservices, Nx monorepo',
  ],
  ['Frontend', 'React, Angular, Next.js, Flutter (Dart), Tailwind CSS'],
  [
    'Infrastructure & Cloud',
    'AWS (EKS, S3, CloudFront, CloudHSM, IAM, DynamoDB), GCP, Docker, Kubernetes, Azure Blockchain Workbench',
  ],
  ['Databases', 'PostgreSQL, MongoDB, CouchDB, DynamoDB'],
  ['Tools & Process', 'Hardhat, Truffle, Git, GitHub, GitLab, Jira, Confluence, Husky, ESLint'],
]

const projects: {
  name: string
  desc: string
  tech: string
  link?: { href: string; label: string }
}[] = [
  {
    name: 'Non-Custodial Wallet (Fireblocks NCW)',
    desc: 'Production non-custodial wallet (NCW) platform built on Fireblocks Embedded Wallet SDK; custom WebSocket layer, admin & user frontends.',
    tech: 'Node.js, Fireblocks, TypeScript',
  },
  {
    name: 'Pepe Unchained (OP Stack L2)',
    desc: 'Ethereum Layer 2 chain with bridge, L1/L2 backend oracle, and staking contracts for a meme token ecosystem.',
    tech: 'OP Stack, Solidity, Node.js, MongoDB',
  },
  {
    name: 'VeriOnce (Credential Verification)',
    desc: 'Hyperledger Fabric v2.4 credential platform: 3-org Raft network with private data collections keeping raw data inside client infrastructure. Designed for enterprise and government issuers; evaluated for MeeSeva state integration (100K+ daily txns).',
    tech: 'Fabric v2.4, AWS EKS, Kubernetes, CouchDB, MongoDB, S3, Prometheus',
  },
  {
    name: 'Fabric-Polygon Interoperability',
    desc: 'Cross-chain commit-reveal for academic credential verification between Hyperledger Fabric (private) and Polygon (public), with off-chain oracle relay bridge. Measured ~16s E2E latency on Polygon Amoy testnet. Three interaction modes: cross-chain, private-only, public-only.',
    tech: 'Go, Solidity, JavaScript, Polygon Amoy',
    link: { href: 'https://gist.github.com/bankerneel/df6fd079c8c8c21c57e8778dbb5d0936', label: '[gist]' },
  },
  {
    name: 'AI Social Media Post Agent',
    desc: "Autonomous agent that monitors trends, messages founder on Telegram, drafts LinkedIn posts in founder's voice, and publishes on approval.",
    tech: 'Python, Claude API, Telegram Bot API, LinkedIn API',
  },
  {
    name: 'Smart Contract Auditing Suite',
    desc: 'Security review of OpenZeppelin UUPS-upgradeable Token, Staking, and Vesting contracts following the Smart Contract Security Verification Standard (SCSVS); found reentrancy in staking logic, proxy upgrade authorization gaps, and access control misconfigurations.',
    tech: 'Solidity, Hardhat, OpenZeppelin',
  },
  {
    name: 'EIP: Access Control Registry',
    desc: 'Authored an Ethereum Improvement Proposal (EIP) for a centralized on-chain registry managing role-based access control across multiple smart contracts; a personal research contribution to the Ethereum protocol standardization process.',
    tech: 'Solidity, Hardhat',
  },
]

function SheetSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h2 className="mb-2 border-b border-neutral-300 pb-1 text-[13px] font-bold uppercase tracking-[0.08em] text-neutral-900">
        {title}
      </h2>
      {children}
    </section>
  )
}

function RoleHeader({
  role,
  company,
  dates,
  location,
}: {
  role: React.ReactNode
  company: string
  dates: string
  location: string
}) {
  return (
    <div className="mb-1">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p className="font-bold text-neutral-900">{role}</p>
        <p className="text-xs text-neutral-500">{dates}</p>
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p className={`italic ${ACCENT}`}>{company}</p>
        <p className="text-xs italic text-neutral-500">{location}</p>
      </div>
    </div>
  )
}

const bulletList = 'mt-1 list-disc space-y-1 pl-5 text-[13.5px] leading-relaxed text-neutral-700'

export default function ResumePage() {
  return (
    <>
      {/* ── Editorial page header (screen only) ─────────────────────── */}
      <section className="no-print mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] border-b border-border px-6 py-16 sm:px-12 sm:py-20">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          <Link
            href="/work-with-me"
            className="cursor-pointer transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            ← Work With Me
          </Link>
        </p>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Curriculum Vitae
        </p>
        <h1 className="mb-6 font-extrabold text-4xl uppercase leading-[0.9] tracking-tighter sm:text-5xl md:text-6xl">
          Resume
        </h1>
        <p className="mb-8 max-w-2xl text-base leading-[1.7] text-muted-foreground">
          Seven-plus years across production blockchain systems, custody platforms, and AI-augmented
          engineering — the full history, in one page. View it below, save it as a PDF, or grab the
          LaTeX source it is built from.
        </p>
        <ResumeActions />
      </section>

      {/* ── Document sheet ──────────────────────────────────────────── */}
      <div className="resume-doc-wrap flex justify-center bg-background px-4 py-10 sm:px-6 sm:py-14">
        <article className="resume-sheet w-full max-w-[860px] bg-white p-8 font-serif text-neutral-800 shadow-2xl sm:p-12 md:p-14">
          {/* Header */}
          <header className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Neel Banker
            </h2>
            <p className="mt-1 text-sm text-neutral-600 sm:text-[15px]">
              Distributed Systems &amp; Blockchain Architect &nbsp;|&nbsp; AI-Augmented Engineering
              Leadership
            </p>
            <p className="mt-2 text-xs text-neutral-700 sm:text-[13px]">
              <a href="tel:+919033125898" className={ACCENT}>
                +91&nbsp;90331&nbsp;25898
              </a>{' '}
              &nbsp;•&nbsp;{' '}
              <a href="mailto:neelhbanker@gmail.com" className={ACCENT}>
                neelhbanker@gmail.com
              </a>{' '}
              &nbsp;•&nbsp; Ahmedabad, Gujarat, India
            </p>
            <p className="mt-1 text-xs sm:text-[13px]">
              <a
                href="https://www.linkedin.com/in/neelbanker"
                target="_blank"
                rel="noopener noreferrer"
                className={ACCENT}
              >
                linkedin.com/in/neelbanker
              </a>{' '}
              &nbsp;•&nbsp;{' '}
              <a
                href="https://github.com/bankerneel"
                target="_blank"
                rel="noopener noreferrer"
                className={ACCENT}
              >
                github.com/bankerneel
              </a>{' '}
              &nbsp;•&nbsp;{' '}
              <a
                href="https://neelbanker.com"
                target="_blank"
                rel="noopener noreferrer"
                className={ACCENT}
              >
                neelbanker.com
              </a>
            </p>
          </header>

          {/* Profile */}
          <SheetSection title="Profile">
            <p className="text-[13.5px] leading-relaxed text-neutral-700">
              7+ years building production blockchain systems: Ethereum L2 ecosystems, Hyperledger
              Fabric networks, custody platforms, cross-chain integrations, and payments. I grew the
              SoluLab blockchain team from 10 to 50+ engineers; at Tech Alchemy, I run architecture
              across several live platforms simultaneously. Lately putting real time into
              AI-augmented engineering: multi-model workflows and tooling that let teams ship faster
              without letting the codebase accumulate debt. Interested in senior architecture
              leadership and CTO-track roles globally.
            </p>
          </SheetSection>

          {/* Experience */}
          <SheetSection title="Experience">
            <RoleHeader
              role="Blockchain Architect / Engineering Lead"
              company="Tech Alchemy"
              dates="May 2024 – Present (2+ yrs)"
              location="Hybrid: Pune, India / Remote"
            />
            <ul className={bulletList}>
              <li>
                Runs architecture and delivery across multiple live blockchain platforms
                simultaneously: Ethereum L2 ecosystems, cross-chain systems, custody infrastructure,
                and payments.
              </li>
              <li>
                Led the OP Stack L2 deployment, bridge architecture, and L1/L2 backend oracle for the
                Pepe Unchained token ecosystem; delivered a production non-custodial wallet (NCW)
                built on Fireblocks for a separate enterprise client.
              </li>
              <li>
                Drove Solana DApps integration across Node.js backends, AWS infrastructure, and
                EVM-compatible contracts within a 6-week window.
              </li>
              <li>
                Formalized engineering standards around security, compliance, and operational
                reliability post-acquisition; mentored engineers and took part in senior-level
                hiring.
              </li>
              <li>
                Introduced AI-assisted engineering workflows, including multi-model and vector
                DB-backed tooling, that sped up delivery without letting standards slip.
              </li>
            </ul>

            <div className="mt-4">
              <RoleHeader
                role={<>Blockchain Team Lead / Senior Developer → Engineering Lead</>}
                company="SoluLab Inc"
                dates="Jul 2019 – May 2024 (4 yrs 11 mos)"
                location="On-site: Ahmedabad, India"
              />
              <p className="mt-1 text-xs italic text-neutral-600">
                Apr 2021 – May 2024: Blockchain Team Lead / Senior Developer
              </p>
              <ul className={bulletList}>
                <li>
                  Was the go-to technical advisor and solution architect for startups and mid-market
                  clients across DeFi, enterprise blockchain, and Web3 infrastructure.
                </li>
                <li>
                  Built the blockchain engineering practice from scratch, growing the team from 10 to
                  50+ engineers and putting real engineering standards in place around security,
                  documentation, and code quality.
                </li>
                <li>
                  Designed and shipped custom blockchain platforms across Hyperledger Fabric,
                  Ethereum, EVM Layer 2, EOSIO, and NFT ecosystems; built long-term client
                  relationships across North America.
                </li>
                <li>
                  Delivered platforms including{' '}
                  <span className="font-semibold text-neutral-900">Sosh Wallet</span> (Hyperledger
                  Fabric digital wallet, multi-layered tx security),{' '}
                  <span className="font-semibold text-neutral-900">DocTrace</span> (immutable
                  document custody on Fabric for enterprise clients),{' '}
                  <span className="font-semibold text-neutral-900">EOS DApps</span> (finance, supply
                  chain, and gaming on EOSIO), and multiple DeFi/NFT marketplace platforms.
                </li>
                <li>
                  Won{' '}
                  <span className="font-semibold text-neutral-900">Best Team Lead of the Year</span>{' '}
                  in both 2021 and 2022 (consecutive).
                </li>
              </ul>
              <p className="mt-3 text-xs italic text-neutral-600">
                Jul 2019 – Mar 2021: Blockchain Developer
              </p>
              <ul className={bulletList}>
                <li>
                  Designed scalable network architectures and set up public/private blockchain
                  environments per client requirements.
                </li>
                <li>
                  Wrote and audited smart contracts; worked with AWS, Azure, and SCRUM workflows on
                  international client projects.
                </li>
              </ul>
            </div>
          </SheetSection>

          {/* Education */}
          <SheetSection title="Education">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="font-bold text-neutral-900">
                Master of Technology (MTech), Information Technology
              </p>
              <p className="text-xs text-neutral-500">Oct 2021 – Nov 2023</p>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <p className={`italic ${ACCENT}`}>Rai University, Ahmedabad</p>
              <p className="text-xs italic text-neutral-500">
                (pursued alongside full-time role at SoluLab)
              </p>
            </div>
            <p className="mt-1 text-[13px] text-neutral-700">
              <span className="font-semibold text-neutral-900">Gold Medalist</span>, Ranked 4th in
              the University &nbsp;•&nbsp; Review Paper:{' '}
              <span className="italic">Blockchain &amp; Web3 in Carbon Credits</span>
            </p>

            <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4">
              <p className="font-bold text-neutral-900">
                Bachelor of Engineering (BE), Information Technology
              </p>
              <p className="text-xs text-neutral-500">2016 – 2019</p>
            </div>
            <p className={`italic ${ACCENT}`}>
              L J Institute of Engineering and Technology (LJIET), Ahmedabad
            </p>
          </SheetSection>

          {/* Selected Projects */}
          <SheetSection title="Selected Projects">
            <div className="space-y-3">
              {projects.map((p) => (
                <div key={p.name} className="grid gap-x-5 gap-y-1 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]">
                  <p className="font-bold text-neutral-900">{p.name}</p>
                  <p className="text-[13px] leading-relaxed text-neutral-700">
                    {p.desc} <span className="italic text-neutral-600">{p.tech}</span>
                    {p.link && (
                      <>
                        {' '}
                        <a
                          href={p.link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={ACCENT}
                        >
                          {p.link.label}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </SheetSection>

          {/* Technical Skills */}
          <SheetSection title="Technical Skills">
            <div className="space-y-1.5 text-[13px] leading-relaxed text-neutral-700">
              {skills.map(([label, value]) => (
                <p key={label}>
                  <span className="font-semibold text-neutral-900">{label}:</span> {value}
                </p>
              ))}
            </div>
          </SheetSection>

          {/* Talks & Speaking */}
          <SheetSection title="Talks & Speaking">
            <ul className={bulletList}>
              <li>
                <span className="font-semibold text-neutral-900">NFT: A New Gold Rush</span>, GDG
                Ahmedabad. NFTs as a new asset class on blockchain for a Google Developer Group
                audience.{' '}
                <a
                  href="https://www.youtube.com/watch?v=KYRgwRG-LF8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ACCENT}
                >
                  [YouTube]
                </a>
              </li>
              <li>
                <span className="font-semibold text-neutral-900">
                  Blockchain and Decentralisation
                </span>
                , Centre of Excellence of ICAI, Jaipur. Blockchain fundamentals and real-world use
                cases.{' '}
                <a
                  href="https://www.youtube.com/watch?v=ONUzNrt9plc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ACCENT}
                >
                  [YouTube]
                </a>
              </li>
              <li>
                <span className="font-semibold text-neutral-900">Getting Started with Docker</span>,
                SoluLab Internal. Dockerising a React.js application for dev, staging, and production
                using Docker Compose.{' '}
                <a
                  href="https://www.youtube.com/watch?v=rvjnvZ6utpM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ACCENT}
                >
                  [YouTube]
                </a>
              </li>
            </ul>
          </SheetSection>

          {/* Awards */}
          <SheetSection title="Awards & Recognition">
            <ul className={bulletList}>
              <li>
                <span className="font-semibold text-neutral-900">
                  Best Team Lead of the Year 2022
                </span>
                , SoluLab Inc (consecutive second year)
              </li>
              <li>
                <span className="font-semibold text-neutral-900">
                  Best Team Lead of the Year 2021
                </span>
                , SoluLab Inc
              </li>
              <li>
                <span className="font-semibold text-neutral-900">Gold Medal, MTech IT</span>, Ranked
                4th in University
              </li>
            </ul>
          </SheetSection>

          {/* Continuous Learning */}
          <SheetSection title="Continuous Learning">
            <p className="text-[13.5px] leading-relaxed text-neutral-700">
              Self-directed study in Solidity security, Ethereum internals, and Rust systems
              programming via structured online courses (Udemy, 2021 – 2022).
            </p>
          </SheetSection>

          {/* Languages */}
          <SheetSection title="Languages">
            <p className="text-[13.5px] leading-relaxed text-neutral-700">
              <span className="font-semibold text-neutral-900">Gujarati</span>: Native (mother
              tongue) &nbsp;•&nbsp; <span className="font-semibold text-neutral-900">English</span>:
              Full professional proficiency &nbsp;•&nbsp;{' '}
              <span className="font-semibold text-neutral-900">Hindi</span>: Full professional
              proficiency
            </p>
          </SheetSection>
        </article>
      </div>

      {/* ── Bottom CTA (screen only) ────────────────────────────────── */}
      <section className="no-print mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] border-t border-border px-6 py-14 sm:px-12">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-[1.8] text-muted-foreground">
            Hiring for principal architecture, blockchain leadership, or a CTO-track role? The
            fastest next step is a short call.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/work-with-me"
              className="inline-flex cursor-pointer items-center bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              Work With Me →
            </Link>
            <Link
              href="/projects"
              className="inline-flex cursor-pointer items-center border border-border px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-foreground transition-colors duration-200 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              See Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
