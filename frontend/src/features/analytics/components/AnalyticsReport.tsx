import { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useReducedMotion } from "motion/react"
import { ArrowDownTrayIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { MetricGrid } from "@/components/common/MetricGrid"
import { RecordCollection } from "@/components/common/RecordCollection"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { downloadCsv } from "@/lib/download-csv"
import { getReportRows, reports, type ReportKind } from "../data/reports"

export function AnalyticsReport({ kind }: { kind: ReportKind }) {
  const [months, setMonths] = useState<3 | 6>(6)
  const report = reports[kind]
  const rows = getReportRows(kind, months)
  const latest = rows.at(-1)?.value ?? 0
  const first = rows[0]?.value ?? 0
  const previous = rows.at(-2)?.value ?? 0
  const reduce = useReducedMotion()
  const format = (value: number) => value.toLocaleString("en-US") + report.unit
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        section="Analytics"
        title={report.title}
        description={report.description}
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" size="lg" />}
              >
                Last {months} months
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {([3, 6] as const).map((value) => (
                  <DropdownMenuItem
                    key={value}
                    onClick={() => setMonths(value)}
                  >
                    Last {value} months
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                downloadCsv(`${kind}-analytics.csv`, [
                  ["Month", report.metric],
                  ...rows.map((row) => [row.month + " 2026", row.value]),
                ])
              }
            >
              <ArrowDownTrayIcon />
              Export report
            </Button>
          </>
        }
      />
      <MetricGrid
        metrics={[
          { label: report.metric, value: format(latest), note: "August 2026" },
          {
            label: "Previous month",
            value: format(previous),
            note: "July 2026",
          },
          {
            label: "Period change",
            value: first
              ? `+${(((latest - first) / first) * 100).toFixed(1)}%`
              : "—",
            note: `Relative change over ${months} months`,
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>{report.metric}</CardTitle>
          <CardDescription>
            Monthly values for the selected period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              value: { label: report.metric, color: "var(--chart-2)" },
            }}
            className="h-64 w-full sm:h-80"
            aria-label={`${report.metric} from ${format(first)} to ${format(latest)}`}
          >
            <AreaChart
              data={rows}
              accessibilityLayer
              margin={{ left: 0, right: 8, top: 16, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                interval={0}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                width={40}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) =>
                  Number(value) >= 1000
                    ? `${Number(value) / 1000}k`
                    : String(value)
                }
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                isAnimationActive={!reduce}
                dataKey="value"
                type="monotone"
                stroke="var(--color-value)"
                fill="var(--color-value)"
                fillOpacity={0.12}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly breakdown</CardTitle>
          <CardDescription>The values behind this report.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecordCollection
            records={rows}
            title={(row) => row.month + " 2026"}
            columns={[
              { label: "Month", render: (row) => row.month + " 2026" },
              { label: report.metric, render: (row) => format(row.value) },
            ]}
          />
        </CardContent>
      </Card>
    </section>
  )
}
