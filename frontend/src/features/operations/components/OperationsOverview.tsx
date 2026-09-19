import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { PageHeader } from "@/components/common/PageHeader"
import { MetricGrid } from "@/components/common/MetricGrid"
import { RecordCollection } from "@/components/common/RecordCollection"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

interface Job {
  id: string
  name: string
  queue: string
  status: "Completed" | "Failed" | "Queued"
  time: string
}
const initialJobs: Job[] = [
  {
    id: "job-1048",
    name: "Workspace export",
    queue: "Exports",
    status: "Failed",
    time: "08 Sep, 09:42",
  },
  {
    id: "job-1047",
    name: "Subscription sync",
    queue: "Billing",
    status: "Completed",
    time: "08 Sep, 09:40",
  },
  {
    id: "job-1046",
    name: "Account notifications",
    queue: "Messages",
    status: "Queued",
    time: "08 Sep, 09:38",
  },
  {
    id: "job-1045",
    name: "Usage aggregation",
    queue: "Analytics",
    status: "Completed",
    time: "08 Sep, 09:35",
  },
  {
    id: "job-1044",
    name: "Profile indexing",
    queue: "Search",
    status: "Completed",
    time: "08 Sep, 09:32",
  },
]

export function OperationsOverview() {
  const [jobs, setJobs] = useState(initialJobs)
  const [search, setSearch] = useState("")
  const retry = useMutation({
    mutationFn: (id: string) =>
      new Promise<string>((resolve) =>
        window.setTimeout(() => resolve(id), 600)
      ),
    onSuccess: (id) =>
      setJobs((current) =>
        current.map((job) =>
          job.id === id ? { ...job, status: "Queued" } : job
        )
      ),
  })
  const visible = jobs.filter((job) =>
    `${job.name} ${job.queue} ${job.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        section="Workspace"
        title="Operations"
        description="Track background work, review failures, and keep queues moving."
      />
      <MetricGrid
        metrics={[
          {
            label: "Completed",
            value: String(
              jobs.filter((job) => job.status === "Completed").length
            ),
            note: "Recent jobs",
          },
          {
            label: "In queue",
            value: String(jobs.filter((job) => job.status === "Queued").length),
            note: "Waiting to be processed",
          },
          {
            label: "Needs attention",
            value: String(jobs.filter((job) => job.status === "Failed").length),
            note: "Available to retry",
          },
        ]}
      />
      <Card>
        <CardHeader>
          <CardTitle>Recent jobs</CardTitle>
          <CardDescription>
            Search a queue or status to narrow the list.
          </CardDescription>
          <Input
            aria-label="Search jobs"
            placeholder="Search jobs, queues, or status…"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mt-3 sm:max-w-sm"
          />
        </CardHeader>
        <CardContent>
          <RecordCollection
            records={visible}
            title={(job) => job.name}
            columns={[
              {
                label: "Job",
                render: (job) => (
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{job.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {job.id}
                    </span>
                  </div>
                ),
              },
              { label: "Queue", render: (job) => job.queue },
              {
                label: "Status",
                render: (job) => (
                  <Badge
                    variant={
                      job.status === "Failed" ? "destructive" : "secondary"
                    }
                  >
                    {job.status}
                  </Badge>
                ),
              },
              { label: "Created", render: (job) => job.time },
            ]}
            actions={(job) =>
              job.status === "Failed" ? (
                <Button
                  size="sm"
                  variant="outline"
                  disabled={retry.isPending}
                  onClick={() => retry.mutate(job.id)}
                >
                  {retry.isPending ? "Queuing…" : "Retry job"}
                </Button>
              ) : null
            }
          />
          {retry.isSuccess && (
            <p role="status" className="mt-4 text-sm text-muted-foreground">
              The job is back in the queue.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
