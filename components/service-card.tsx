export function ServiceCard({
  title,
  description,
  index,
  meta,
}: {
  title: string
  description: string
  index?: number
  meta?: string
}) {
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null

  return (
    <div className="group grid grid-cols-1 md:grid-cols-4 md:items-center gap-2 md:gap-6 py-8 border-t border-border hover:bg-white/[0.015] transition-colors duration-200">
      {num && (
        <span className="font-mono text-xs text-muted-foreground select-none">{num}</span>
      )}
      <div className={num ? 'md:col-span-2' : 'md:col-span-3'}>
        <h3 className="font-bold text-xl sm:text-2xl uppercase tracking-tight group-hover:text-primary transition-colors duration-200 mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
      {meta && (
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest md:text-right">
          {meta}
        </span>
      )}
    </div>
  )
}
