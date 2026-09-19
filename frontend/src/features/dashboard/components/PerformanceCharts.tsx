import { useReducedMotion } from "motion/react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

const growth = [
  { month: "Mar", users: 7300 },
  { month: "Apr", users: 8100 },
  { month: "May", users: 8800 },
  { month: "Jun", users: 9700 },
  { month: "Jul", users: 11103 },
  { month: "Aug", users: 12480 },
]
const plans = [
  { plan: "Free", users: 640 },
  { plan: "Starter", users: 480 },
  { plan: "Pro", users: 920 },
  { plan: "Business", users: 442 },
]
const growthConfig = {
  users: { label: "Users", color: "var(--chart-2)" },
} satisfies ChartConfig
const planConfig = {
  users: { label: "Users", color: "var(--chart-1)" },
} satisfies ChartConfig

export function PerformanceCharts() {
  const reduce = useReducedMotion()
  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="min-w-0 xl:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <CardTitle>User growth</CardTitle>
              <Badge variant="outline">Mar – Aug 2026</Badge>
            </div>
            <CardDescription>Your community, month by month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={growthConfig}
              className="h-60 w-full sm:h-72"
              aria-label="User growth from 7,300 in March to 12,480 in August"
            >
              <AreaChart
                accessibilityLayer
                data={growth}
                margin={{ left: 8, right: 8, top: 12, bottom: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  isAnimationActive={!reduce}
                  dataKey="users"
                  type="monotone"
                  fill="var(--color-users)"
                  fillOpacity={0.12}
                  stroke="var(--color-users)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Plan distribution</CardTitle>
          <CardDescription>Active users by subscription plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={planConfig}
            className="h-60 w-full sm:h-72"
            aria-label="Plan distribution: Free 640, Starter 480, Pro 920, Business 442"
          >
            <BarChart
              accessibilityLayer
              data={plans}
              margin={{ left: 4, right: 4, top: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="plan"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar
                isAnimationActive={!reduce}
                dataKey="users"
                fill="var(--color-users)"
                radius={[5, 5, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
