export interface TalkMeta {
  title: string
  venue: string
  type: string
  description: string
  youtubeUrl: string
  eventUrl?: string
  topics: string[]
}

export const TALKS: TalkMeta[] = [
  {
    title: 'NFT: A New Gold Rush',
    venue: 'GDG Ahmedabad',
    type: 'Conference Talk',
    description:
      'Covered NFTs as a new asset class on blockchain for a Google Developer Group audience. Went into the mechanics of how NFTs work on-chain, ownership primitives, and what distinguishes speculative asset classes from infrastructure.',
    youtubeUrl: 'https://www.youtube.com/watch?v=KYRgwRG-LF8',
    eventUrl: 'https://gdg.community.dev/events/details/google-gdg-ahmedabad-presents-nft-a-new-gold-rush/',
    topics: ['NFT Standards', 'ERC-721', 'Digital Ownership', 'Blockchain Fundamentals'],
  },
  {
    title: 'Blockchain and Decentralisation',
    venue: 'Centre of Excellence of ICAI · Jaipur',
    type: 'Educational Session',
    description:
      'Session covering blockchain fundamentals and real-world use cases, positioned around the technology behind cryptocurrency. Tailored for a professional accountancy audience.',
    youtubeUrl: 'https://www.youtube.com/watch?v=ONUzNrt9plc',
    topics: ['Consensus Mechanisms', 'Distributed Ledgers', 'Cryptocurrency', 'Use Cases'],
  },
  {
    title: 'Getting Started with Docker',
    venue: 'Internal Session · SoluLab',
    type: 'Technical Workshop',
    description:
      'Demonstrated how to Dockerise a React.js application for dev, staging, and production using Docker and Docker Compose.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rvjnvZ6utpM',
    topics: ['Docker', 'Docker Compose', 'Multi-stage Builds', 'DevOps'],
  },
]
