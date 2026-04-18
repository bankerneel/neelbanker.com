'use client'

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion'
import Link from 'next/link'
import { NewsletterForm } from '@/components/newsletter-form'

// ── Inline SVG tech logos ─────────────────────────────────────────────────
const EthereumIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 2L6 16.5L16 21.5L26 16.5L16 2Z" fill="currentColor" opacity="0.9"/>
    <path d="M16 21.5L6 16.5L16 30L26 16.5L16 21.5Z" fill="currentColor" opacity="0.6"/>
    <path d="M16 2L16 21.5L26 16.5L16 2Z" fill="currentColor" opacity="0.7"/>
    <path d="M16 21.5L16 30L26 16.5L16 21.5Z" fill="currentColor" opacity="0.4"/>
  </svg>
)

const PolygonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M21.5 11.5L16 8L10.5 11.5V18.5L16 22L21.5 18.5V11.5Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <path d="M16 8L10.5 11.5L16 15L21.5 11.5L16 8Z" fill="currentColor"/>
    <path d="M10.5 11.5V18.5L16 22V15L10.5 11.5Z" fill="currentColor" opacity="0.7"/>
    <path d="M21.5 11.5L16 15V22L21.5 18.5V11.5Z" fill="currentColor" opacity="0.5"/>
    <circle cx="16" cy="4" r="2" fill="currentColor"/>
    <circle cx="6" cy="21" r="2" fill="currentColor"/>
    <circle cx="26" cy="21" r="2" fill="currentColor"/>
    <line x1="16" y1="6" x2="10.5" y2="11.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="16" y1="6" x2="21.5" y2="11.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="8" y1="20.1" x2="10.5" y2="18.5" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="24" y1="20.1" x2="21.5" y2="18.5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
)

const OpenAIIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path fillRule="evenodd" clipRule="evenodd" d="M16 4.5C12.5 4.5 9.5 6.5 8 9.5C6.2 9.8 4.5 10.8 3.5 12.3C1.5 15.5 2 19.5 4.3 22C3.8 23.8 4 25.7 5 27.2C7 30.4 11 31.5 14.3 30.1C15.4 31 16.7 31.5 18.1 31.5C21.6 31.5 24.6 29.5 26.1 26.5C27.9 26.2 29.6 25.2 30.6 23.7C32.6 20.5 32.1 16.5 29.8 14C30.3 12.2 30.1 10.3 29.1 8.8C27.1 5.6 23.1 4.5 19.8 5.9C18.7 5 17.4 4.5 16 4.5Z" fill="currentColor"/>
    <path d="M16 10.5V21.5M11.5 13V19M20.5 13V19M9 16.5H23" stroke="hsl(var(--background))" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
)

const SolidityIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="16,3 27,9.5 27,22.5 16,29 5,22.5 5,9.5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <polygon points="16,8 22,11.5 22,18.5 16,22 10,18.5 10,11.5" fill="currentColor" opacity="0.3"/>
    <text x="16" y="19" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold" fontFamily="monospace">S</text>
  </svg>
)

const BaseIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor"/>
    <path d="M16 7C11 7 7 11 7 16C7 21 11 25 16 25C20.4 25 24 21.8 24.7 17.5H16V14.5H27.9C27.97 15 28 15.5 28 16C28 22.6 22.6 28 16 28C9.4 28 4 22.6 4 16C4 9.4 9.4 4 16 4V7Z" fill="hsl(var(--background))"/>
  </svg>
)

const NodejsIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 3L28 10V22L16 29L4 22V10L16 3Z" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">node</text>
  </svg>
)

const TypeScriptIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor"/>
    <path d="M17.5 16.5V24H15V16.5H11.5V14H21V16.5H17.5Z" fill="hsl(var(--background))"/>
    <path d="M22 21.5C22.5 22.2 23.3 22.5 24.5 22.5C25.7 22.5 26.5 22 26.5 21.2C26.5 20.4 25.9 20 24.5 19.6C22.5 19 21.5 18.2 21.5 16.8C21.5 15.3 22.7 14.2 24.7 14.2C25.8 14.2 26.8 14.5 27.5 15.1L26.5 16.7C26 16.2 25.4 15.9 24.7 15.9C23.7 15.9 23.2 16.3 23.2 16.9C23.2 17.5 23.7 17.8 25 18.2C27 18.8 28 19.7 28 21.2C28 22.8 26.8 24 24.5 24C23.1 24 21.9 23.6 21 22.9L22 21.5Z" fill="hsl(var(--background))"/>
  </svg>
)

const FireblocksIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="2" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 7C13 11 11 14 13 17C14 14 17 13.5 17 13.5C16 16 18 19 16 25C19 22 21 18 19 14C21 15 22 17 22 19C24 16 23 10 16 7Z" fill="currentColor"/>
  </svg>
)

const ArbitrumIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 7L22 21H10L16 7Z" fill="currentColor"/>
    <path d="M13 16L16 9L19 16H13Z" fill="hsl(var(--background))" opacity="0.5"/>
  </svg>
)

const ClaudeIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 12C10 9.8 11.8 8 14 8C16.2 8 18 9.8 18 12V16C18 18.2 16.2 20 14 20C11.8 20 10 18.2 10 16V12Z" fill="currentColor"/>
    <path d="M14 20L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M18 12L22 12C23.1 12 24 12.9 24 14V18C24 19.1 23.1 20 22 20L18 20" fill="currentColor" opacity="0.6"/>
  </svg>
)

const ReactIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5"/>
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 16 16)"/>
    <circle cx="16" cy="16" r="2.5" fill="currentColor"/>
  </svg>
)

const AAIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="4" y="4" width="24" height="24" rx="12" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <text x="16" y="20" textAnchor="middle" fill="currentColor" fontSize="9" fontWeight="bold" fontFamily="monospace">4337</text>
  </svg>
)

const HyperledgerIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <polygon points="16,3 29,9 29,23 16,29 3,23 3,9" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 10V22M22 10V22M10 16H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const SolanaIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 8H22L26 12H6V8Z" fill="currentColor"/>
    <path d="M6 14H26L22 18H6V14Z" fill="currentColor" opacity="0.75"/>
    <path d="M6 20H22L26 24H6V20Z" fill="currentColor" opacity="0.5"/>
  </svg>
)

const GoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <text x="16" y="21" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold" fontFamily="monospace">Go</text>
  </svg>
)

const PythonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 3C11 3 8 5 8 9V15H20C21.1 15 22 15.9 22 17V22C22 25 19 28 16 28C13 28 10 25 10 22V20" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 29C21 29 24 27 24 23V17H12C10.9 17 10 16.1 10 15V10C10 7 13 4 16 4C19 4 22 7 22 10V12" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="13" cy="10.5" r="1.5" fill="currentColor"/>
    <circle cx="19" cy="21.5" r="1.5" fill="currentColor"/>
  </svg>
)

const DockerIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="8" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.5"/>
    <rect x="12" y="8" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.75"/>
    <rect x="19" y="8" width="5" height="4" rx="0.5" fill="currentColor"/>
    <rect x="12" y="4" width="5" height="4" rx="0.5" fill="currentColor" opacity="0.65"/>
    <path d="M3 18C3 18 4.5 15.5 8 15.5H24C27.5 15.5 29 18 29 18C27 22.5 22 25 16 25C10 25 5 22.5 3 18Z" fill="currentColor" opacity="0.45"/>
    <circle cx="27" cy="13" r="2" fill="currentColor" opacity="0.7"/>
    <line x1="27" y1="15" x2="24" y2="15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const AWSIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M8 17C5.2 17 3 14.8 3 12C3 9.5 4.8 7.4 7.2 7.1C7.6 4.8 9.6 3 12 3C14.4 3 16.4 4.8 16.8 7.1C17.5 6.7 18.2 6.5 19 6.5C21.5 6.5 23.5 8.5 23.5 11C23.5 14 21 17 18 17H8Z" fill="currentColor" opacity="0.35" stroke="currentColor" strokeWidth="1"/>
    <path d="M10 24L13 28L16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 24L19 28L22 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
  </svg>
)

const NestJSIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="13" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 22V10L22 22V10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const HardhatIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="22" width="22" height="3" rx="1" fill="currentColor" opacity="0.45"/>
    <path d="M7 21C7 21 8 12 16 12C24 12 25 21 25 21H7Z" fill="currentColor" opacity="0.8"/>
    <line x1="16" y1="12" x2="16" y2="6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="12" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const KubernetesIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="16" r="4" fill="currentColor"/>
    <path d="M16 4V10M16 22V28M4 16H10M22 16H28M8 8L11.5 11.5M20.5 20.5L24 24M24 8L20.5 11.5M11.5 20.5L8 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const MongoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M16 5C13 9 11.5 13 11.5 17.5C11.5 23 14.3 26.8 16 28C17.7 26.8 20.5 23 20.5 17.5C20.5 13 19 9 16 5Z" fill="currentColor"/>
    <path d="M16 8V26" stroke="hsl(var(--background))" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"/>
  </svg>
)

const PostgresIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="16" cy="11" rx="8.5" ry="5.5" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M7.5 11V20C7.5 23 11.3 25.5 16 25.5C20.7 25.5 24.5 23 24.5 20V11" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 16H20M12 20H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const BitGoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 9C12.5 9 10 11.5 10 15.5C10 19.5 12.5 22 16 22C18.7 22 20.8 20.5 21.7 18H15.5V15H22.2C22.3 15.4 22.3 15.8 22.3 16.2C22.3 20.8 19.2 24 16 24C11.2 24 7.8 20.4 7.8 15.6C7.8 10.8 11.2 7.2 16 7.2C18.2 7.2 20 7.9 21.5 9.4L19.8 11.1C18.8 10 17.5 9 16 9Z" fill="currentColor"/>
  </svg>
)

const WalletConnectIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <path d="M6 12C11.5 7 20.5 7 26 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M10 16C13.3 13 18.7 13 22 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
    <path d="M13.5 20C15 18.6 17 18.6 18.5 20L16 22.5L13.5 20Z" fill="currentColor"/>
  </svg>
)

const LangChainIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect x="5" y="8" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.75"/>
    <rect x="18" y="15" width="9" height="9" rx="1.5" fill="currentColor" opacity="0.45"/>
    <path d="M14 12.5H18M23 15V11H19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// ── Logo constellation data ───────────────────────────────────────────────
interface TechLogo {
  label: string
  color: string
  Icon: React.FC
  size: number
  x: number
  y: number
  delay: number
  floatAmplitude: number
  floatDuration: number
}

interface SignalDot {
  x: number
  y: number
  delay: number
  duration: number
  color: string
}

const TECH_LOGOS: TechLogo[] = [
  { label: 'Ethereum', color: '#627EEA', Icon: EthereumIcon, size: 52, x: 15, y: 8, delay: 0, floatAmplitude: 8, floatDuration: 4.2 },
  { label: 'Polygon', color: '#8247E5', Icon: PolygonIcon, size: 44, x: 72, y: 22, delay: 0.3, floatAmplitude: 10, floatDuration: 5.1 },
  { label: 'OpenAI', color: '#10a37f', Icon: OpenAIIcon, size: 48, x: 48, y: 5, delay: 0.6, floatAmplitude: 7, floatDuration: 3.8 },
  { label: 'Solidity', color: '#d0d0d0', Icon: SolidityIcon, size: 38, x: 85, y: 55, delay: 0.2, floatAmplitude: 9, floatDuration: 4.7 },
  { label: 'Base', color: '#0052FF', Icon: BaseIcon, size: 42, x: 8, y: 62, delay: 0.8, floatAmplitude: 6, floatDuration: 5.5 },
  { label: 'Node.js', color: '#68A063', Icon: NodejsIcon, size: 40, x: 60, y: 72, delay: 0.4, floatAmplitude: 11, floatDuration: 4.0 },
  { label: 'TypeScript', color: '#3178C6', Icon: TypeScriptIcon, size: 36, x: 28, y: 80, delay: 1.0, floatAmplitude: 8, floatDuration: 4.9 },
  { label: 'Fireblocks', color: '#FF6600', Icon: FireblocksIcon, size: 46, x: 80, y: 8, delay: 0.5, floatAmplitude: 9, floatDuration: 5.8 },
  { label: 'Arbitrum', color: '#28A0F0', Icon: ArbitrumIcon, size: 38, x: 5, y: 35, delay: 0.7, floatAmplitude: 7, floatDuration: 4.3 },
  { label: 'Claude', color: '#D4A574', Icon: ClaudeIcon, size: 44, x: 88, y: 75, delay: 0.9, floatAmplitude: 10, floatDuration: 6.0 },
  { label: 'React', color: '#61DAFB', Icon: ReactIcon, size: 40, x: 42, y: 88, delay: 1.2, floatAmplitude: 8, floatDuration: 5.2 },
  { label: 'ERC-4337', color: '#E8A838', Icon: AAIcon, size: 36, x: 18, y: 50, delay: 0.15, floatAmplitude: 12, floatDuration: 4.6 },
  { label: 'Hyperledger', color: '#2D9CDB', Icon: HyperledgerIcon, size: 40, x: 40, y: 30, delay: 0.55, floatAmplitude: 7, floatDuration: 4.4 },
  { label: 'Solana', color: '#9945FF', Icon: SolanaIcon, size: 44, x: 59, y: 14, delay: 0.38, floatAmplitude: 9, floatDuration: 5.3 },
  { label: 'Go', color: '#00ADD8', Icon: GoIcon, size: 38, x: 75, y: 40, delay: 0.65, floatAmplitude: 8, floatDuration: 4.8 },
  { label: 'Python', color: '#3776AB', Icon: PythonIcon, size: 38, x: 36, y: 58, delay: 0.48, floatAmplitude: 10, floatDuration: 5.6 },
  { label: 'Docker', color: '#2496ED', Icon: DockerIcon, size: 42, x: 53, y: 46, delay: 0.85, floatAmplitude: 7, floatDuration: 4.2 },
  { label: 'AWS', color: '#FF9900', Icon: AWSIcon, size: 38, x: 22, y: 22, delay: 0.28, floatAmplitude: 9, floatDuration: 5.0 },
  { label: 'NestJS', color: '#E0234E', Icon: NestJSIcon, size: 36, x: 65, y: 84, delay: 1.05, floatAmplitude: 8, floatDuration: 4.5 },
  { label: 'Hardhat', color: '#FFC517', Icon: HardhatIcon, size: 36, x: 10, y: 80, delay: 0.78, floatAmplitude: 11, floatDuration: 5.8 },
  { label: 'Kubernetes', color: '#326CE5', Icon: KubernetesIcon, size: 38, x: 12, y: 14, delay: 0.52, floatAmplitude: 8, floatDuration: 5.4 },
  { label: 'MongoDB', color: '#47A248', Icon: MongoIcon, size: 34, x: 30, y: 10, delay: 0.92, floatAmplitude: 7, floatDuration: 4.7 },
  { label: 'PostgreSQL', color: '#336791', Icon: PostgresIcon, size: 36, x: 70, y: 11, delay: 0.62, floatAmplitude: 8, floatDuration: 5.2 },
  { label: 'BitGo', color: '#F7931A', Icon: BitGoIcon, size: 38, x: 90, y: 26, delay: 1.16, floatAmplitude: 9, floatDuration: 5.9 },
  { label: 'WalletConnect', color: '#3B99FC', Icon: WalletConnectIcon, size: 36, x: 82, y: 62, delay: 0.44, floatAmplitude: 8, floatDuration: 4.9 },
  { label: 'LangChain', color: '#10A37F', Icon: LangChainIcon, size: 34, x: 22, y: 90, delay: 0.88, floatAmplitude: 7, floatDuration: 5.1 },
]

const LEFT_TECH_LOGOS = TECH_LOGOS.filter((_, index) => index % 2 === 0).map((logo) => ({
  ...logo,
  size: Math.round(logo.size * 0.8),
  x: 3 + logo.x * 0.28,
  y: 5 + logo.y * 0.84,
}))

const RIGHT_TECH_LOGOS = TECH_LOGOS.filter((_, index) => index % 2 === 1).map((logo) => ({
  ...logo,
  size: Math.round(logo.size * 0.84),
  x: 63 + logo.x * 0.31,
  y: 5 + logo.y * 0.84,
}))

const SIGNAL_DOTS: SignalDot[] = [
  { x: 14, y: 22, delay: 0.2, duration: 4.2, color: 'rgba(163,230,53,0.65)' },
  { x: 24, y: 72, delay: 0.6, duration: 5.4, color: 'rgba(56,189,248,0.55)' },
  { x: 41, y: 18, delay: 0.9, duration: 4.8, color: 'rgba(251,146,60,0.55)' },
  { x: 58, y: 74, delay: 0.4, duration: 5.1, color: 'rgba(163,230,53,0.45)' },
  { x: 78, y: 30, delay: 1.1, duration: 4.5, color: 'rgba(56,189,248,0.65)' },
  { x: 86, y: 66, delay: 0.75, duration: 5.7, color: 'rgba(251,146,60,0.5)' },
]

// ── Floating badge component ──────────────────────────────────────────────
function TechBadge({
  logo,
  shouldAnimate,
  pointerX,
  pointerY,
  pointerOpacity,
}: {
  logo: TechLogo
  shouldAnimate: boolean
  pointerX: MotionValue<number>
  pointerY: MotionValue<number>
  pointerOpacity: MotionValue<number>
}) {
  const floatY = shouldAnimate ? [0, -logo.floatAmplitude, 0] : [0]
  const floatX = shouldAnimate ? [0, logo.floatAmplitude * 0.3, 0] : [0]
  const spotlightScale = useTransform(() => {
    if (!shouldAnimate) return 1
    const dx = pointerX.get() - logo.x
    const dy = pointerY.get() - logo.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > 24) return 1
    return 1 + ((24 - distance) / 24) * 0.18
  })
  const spotlightGlow = useTransform(() => {
    if (!shouldAnimate) return 0.25
    const dx = pointerX.get() - logo.x
    const dy = pointerY.get() - logo.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const boost = distance > 28 ? 0 : ((28 - distance) / 28) * 0.45
    return 0.25 + boost * pointerOpacity.get()
  })
  const spotlightBrightness = useTransform(() => {
    if (!shouldAnimate) return 1
    const dx = pointerX.get() - logo.x
    const dy = pointerY.get() - logo.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > 28) return 1
    return 1 + ((28 - distance) / 28) * 0.22 * pointerOpacity.get()
  })

  return (
    <motion.div
      className="absolute pointer-events-auto"
      style={{
        left: `${logo.x}%`,
        top: `${logo.y}%`,
        width: logo.size,
        height: logo.size,
        color: logo.color,
      }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: logo.delay + 0.8,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="group relative h-full w-full"
        animate={shouldAnimate ? { y: floatY, x: floatX } : {}}
        transition={shouldAnimate ? {
          duration: logo.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: logo.delay,
        } : {}}
        whileHover={
          shouldAnimate
            ? {
                scale: 1.18,
                zIndex: 4,
              }
            : {}
        }
        title={logo.label}
      >
        {/* glow halo */}
        <motion.div
          className="absolute inset-0 scale-110 rounded-full blur-md transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: logo.color }}
          animate={
            shouldAnimate
              ? {
                  opacity: [0.12, 0.24, 0.12],
                }
              : { opacity: 0.14 }
          }
          whileHover={{
            opacity: 0.9,
            scale: 1.55,
          }}
          transition={
            shouldAnimate
              ? {
                  opacity: {
                    duration: logo.floatDuration * 0.9,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: logo.delay,
                  },
                  scale: { duration: 0.22 },
                }
              : { duration: 0.22 }
          }
        />
        <motion.div
          style={{
            scale: spotlightScale,
            filter: useMotionTemplate`brightness(${spotlightBrightness})`,
          }}
          whileHover={{
            filter: 'brightness(1.35)',
          }}
          className="h-full w-full"
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-md scale-125"
            style={{ background: logo.color, opacity: spotlightGlow }}
            whileHover={{
              opacity: 0.95,
              scale: 1.8,
            }}
          />
          <logo.Icon />
        </motion.div>
        {/* tooltip */}
        <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            {logo.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Animated heading word ─────────────────────────────────────────────────
function HeroWord({
  children,
  delay,
  italic = false,
}: {
  children: React.ReactNode
  delay: number
  italic?: boolean
}) {
  return (
    <motion.span
      className={`block${italic ? ' italic text-stroke' : ''}`}
      initial={{ opacity: 0, y: 40, skewY: 2 }}
      animate={{ opacity: 1, y: 0, skewY: 0 }}
      transition={{ delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )
}

function HeroMetaCard({
  item,
  index,
  shouldAnimate,
  cardPullX,
  cardPullY,
}: {
  item: { label: string; value: string }
  index: number
  shouldAnimate: boolean
  cardPullX: MotionValue<number>
  cardPullY: MotionValue<number>
}) {
  const x = useTransform(cardPullX, (value: number) => value * (index === 1 ? 0.3 : index === 0 ? -0.7 : 0.7))
  const y = useTransform(cardPullY, (value: number) => value * (index === 1 ? -0.4 : 0.5))

  return (
    <motion.div
      className="group relative bg-background/90 px-4 py-4 backdrop-blur-sm sm:px-5"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.05 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: shouldAnimate ? x : 0,
        y: shouldAnimate ? y : 0,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent opacity-70" />
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {item.label}
      </p>
      <p className="text-sm font-semibold uppercase tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
        {item.value}
      </p>
    </motion.div>
  )
}

function SignalDotBadge({ dot, shouldAnimate }: { dot: SignalDot; shouldAnimate: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute"
      style={{
        left: `${dot.x}%`,
        top: `${dot.y}%`,
      }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: dot.delay + 0.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="relative h-2.5 w-2.5 rounded-full"
        style={{ background: dot.color }}
        animate={
          shouldAnimate
            ? {
                opacity: [0.35, 0.95, 0.35],
                scale: [1, 1.8, 1],
              }
            : {}
        }
        transition={
          shouldAnimate
            ? {
                duration: dot.duration,
                repeat: Infinity,
                delay: dot.delay,
                ease: 'easeInOut',
              }
            : {}
        }
      >
        <div className="absolute inset-0 rounded-full blur-md" style={{ background: dot.color }} />
      </motion.div>
    </motion.div>
  )
}

// ── Main exported hero ────────────────────────────────────────────────────
export function HeroClient() {
  const prefersReduced = useReducedMotion()
  const shouldAnimate = !prefersReduced
  const pointerX = useMotionValue(50)
  const pointerY = useMotionValue(50)
  const pointerOpacity = useSpring(0, { stiffness: 220, damping: 28 })
  const smoothX = useSpring(pointerX, { stiffness: 180, damping: 24 })
  const smoothY = useSpring(pointerY, { stiffness: 180, damping: 24 })
  const parallaxX = useTransform(smoothX, [0, 100], [-18, 18])
  const parallaxY = useTransform(smoothY, [0, 100], [-14, 14])
  const fieldDriftX = useTransform(smoothX, [0, 100], [-12, 12])
  const fieldDriftY = useTransform(smoothY, [0, 100], [-8, 8])
  const spotlightBackground = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(250,255,210,0.18) 0%, rgba(120,255,210,0.09) 16%, rgba(0,0,0,0) 34%)`
  const spotlightRing = useMotionTemplate`radial-gradient(circle at ${smoothX}% ${smoothY}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 12%, rgba(0,0,0,0) 24%)`
  const centerField = useMotionTemplate`radial-gradient(ellipse 40% 52% at ${useTransform(smoothX, [0, 100], [44, 56])}% ${useTransform(smoothY, [0, 100], [45, 55])}%, rgba(10,10,10,0) 0%, rgba(10,10,10,0.18) 46%, rgba(10,10,10,0.82) 100%)`
  const cardPullX = useTransform(smoothX, [0, 100], [-5, 5])
  const cardPullY = useTransform(smoothY, [0, 100], [-4, 4])
  const copyShiftX = useTransform(smoothX, [0, 50, 100], [7, 0, -7])
  const copyShiftY = useTransform(smoothY, [0, 50, 100], [5, 0, -5])
  const newsletterLift = useTransform(() => {
    if (!shouldAnimate) return 0
    const dx = smoothX.get() - 28
    const dy = smoothY.get() - 60
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > 22) return 0
    return -((22 - distance) / 22) * 8 * pointerOpacity.get()
  })
  const newsletterGlow = useTransform(() => {
    if (!shouldAnimate) return 0
    const dx = smoothX.get() - 28
    const dy = smoothY.get() - 60
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > 22) return 0
    return ((22 - distance) / 22) * 0.14 * pointerOpacity.get()
  })
  const highlightCards = [
    { label: 'Current Focus', value: 'L2, Custody, AI Delivery' },
    { label: 'Operating Mode', value: 'Architecture + Team Systems' },
    { label: 'Base', value: 'Ahmedabad · Global Projects' },
  ]

  return (
    <section
      className="relative overflow-hidden border-b border-border"
      onPointerMove={(event) => {
        if (!shouldAnimate) return
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set(((event.clientX - rect.left) / rect.width) * 100)
        pointerY.set(((event.clientY - rect.top) / rect.height) * 100)
        pointerOpacity.set(1)
      }}
      onPointerLeave={() => {
        pointerX.set(50)
        pointerY.set(50)
        pointerOpacity.set(0)
      }}
      >
      <div className="absolute inset-0 bg-background" />

      {/* Subtle dot-grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.45,
        }}
      />

      {/* Center-weighted vignette so background motion sits behind the copy */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 42% 60% at 50% 48%, transparent 0%, transparent 52%, hsl(var(--background) / 0.94) 78%, hsl(var(--background)) 100%)',
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[-12%] left-[-10%] hidden w-[34%] lg:block"
        animate={shouldAnimate ? { y: [0, -16, 0], x: [0, 10, 0] } : {}}
        transition={shouldAnimate ? { duration: 11, ease: 'easeInOut', repeat: Infinity } : {}}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(163,230,53,0.10)_0%,_rgba(163,230,53,0.04)_26%,_transparent_72%)] blur-3xl" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-[-16%] right-[-8%] hidden w-[38%] lg:block"
        animate={shouldAnimate ? { y: [0, 18, 0], x: [0, -14, 0] } : {}}
        transition={shouldAnimate ? { duration: 13, ease: 'easeInOut', repeat: Infinity, delay: 0.6 } : {}}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.11)_0%,_rgba(56,189,248,0.05)_24%,_transparent_70%)] blur-3xl" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background: spotlightBackground,
          opacity: pointerOpacity,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block mix-blend-screen"
        style={{
          background: spotlightRing,
          opacity: pointerOpacity,
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          x: shouldAnimate ? parallaxX : 0,
          y: shouldAnimate ? parallaxY : 0,
        }}
        >
        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 180C180 200 250 300 430 320C600 340 760 250 920 260C1090 272 1190 360 1436 330" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M24 480C190 430 290 520 470 500C640 480 740 390 910 395C1080 400 1200 470 1400 430" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M110 90C260 150 350 110 500 155C650 200 780 160 920 180C1070 200 1180 145 1320 190" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>

        <motion.div
          className="absolute inset-0"
          style={{
            x: shouldAnimate ? fieldDriftX : 0,
            y: shouldAnimate ? fieldDriftY : 0,
          }}
        >
          <div className="absolute left-[8%] top-[14%] h-px w-[26%] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-60" />
          <div className="absolute right-[8%] top-[32%] h-px w-[22%] bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent opacity-50" />
          <div className="absolute left-[18%] bottom-[20%] h-px w-[18%] bg-gradient-to-r from-transparent via-orange-300/25 to-transparent opacity-45" />
          {SIGNAL_DOTS.map((dot) => (
            <SignalDotBadge key={`${dot.x}-${dot.y}`} dot={dot} shouldAnimate={shouldAnimate} />
          ))}
        </motion.div>

        {LEFT_TECH_LOGOS.map((logo) => (
          <TechBadge
            key={`left-${logo.label}`}
            logo={logo}
            shouldAnimate={shouldAnimate}
            pointerX={smoothX}
            pointerY={smoothY}
            pointerOpacity={pointerOpacity}
          />
        ))}
        {RIGHT_TECH_LOGOS.map((logo) => (
          <TechBadge
            key={`right-${logo.label}`}
            logo={logo}
            shouldAnimate={shouldAnimate}
            pointerX={smoothX}
            pointerY={smoothY}
            pointerOpacity={pointerOpacity}
          />
        ))}

        <div className="absolute inset-y-0 left-[34%] w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-40" />
        <div className="absolute inset-y-0 right-[34%] w-px bg-gradient-to-b from-transparent via-border to-transparent opacity-40" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ background: centerField }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-[-20%] hidden w-[42%] lg:block"
        animate={shouldAnimate ? { x: ['0%', '180%'] } : {}}
        transition={shouldAnimate ? { duration: 10.5, ease: 'linear', repeat: Infinity, repeatDelay: 1.4 } : {}}
      >
        <div className="h-full w-full bg-gradient-to-r from-transparent via-primary/12 to-transparent blur-2xl" />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{ opacity: pointerOpacity }}
      >
        <motion.div
          className="absolute h-40 w-40 rounded-full border border-primary/25 bg-primary/6 blur-xl"
          style={{
            left: useMotionTemplate`calc(${smoothX}% - 5rem)`,
            top: useMotionTemplate`calc(${smoothY}% - 5rem)`,
            scale: 1.1,
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl xl:max-w-6xl 2xl:max-w-7xl 3xl:max-w-[1440px] px-6 sm:px-12 py-20 md:py-28">
        <motion.div
          className="flex-1 max-w-3xl"
          style={{
            x: shouldAnimate ? copyShiftX : 0,
            y: shouldAnimate ? copyShiftY : 0,
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[10%] hidden h-[72%] w-[56%] lg:block"
            style={{
              background:
                'linear-gradient(90deg, hsl(var(--background) / 0.96) 0%, hsl(var(--background) / 0.82) 48%, transparent 100%)',
            }}
          />
          <motion.div
            className="mb-8 flex max-w-full items-start gap-3"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary/80 to-transparent" aria-hidden="true" />
            <p className="min-w-0 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Distributed Systems & Blockchain Architect · Ahmedabad, India
            </p>
          </motion.div>

          <h1
            className="font-extrabold uppercase leading-[0.85] tracking-tighter mb-12"
            style={{ fontSize: 'clamp(3rem, 9vw, 10rem)' }}
          >
            <HeroWord delay={0.2}>Building</HeroWord>
            <HeroWord delay={0.35} italic>What&apos;s</HeroWord>
            <HeroWord delay={0.5}>Next.</HeroWord>
          </h1>

          <motion.div
            className="max-w-[420px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-base leading-[1.7] text-muted-foreground mb-8">
              Seven years building blockchain infrastructure, custody systems, and AI-augmented engineering workflows for teams shipping under real delivery pressure.
              Writing weekly about architecture, execution, and what holds up in production.
            </p>
            <motion.div
              style={{
                y: shouldAnimate ? newsletterLift : 0,
                boxShadow: useMotionTemplate`0 0 0 1px rgba(163,230,53,${newsletterGlow}), 0 18px 48px rgba(0,0,0,${newsletterGlow})`,
              }}
              className="rounded-sm"
            >
              <NewsletterForm />
            </motion.div>
            <p className="font-mono text-[10px] text-muted-foreground mt-3 tracking-widest uppercase">
              Free · Weekly · No Spam
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/work-with-me"
                className="inline-flex cursor-pointer items-center bg-primary px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors duration-200 hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Book a Call →
              </Link>
              <Link
                href="/about"
                className="inline-flex cursor-pointer items-center border border-border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                About Neel →
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-px bg-border sm:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {highlightCards.map((item, index) => (
              <HeroMetaCard
                key={item.label}
                item={item}
                index={index}
                shouldAnimate={shouldAnimate}
                cardPullX={cardPullX}
                cardPullY={cardPullY}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile: compact signal band ────────────────────────── */}
      <motion.div
        className="pointer-events-none mt-12 lg:hidden select-none"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="border border-border bg-background/70 px-4 py-4 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Tech stack
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              In production
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {TECH_LOGOS.slice(0, 12).map((logo, index) => (
              <motion.div
                key={logo.label}
                className="border border-border bg-background/80 px-2 py-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + index * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div style={{ width: 20, height: 20, color: logo.color }}>
                    <logo.Icon />
                  </div>
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: logo.color }} />
                </div>
                <span className="block truncate font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
                  {logo.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
