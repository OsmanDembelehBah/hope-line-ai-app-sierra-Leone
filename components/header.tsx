export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="gradient-calm rounded-b-2xl p-6 pb-8">
      <h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </header>
  )
}
