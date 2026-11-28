const techStack = [
  'Hyperledger Fabric', 'OP Stack / L2', 'Solidity', 'ERC-4337', 'Fireblocks NCW', 'BitGo', 'Node.js', 'NestJS',
  'Go', 'Python', 'Claude API', 'Ethereum', 'Polygon', 'Solana', 'Base', 'Arbitrum', 'Account Abstraction',
  'Docker', 'AWS EKS', 'HSM',
]

/** The butter tape separator, kept as its own section so the pinned era map can sit above it. */
export function TechMarquee() {
  return (
    <div className="relative z-10 mt-20 -rotate-[1.2deg]">
      <p className="sr-only">Stack in production: {techStack.join(', ')}.</p>
      <div
        aria-hidden="true"
        className="tone-butter -mx-[3%] select-none overflow-hidden border-y-[3px] border-current py-3 shadow-hard"
      >
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...techStack, ...techStack].map((item, i) => (
            <span key={i} className="mx-5 text-sm font-black uppercase tracking-[0.08em]">
              {item} <span className="ml-5">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
