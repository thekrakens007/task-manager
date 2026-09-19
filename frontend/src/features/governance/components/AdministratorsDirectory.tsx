import { useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"
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
import { administrators } from "../data/governance"
import { InviteAdministrator } from "./InviteAdministrator"

export function AdministratorsDirectory() {
  const [people, setPeople] = useState(administrators)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState("")
  const visible = people.filter((person) =>
    `${person.name} ${person.email} ${person.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        section="Governance"
        title="Administrators"
        description="Review who can manage the workspace and prepare new invitations."
        actions={
          <Button size="lg" onClick={() => setOpen(true)}>
            <PlusIcon />
            Invite administrator
          </Button>
        }
      />
      {notice && (
        <p role="status" className="text-sm text-muted-foreground">
          {notice}
        </p>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Workspace access</CardTitle>
          <CardDescription>
            {people.length} administrators and pending invitations.
          </CardDescription>
          <Input
            aria-label="Search administrators"
            placeholder="Search name, email, or role…"
            className="mt-3 sm:max-w-sm"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </CardHeader>
        <CardContent>
          <RecordCollection
            records={visible}
            title={(person) => (
              <span className="flex flex-col gap-1">
                {person.name}
                <span className="text-xs font-normal break-all text-muted-foreground">
                  {person.email}
                </span>
              </span>
            )}
            columns={[
              {
                label: "Administrator",
                render: (person) => (
                  <span className="flex flex-col gap-1 font-medium">
                    {person.name}
                    <span className="text-xs font-normal text-muted-foreground">
                      {person.email}
                    </span>
                  </span>
                ),
              },
              { label: "Role", render: (person) => person.role },
              {
                label: "Status",
                render: (person) => (
                  <Badge
                    variant={
                      person.status === "Active" ? "secondary" : "outline"
                    }
                  >
                    {person.status}
                  </Badge>
                ),
              },
              { label: "Last active", render: (person) => person.lastActive },
            ]}
          />
        </CardContent>
      </Card>
      <InviteAdministrator
        open={open}
        onClose={() => setOpen(false)}
        existingEmails={people.map((person) => person.email)}
        onInvite={(values) => {
          setPeople((current) => [
            ...current,
            {
              ...values,
              id: crypto.randomUUID(),
              role: "Administrator",
              status: "Invited",
              lastActive: "Not yet signed in",
            },
          ])
          setNotice(`Invitation prepared for ${values.name}.`)
          setSearch("")
        }}
      />
    </section>
  )
}
