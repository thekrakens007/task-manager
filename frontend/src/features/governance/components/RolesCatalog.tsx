import { useState } from "react"
import { CheckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { roles } from "../data/governance"

export function RolesCatalog() {
  const [selected, setSelected] = useState<(typeof roles)[number] | null>(null)
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        section="Governance"
        title="Roles"
        description="Understand each level of access before assigning it to an administrator."
      />
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.name}>
            <CardHeader className="gap-3">
              <ShieldCheckIcon className="size-6 text-muted-foreground" />
              <CardTitle>{role.name}</CardTitle>
              <CardDescription className="leading-6">
                {role.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Badge variant="secondary" className="self-start">
                {role.members} {role.members === 1 ? "member" : "members"}
              </Badge>
              <ul className="flex flex-col gap-3">
                {role.permissions.slice(0, 3).map((permission) => (
                  <li key={permission} className="flex gap-2 text-sm">
                    <CheckIcon className="size-4 shrink-0 text-success" />
                    {permission}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelected(role)}
              >
                View {role.name.toLowerCase()} permissions
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Dialog
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null)
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.name} permissions</DialogTitle>
            <DialogDescription>{selected?.description}</DialogDescription>
          </DialogHeader>
          <ul className="flex flex-col gap-3 py-2">
            {selected?.permissions.map((permission) => (
              <li key={permission} className="flex items-center gap-3">
                <CheckIcon className="size-4 text-success" />
                {permission}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </section>
  )
}
