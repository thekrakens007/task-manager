import { useState } from "react"
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { downloadCsv } from "@/lib/download-csv"
import {
  auditEntries,
  deletionEntries,
  type LedgerEntry,
} from "../data/governance"

export function ActivityLedger({ kind }: { kind: "audit" | "deletions" }) {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<LedgerEntry | null>(null)
  const isAudit = kind === "audit"
  const entries = isAudit ? auditEntries : deletionEntries
  const visible = entries.filter((entry) =>
    `${entry.title} ${entry.actor} ${entry.category} ${entry.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  const title = isAudit ? "Audit log" : "Deletion records"
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        section="Governance"
        title={title}
        description={
          isAudit
            ? "Trace administrative changes and review account activity."
            : "Follow closure requests, retention cleanup, and completed removals."
        }
        actions={
          <Button
            variant="outline"
            size="lg"
            onClick={() =>
              downloadCsv(`${kind}.csv`, [
                ["Reference", "Record", "Actor", "Category", "Date", "Status"],
                ...visible.map((entry) => [
                  entry.id,
                  entry.title,
                  entry.actor,
                  entry.category,
                  entry.time,
                  entry.status,
                ]),
              ])
            }
          >
            <ArrowDownTrayIcon />
            Export records
          </Button>
        }
      />
      <Card>
        <CardHeader>
          <CardTitle>
            {isAudit ? "Activity history" : "Request history"}
          </CardTitle>
          <CardDescription>
            {isAudit
              ? "A chronological record of workspace events."
              : "Review request details without changing or deleting an account."}
          </CardDescription>
          <Input
            aria-label={`Search ${title.toLowerCase()}`}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search records, people, or status…"
            className="mt-3 sm:max-w-sm"
          />
        </CardHeader>
        <CardContent>
          <RecordCollection
            records={visible}
            title={(entry) => entry.title}
            columns={[
              {
                label: "Record",
                render: (entry) => (
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">{entry.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {entry.id}
                    </span>
                  </div>
                ),
              },
              { label: "Actor", render: (entry) => entry.actor },
              { label: "Category", render: (entry) => entry.category },
              {
                label: "Status",
                render: (entry) => (
                  <Badge variant="outline">{entry.status}</Badge>
                ),
              },
              { label: "Date", render: (entry) => entry.time },
            ]}
            actions={(entry) => (
              <Button
                size="sm"
                variant="outline"
                aria-label={`View ${entry.id}`}
                onClick={() => setSelected(entry)}
              >
                Details
              </Button>
            )}
          />
          <p className="mt-4 text-xs text-muted-foreground" aria-live="polite">
            Showing {visible.length} of {entries.length} records
          </p>
        </CardContent>
      </Card>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.title}</DialogTitle>
            <DialogDescription>
              {selected?.id} · {selected?.time}
            </DialogDescription>
          </DialogHeader>
          <p className="leading-6">{selected?.detail}</p>
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-muted-foreground">Actor</dt>
              <dd className="mt-1">{selected?.actor}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>
              <dd className="mt-1">{selected?.status}</dd>
            </div>
          </dl>
        </DialogContent>
      </Dialog>
    </section>
  )
}
