import type { ReactNode } from "react"

export function PageHeader({
  title,
  description,
  section,
  actions,
}: {
  title: string
  description: string
  section: string
  actions?: ReactNode
}) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
      <div className="flex min-w-0 flex-col gap-2">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {section}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>
      {actions && (
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          {actions}
        </div>
      )}
    </header>
  )
}
