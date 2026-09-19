import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { WorkspaceUser } from "../data/users"

export function UserDetails({
  user,
  onClose,
}: {
  user: WorkspaceUser | null
  onClose: () => void
}) {
  return (
    <Dialog
      open={user !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user?.name ?? "User details"}</DialogTitle>
          <DialogDescription>{user?.email}</DialogDescription>
        </DialogHeader>
        {user && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 py-2">
            {Object.entries({
              "User ID": user.id,
              Status: user.status,
              Role: user.role,
              Plan: user.plan,
              Joined: user.joined,
              "Last active": user.lastActive,
            }).map(([label, value]) => (
              <div key={label} className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="text-sm font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
