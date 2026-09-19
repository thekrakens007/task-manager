import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function AccountHelpDialog({
  mode,
  onClose,
}: {
  mode: "password" | "access" | null
  onClose: () => void
}) {
  return (
    <Dialog
      open={mode !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "password"
              ? "Recover your account"
              : "Join your workspace"}
          </DialogTitle>
          <DialogDescription>
            {mode === "password"
              ? "Contact your workspace administrator to reset your password. If you normally sign in with Google, use Continue with Google on the login page."
              : "Ask your workspace administrator to create an account for you and share your login details."}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onClose}>Back to login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
