import { useNavigate } from "react-router-dom"
import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline"
import { NumberTicker } from "@/components/motion/number-ticker"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { downloadCsv } from "@/lib/download-csv"
import { PerformanceCharts } from "./PerformanceCharts"

const metrics = [
  {
    label: "Total users",
    value: 12480,
    change: "+12.4%",
    note: "vs. previous month",
    prefix: "",
    suffix: "",
  },
  {
    label: "Active subscriptions",
    value: 1842,
    change: "+8.2%",
    note: "vs. previous month",
    prefix: "",
    suffix: "",
  },
  {
    label: "Monthly revenue",
    value: 28460,
    change: "+7.1%",
    note: "vs. previous month",
    prefix: "$",
    suffix: "",
  },
  {
    label: "Completion rate",
    value: 98.2,
    change: "+1.8%",
    note: "vs. previous month",
    prefix: "",
    suffix: "%",
  },
]
const activity = [
  {
    name: "Olivia Rhye",
    action: "upgraded to the Pro plan",
    time: "12 min ago",
    initials: "OR",
  },
  {
    name: "Phoenix Baker",
    action: "completed account setup",
    time: "38 min ago",
    initials: "PB",
  },
  {
    name: "Lana Steiner",
    action: "joined the workspace",
    time: "1 hour ago",
    initials: "LS",
  },
  {
    name: "Demi Wilkinson",
    action: "renewed an annual subscription",
    time: "2 hours ago",
    initials: "DW",
  },
]
const health = [
  { name: "Authentication", detail: "Sign-in and session services" },
  { name: "Data processing", detail: "All jobs processed successfully" },
  { name: "Notifications", detail: "Delivery queue is up to date" },
]

export function DashboardOverview() {
  const navigate = useNavigate()
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Workspace overview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            A closer look at your users, growth, and daily operations.
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          className="shrink-0"
          onClick={() =>
            downloadCsv("workspace-overview.csv", [
              ["Metric", "Value", "Change"],
              ...metrics.map((m) => [m.label, m.value, m.change]),
            ])
          }
        >
          <ArrowDownTrayIcon data-icon="inline-start" />
          Export overview
        </Button>
      </header>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader>
              <CardDescription>{metric.label}</CardDescription>
              <CardTitle>
                <NumberTicker
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  locale
                  duration={0.55}
                  stagger={0.025}
                  className="text-2xl font-semibold tracking-tight"
                />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap items-center gap-1 text-xs">
                <ArrowUpRightIcon className="size-3.5 text-success" />
                <span className="font-medium text-success">
                  {metric.change}
                </span>
                <span className="hidden text-muted-foreground sm:inline">
                  {metric.note}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <PerformanceCharts />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              The latest changes across your workspace.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col divide-y">
            {activity.map((item) => (
              <div key={item.name} className="flex gap-3 py-4 first:pt-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {item.initials}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <p className="text-sm leading-5">
                    <span className="font-medium">{item.name}</span>{" "}
                    <span className="text-muted-foreground">
                      {item.action}.
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
            <Button
              variant="ghost"
              className="mt-2 w-full"
              onClick={() => navigate("/users")}
            >
              View users
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Operational status</CardTitle>
            <CardDescription>
              A snapshot of core workspace services.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <Badge variant="secondary" className="self-start">
              <CheckCircleIcon />
              All systems operational
            </Badge>
            {health.map((item) => (
              <div
                key={item.name}
                className="flex items-start justify-between gap-3"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-success">
                  <span className="size-1.5 rounded-full bg-success" />
                  Healthy
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
