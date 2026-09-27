import type { Metadata } from 'next'
import { getAllProjectMeta } from '@/lib/mdx'
import { cn } from '@/lib/utils'
import { ProjectBrowser } from '@/components/project-browser'
import { PageIntro } from '@/components/bazaar/page-intro'
import { Scrap } from '@/components/bazaar/scrap'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Real blockchain systems I have designed and shipped — with lessons learned.',
}

const signals = [
  { label: 'Wallet & custody', value: 'NCW, Fireblocks, BitGo, ERC-4337', tone: 'tone-butter', tilt: 'rotate-[2.5deg]' },
  { label: 'Chains & infrastructure', value: 'OP Stack, Fabric, custom EVM, bridge systems', tone: 'tone-sage', tilt: '-rotate-2' },
  { label: 'AI systems', value: 'Agent workflows, local LLMs, ranking and orchestration', tone: 'tone-sky', tilt: 'rotate-[1.5deg]' },
]

export default function ProjectsPage() {
  const projects = getAllProjectMeta()

  return (
    <>
      <PageIntro
        crumbs={[
          { href: '/', label: '← Home' },
          { href: '/work-with-me', label: 'Work with me' },
        ]}
        kicker="Proof of work ✦"
        title="Projects"
      >
        <div className="relative z-10 mt-10 flex flex-col gap-10 lg:mt-12 lg:flex-row lg:items-start">
          <Scrap className="w-full max-w-[520px] -rotate-[1.2deg]" paperClassName="tone-panel px-7 py-9 sm:px-9">
            <p className="text-[1.06rem] font-medium leading-[1.7]">
              Systems designed and shipped. Every entry includes the problem, architecture decisions, and what I&apos;d
              do differently.
            </p>
            <p className="hand mt-4 text-[1.5rem] leading-none text-dm-accent-ink">codenames where NDAs apply</p>
          </Scrap>

          <ul className="flex flex-col gap-5 lg:-ml-6 lg:mt-8 lg:w-[340px]">
            {signals.map((signal, i) => (
              <li
                key={signal.label}
                className={cn('border-2 border-current p-4 shadow-hard', signal.tone, signal.tilt, i > 0 && 'lg:-mt-2')}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">{signal.label}</p>
                <p className="mt-1.5 text-[15px] font-semibold leading-[1.45]">{signal.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </PageIntro>

      <div className="mt-24">
        <ProjectBrowser projects={projects} />
      </div>
    </>
  )
}
