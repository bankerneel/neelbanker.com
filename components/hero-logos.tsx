// Shared, dependency-free hero logo icons + constellation data.
// Used by the static mobile band and the lazy desktop constellation.

export const EthereumIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 2L6 16.5L16 21.5L26 16.5L16 2Z" fill="currentColor" opacity="0.9" />
    <path d="M16 21.5L6 16.5L16 30L26 16.5L16 21.5Z" fill="currentColor" opacity="0.6" />
    <path d="M16 2L16 21.5L26 16.5L16 2Z" fill="currentColor" opacity="0.7" />
    <path d="M16 21.5L16 30L26 16.5L16 21.5Z" fill="currentColor" opacity="0.4" />
  </svg>
)

export const PolygonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M21.5 11.5L16 8L10.5 11.5V18.5L16 22L21.5 18.5V11.5Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M16 8L10.5 11.5L16 15L21.5 11.5L16 8Z" fill="currentColor" />
    <path d="M10.5 11.5V18.5L16 22V15L10.5 11.5Z" fill="currentColor" opacity="0.7" />
    <path d="M21.5 11.5L16 15V22L21.5 18.5V11.5Z" fill="currentColor" opacity="0.5" />
  </svg>
)

export const SolidityIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="none" stroke="currentColor" strokeWidth="2" />
    <polygon points="16,8 22,11.5 22,18.5 16,22 10,18.5 10,11.5" fill="currentColor" opacity="0.3" />
    <text x="16" y="19" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="monospace">S</text>
  </svg>
)

export const NodejsIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" fill="none" stroke="currentColor" strokeWidth="2" />
    <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">node</text>
  </svg>
)

export const TypeScriptIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor" />
    <path d="M17.5 16.5V24H15V16.5H11.5V14H21V16.5H17.5Z" fill="hsl(var(--background))" />
    <path d="M22 21.5C22.5 22.2 23.3 22.5 24.5 22.5C25.7 22.5 26.5 22 26.5 21.2C26.5 20.4 25.9 20 24.5 19.6C22.5 19 21.5 18.2 21.5 16.8C21.5 15.3 22.7 14.2 24.7 14.2C25.8 14.2 26.8 14.5 27.5 15.1L26.5 16.7C26 16.2 25.4 15.9 24.7 15.9C23.7 15.9 23.2 16.3 23.2 16.9C23.2 17.5 23.7 17.8 25 18.2C27 18.8 28 19.7 28 21.2C28 22.8 26.8 24 24.5 24C23.1 24 21.9 23.6 21 22.9L22 21.5Z" fill="hsl(var(--background))" />
  </svg>
)

export const FireblocksIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 7C13 11 11 14 13 17C14 14 17 13.5 17 13.5C16 16 18 19 16 25C19 22 21 18 19 14C21 15 22 17 22 19C24 16 23 10 16 7Z" fill="currentColor" />
  </svg>
)

export const ClaudeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 12C10 9.8 11.8 8 14 8C16.2 8 18 9.8 18 12V16C18 18.2 16.2 20 14 20C11.8 20 10 18.2 10 16V12Z" fill="currentColor" />
    <path d="M14 20L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 12L22 12C23.1 12 24 12.9 24 14V18C24 19.1 23.1 20 22 20L18 20" fill="currentColor" opacity="0.6" />
  </svg>
)

export const ReactIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" />
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 16 16)" />
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 16 16)" />
    <circle cx="16" cy="16" r="2.5" fill="currentColor" />
  </svg>
)

export const HyperledgerIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="16,3 29,9 29,23 16,29 3,23 3,9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10 10V22M22 10V22M10 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const SolanaIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 8H22L26 12H6V8Z" fill="currentColor" />
    <path d="M6 14H26L22 18H6V14Z" fill="currentColor" opacity="0.75" />
    <path d="M6 20H22L26 24H6V20Z" fill="currentColor" opacity="0.5" />
  </svg>
)

export const DockerIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="8" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.5" />
    <rect x="12" y="8" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.75" />
    <rect x="19" y="8" width="5" height="4" rx="0.5" fill="currentColor" />
    <rect x="12" y="4" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.65" />
    <path d="M3 18C3 18 4.5 15.5 8 15.5H24C27.5 15.5 29 18 29 18C27 22.5 22 25 16 25C10 25 5 22.5 3 18Z" fill="currentColor" opacity="0.45" />
    <circle cx="27" cy="13" r="2" fill="currentColor" opacity="0.7" />
    <line x1="27" y1="15" x2="24" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

export const AWSIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M8 17C5.2 17 3 14.8 3 12C3 9.5 4.8 7.4 7.2 7.1C7.6 4.8 9.6 3 12 3C14.4 3 16.4 4.8 16.8 7.1C17.5 6.7 18.2 6.5 19 6.5C21.5 6.5 23.5 8.5 23.5 11C23.5 14 21 17 18 17H8Z" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1" />
    <path d="M10 24L13 28L16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 24L19 28L22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
  </svg>
)

export interface HeroLogo {
  label: string
  color: string
  Icon: React.FC
  size: number
  x: number
  y: number
  fx: string
  fy: string
  fdur: number
  delay: number
}

// Curated 12-node constellation — recognizable marks, spread to the sides so
// the headline owns the center. Positions in % of the hero box.
export const HERO_LOGOS: HeroLogo[] = [
  { label: 'Ethereum', color: '#627EEA', Icon: EthereumIcon, size: 50, x: 6, y: 14, fx: '6px', fy: '-10px', fdur: 6.5, delay: 0 },
  { label: 'Hyperledger', color: '#2D9CDB', Icon: HyperledgerIcon, size: 42, x: 3, y: 42, fx: '-5px', fy: '9px', fdur: 7.2, delay: 0.5 },
  { label: 'Solidity', color: '#d0d0d0', Icon: SolidityIcon, size: 40, x: 10, y: 68, fx: '7px', fy: '8px', fdur: 6.8, delay: 0.25 },
  { label: 'AWS', color: '#FF9900', Icon: AWSIcon, size: 40, x: 20, y: 26, fx: '5px', fy: '-9px', fdur: 7.6, delay: 0.7 },
  { label: 'React', color: '#61DAFB', Icon: ReactIcon, size: 40, x: 16, y: 86, fx: '-6px', fy: '-8px', fdur: 6.2, delay: 0.9 },
  { label: 'Docker', color: '#2496ED', Icon: DockerIcon, size: 44, x: 24, y: 52, fx: '8px', fy: '7px', fdur: 7.9, delay: 0.4 },
  { label: 'Fireblocks', color: '#FF6600', Icon: FireblocksIcon, size: 46, x: 86, y: 12, fx: '-7px', fy: '9px', fdur: 6.6, delay: 0.55 },
  { label: 'Solana', color: '#9945FF', Icon: SolanaIcon, size: 44, x: 74, y: 30, fx: '6px', fy: '-8px', fdur: 7.4, delay: 0.3 },
  { label: 'Node.js', color: '#68A063', Icon: NodejsIcon, size: 42, x: 92, y: 50, fx: '-6px', fy: '-9px', fdur: 6.9, delay: 0.8 },
  { label: 'Polygon', color: '#8247E5', Icon: PolygonIcon, size: 42, x: 78, y: 72, fx: '7px', fy: '8px', fdur: 7.1, delay: 0.2 },
  { label: 'Claude', color: '#D4A574', Icon: ClaudeIcon, size: 44, x: 90, y: 86, fx: '-5px', fy: '-7px', fdur: 6.4, delay: 1.0 },
  { label: 'TypeScript', color: '#3178C6', Icon: TypeScriptIcon, size: 38, x: 70, y: 52, fx: '6px', fy: '9px', fdur: 7.7, delay: 0.6 },
]
