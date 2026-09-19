import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"

interface SignOutDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isPending?: boolean
  /** "current" = sign out this session only, "all" = sign out all sessions */
  mode?: "current" | "all"
}

export function SignOutDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
  mode = "current",
}: SignOutDialogProps) {
  const isAll = mode === "all"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <div className="mb-1 flex items-center gap-3">
            <ArrowRightOnRectangleIcon className="h-5 w-5 shrink-0 text-destructive" />
            <DialogTitle>
              {isAll ? "Sign out of all sessions?" : "Sign out?"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {isAll
              ? "This will immediately end every active session, including this one. You'll need to sign in again on all your devices."
              : "You'll be signed out of your current session and redirected to the login page."}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive-outline"
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Signing out…
              </span>
            ) : isAll ? (
              "Sign out all sessions"
            ) : (
              "Sign out"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
