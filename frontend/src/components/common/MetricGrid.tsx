import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export function MetricGrid({
  metrics,
}: {
  metrics: readonly { label: string; value: string; note: string }[]
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <Card key={metric.label}>
          <CardHeader className="gap-2">
            <CardDescription>{metric.label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">
              {metric.value}
            </CardTitle>
            <p className="text-xs text-muted-foreground">{metric.note}</p>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
