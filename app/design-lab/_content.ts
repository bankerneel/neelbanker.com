// Shared content for every design-lab prototype, so each direction renders the
// SAME copy and the comparison is apples-to-apples. Real site content.

export const IDENTITY = {
  name: 'Neel Banker',
  role: 'Distributed Systems & Blockchain Architect',
  location: 'Ahmedabad, India',
  headline: ['Building', "What's", 'Next.'],
  standfirst:
    'Seven years building blockchain infrastructure, custody systems, and AI-augmented engineering workflows for teams shipping under real delivery pressure.',
  standfirstLong:
    'Seven years building blockchain infrastructure, custody systems, and AI-augmented engineering workflows for teams shipping under real delivery pressure. Writing weekly about architecture, execution, and what holds up in production.',
  currently:
    'Architecture across live L2, custody and AI delivery platforms. Writing weekly. Open to a small number of advisory engagements.',
  signoff: 'Building systems with staying power.',
}

export const NAV = ['Writing', 'Projects', 'Resources', 'About']

export const STATS = [
  { v: '7+', l: 'Years Building' },
  { v: '50+', l: 'Engineers Led' },
  { v: '15+', l: 'Production Platforms' },
]

export const STACK = [
  'Hyperledger Fabric',
  'OP Stack / L2',
  'Solidity',
  'ERC-4337',
  'Fireblocks',
  'BitGo',
  'Node.js',
  'Go',
]

export interface LabArticle {
  n: string
  roman: string
  pillar: string
  date: string
  dateShort: string
  read: string
  title: string
  excerpt: string
  note: string
}

export const ARTICLES: LabArticle[] = [
  {
    n: '01',
    roman: 'I',
    pillar: 'Blockchain',
    date: 'Apr 03, 2026',
    dateShort: '03.04.26',
    read: '9 min',
    title: 'Designing a Staking Contract That Will Not Get Exploited',
    excerpt:
      'Most staking bugs are not exotic. They come from predictable mistakes in reward math, withdrawal flow, upgradeability, and trust boundaries.',
    note: 'Reward math is where most audits start — and where most teams have already lost.',
  },
  {
    n: '02',
    roman: 'II',
    pillar: 'Leadership',
    date: 'Apr 01, 2026',
    dateShort: '01.04.26',
    read: '6 min',
    title: 'Why I Stopped Writing Smart Contracts Before Auditing Them',
    excerpt:
      'Auditing changed how I write Solidity. Once you spend enough time reading production-bound contracts for failure modes, your default design instincts change.',
    note: 'Written after two years of reading other teams’ production code.',
  },
  {
    n: '03',
    roman: 'III',
    pillar: 'Blockchain',
    date: 'Feb 18, 2026',
    dateShort: '18.02.26',
    read: '11 min',
    title: 'L2 Chains Are Not Hard to Deploy — The Hard Part Comes After',
    excerpt:
      'Deploying an OP Stack L2 takes a week. Running one in production takes ongoing engineering. The sequencer, bridge, and oracle design are where the real work begins.',
    note: 'Based on a production OP Stack L2 deployment and the year that followed.',
  },
]

export const PROJECT = {
  title: 'Project Atlas — Multi-Chain Non-Custodial Wallet',
  short: 'Project Atlas',
  excerpt:
    'Production non-custodial wallet platform supporting Bitcoin (BDK/UTXO), Ethereum, and EVM chains. Flutter frontend, Django backend, encrypted WebSocket sync, and CloudFront-backed delivery.',
  tags: ['Flutter', 'Django', 'BDK', 'Noise Protocol', 'MongoDB'],
  meta: [
    ['Role', 'Architect'],
    ['Year', '2024'],
    ['Chains', 'BTC · ETH · EVM'],
    ['Status', 'Production'],
  ] as [string, string][],
}

export const PROJECTS = [
  { title: 'Project Atlas', sub: 'Multi-chain non-custodial wallet', tag: 'BTC · ETH · EVM' },
  { title: 'Project Ember', sub: 'OP Stack L2 + bridge', tag: 'Ethereum L2' },
  { title: 'Project Seal', sub: 'Credential verification on Fabric', tag: 'Hyperledger' },
  { title: 'Project Concierge', sub: 'AI hotel recommendation API', tag: 'NestJS · LLM' },
]

// Reading specimen — used by directions that show an article template
export const SPECIMEN = {
  title: 'Why I stopped writing smart contracts before auditing them',
  paras: [
    'Auditing changed how I write Solidity. Once you spend enough time reading production-bound contracts for failure modes, your default design instincts change. You stop asking whether the happy path works and start asking what an adversary does with the three lines you left unguarded.',
    'When you only write contracts, your bias is toward feature completion. When you audit contracts, your bias shifts toward the failure surface: where can state drift, who can call this unexpectedly, what assumption stops being true after an upgrade.',
  ],
  pullquote: 'That shift permanently changes how you write.',
  closing:
    'The biggest difference is not technical knowledge. It is sequencing. I now write the trust boundaries first and the features second, which makes the contract smaller and the review shorter.',
}

export interface Direction {
  slug: string
  tag: string
  title: string
  note: string
  /** The direction chosen to take forward. */
  selected?: boolean
}

export const DIRECTIONS: Direction[] = [
  { slug: 'retro', tag: 'A', title: 'Retro Duotone', note: 'Bone paper, oxide ink, burnt orange. Halftone + offset misregistration.' },
  { slug: 'editorial', tag: 'B', title: 'Maximalist Editorial', note: 'Serif × grotesk × mono. Violent scale, marginalia, § sections.' },
  { slug: 'editorial-dark', tag: 'C', title: 'Editorial — Dark', note: 'The same editorial system in night mode. Bone on near-black.' },
  { slug: 'editorial-duotone', tag: 'D', title: 'Editorial Duotone', note: 'Hybrid: editorial structure, retro palette and print texture.' },
  { slug: 'bento', tag: 'E', title: 'Bento Grid', note: 'Modular rounded cards, varying spans. Dense and scannable.' },
  { slug: 'luxury', tag: 'F', title: 'Luxury Typography', note: 'Didone serif, vast whitespace, hairlines, champagne accent.' },
  { slug: 'cybercore', tag: 'G', title: 'Cybercore', note: 'Terminal HUD, scanlines, glitch, chromatic aberration.' },
  { slug: 'scrapbook', tag: 'H', title: 'Scrapbook', note: 'Collage, tape, rotated cards, annotations, mixed media.' },
  { slug: 'surrealism', tag: 'I', title: 'Surrealism', note: 'Impossible scale, floating objects, long shadows, dream palette.' },
  { slug: 'dream-collage', tag: 'J', title: 'Dream Collage', note: 'Surreal-led: torn paper fragments floating in an impossible sky.' },
  { slug: 'cut-paper', tag: 'K', title: 'Cut-Paper Diorama', note: 'Balanced: flat Matisse-style cut shapes, hard offset shadows.' },
  { slug: 'desk-of-dreams', tag: 'L', title: 'Desk of Dreams', note: 'Scrapbook-led: a real desk where the objects disobey gravity.' },
  { slug: 'maximalism', tag: 'M', title: 'Maximalism — Light', note: 'More is more, muted. Pattern on pattern on warm cream.' },
  { slug: 'maximalism-dark', tag: 'N', title: 'Maximalism — Dark', note: 'Same system, deepened into jewel tones. Toggle-ready pair with M.' },
  { slug: 'torn-maximalism', tag: 'O', title: 'Torn Maximalism', note: 'Maximalist grid, but every panel is torn paper. Has a light/dark toggle.' },
  {
    slug: 'dream-bazaar',
    tag: 'P',
    title: 'Dream Bazaar',
    note: 'No grid — scraps, polaroids and swatches overlapping on a wall. Toggle.',
    selected: true,
  },
  { slug: 'pattern-dreamscape', tag: 'Q', title: 'Pattern Dreamscape', note: 'Surreal arcade: patterned portals with content floating in front. Toggle.' },
]
