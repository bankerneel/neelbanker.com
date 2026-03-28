export function ServiceCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-5">
      <h3 className="mb-1 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
