export function ServiceCard({
  title,
  description,
  index,
}: {
  title: string
  description: string
  index?: number
}) {
  const num = index !== undefined ? String(index + 1).padStart(2, '0') : null

  return (
    <div className="group flex items-start gap-5 py-6 border-b border-border last:border-0 hover:bg-white/[0.015] transition-colors duration-200">
      {num && (
        <span className="font-mono text-sm text-primary shrink-0 w-7 pt-0.5 select-none">{num}</span>
      )}
      <div>
        <h3 className="font-bold text-base group-hover:text-primary transition-colors duration-200">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
