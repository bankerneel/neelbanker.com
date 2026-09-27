/**
 * A hand-lettered word with an underline that draws itself as it scrolls in
 * (app/motion.css: `.scribble`, `.sd-draw`). Its colour follows `.hand-ink`,
 * so it reads on paper and on coloured bands alike.
 */
export function Scribbled({ children }: { children: string }) {
  return (
    <span className="hand hand-ink relative inline-block text-[1.15em] font-normal lowercase">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 16"
        preserveAspectRatio="none"
        className="sd-draw scribble"
        fill="none"
        vectorEffect="non-scaling-stroke"
      >
        <path
          pathLength={1}
          d="M3 11 C 38 3, 74 15, 112 8 S 172 5, 197 10"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </span>
  )
}

/** The sprocketed film strip that fills along the top edge as the page scrolls. */
export function FilmProgress() {
  return <div aria-hidden="true" className="film-progress" />
}
