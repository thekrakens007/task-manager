import { useState } from "react"
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { downloadCsv } from "@/lib/download-csv"
import { users, type WorkspaceUser } from "../data/users"
import { UserDetails } from "./UserDetails"

export function UsersDirectory() {
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<WorkspaceUser | null>(null)
  const query = search.trim().toLowerCase()
  const visibleUsers = users.filter((user) =>
    [user.name, user.email, user.status, user.plan].some((text) =>
      text.toLowerCase().includes(query)
    )
  )
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            User management
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm leading-6 text-muted-foreground">
            People, accounts, and access across your workspace.
          </p>
        </div>
        <Button
          variant="outline"
          size="lg"
          onClick={() =>
            downloadCsv("workspace-users.csv", [
              ["Name", "Email", "Role", "Plan", "Status"],
              ...visibleUsers.map((user) => [
                user.name,
                user.email,
                user.role,
                user.plan,
                user.status,
              ]),
            ])
          }
        >
          <ArrowDownTrayIcon data-icon="inline-start" />
          Export users
        </Button>
      </header>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <CardTitle>
                User directory{" "}
                <span className="ml-1 text-sm text-muted-foreground">
                  {users.length}
                </span>
              </CardTitle>
              <CardDescription>
                Review account details and membership.
              </CardDescription>
            </div>
            <Input
              aria-label="Search users"
              placeholder="Search name, email, or status…"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              leftIcon={<MagnifyingGlassIcon />}
              className="w-full sm:max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Last active</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibleUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <UserIdentity user={user} />
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active" ? "secondary" : "outline"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.plan}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label={"View " + user.name}
                        onClick={() => setSelected(user)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col divide-y md:hidden">
            {visibleUsers.map((user) => (
              <article
                key={user.id}
                className="flex flex-col gap-4 py-5 first:pt-0"
              >
                <UserIdentity user={user} />
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant={
                        user.status === "Active" ? "secondary" : "outline"
                      }
                    >
                      {user.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {user.plan} · {user.role}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    aria-label={"View " + user.name}
                    onClick={() => setSelected(user)}
                  >
                    Details
                  </Button>
                </div>
              </article>
            ))}
          </div>
          {visibleUsers.length === 0 && (
            <div
              className="flex flex-col items-center gap-3 py-12 text-center"
              role="status"
            >
              <MagnifyingGlassIcon className="size-6 text-muted-foreground" />
              <p className="font-medium">No users found</p>
              <p className="text-sm text-muted-foreground">
                Try a different name, email, plan, or status.
              </p>
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear search
              </Button>
            </div>
          )}
          <p className="pt-4 text-xs text-muted-foreground" aria-live="polite">
            Showing {visibleUsers.length} of {users.length} users
          </p>
        </CardContent>
      </Card>
      <UserDetails user={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function UserIdentity({ user }: { user: WorkspaceUser }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="size-10">
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((part) => part[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col gap-1">
        <p className="truncate text-sm font-medium">{user.name}</p>
        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
      </div>
    </div>
  )
}
