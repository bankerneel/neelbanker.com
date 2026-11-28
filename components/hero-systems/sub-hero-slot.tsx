import { SubHeroGate } from './sub-hero-gate'

const ERA_LINKS = [
  { k: 'case study', t: 'DocTrace on Hyperledger Fabric', chip: 'DocTrace on Fabric', href: '/projects/doctrace-fabric-documents' },
  { k: 'case study', t: 'Project Atlas · multi-chain wallet', chip: 'Project Atlas', href: '/projects/atlas-multichain-wallet' },
  { k: 'writing', t: 'AI agents that execute on chain', chip: 'AI agents on chain', href: '/writing/ai-agents-on-chain' },
] as const

/**
 * Server-rendered placeholder. It reserves the exact 340vh pinned box and
 * owns the real heading, the canvas element, the aria-hidden readout and all
 * three links, so none of that markup or data ships in the client bundle.
 * The tiny client gate mounts the canvas engine on intersection.
 */
export function SubHeroSlot() {
  return (
    <>
      <section id="sub" className="sub-hero" data-sub-hero aria-labelledby="sub-heading">
        <div id="subStage" className="sub-stage">
          <canvas className="sub-canvas" aria-hidden="true" />

          <div className="page-wrap sub-pw">
            <div id="subHead" className="sub-head">
              <span className="ticket tone-panel -rotate-1">Seven years, three eras</span>
              <h2 id="sub-heading">
                Blockchain <span className="text-dm-accent-ink">→</span> Web3 <span className="text-dm-accent-ink">→</span> AI agents
              </h2>
              <p>Scroll to walk through the work. Each era links to the real thing: a case study or a post.</p>
              <span className="sub-hand hand">keep scrolling ↓</span>
            </div>
          </div>

          <a
            id="eraLink"
            className="sub-era-link cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel"
            href={ERA_LINKS[0].href}
            data-visible="false"
          >
            <b>{ERA_LINKS[0].k}</b> {ERA_LINKS[0].chip} →
          </a>

          <div id="subLabel" className="sub-label" aria-hidden="true" />

          <ul className="sub-sr-links" aria-label="All three eras">
            {ERA_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel"
                >
                  <b>{link.k}</b> {link.t} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <SubHeroGate />
    </>
  )
}
