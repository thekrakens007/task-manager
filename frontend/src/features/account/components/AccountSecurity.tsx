import { useState } from "react"
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline"
import { PageHeader } from "@/components/common/PageHeader"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
  DialogFooter,
} from "@/components/ui/dialog"
import { useSession } from "@/features/auth/hooks/use-session"

const otherSessions = [
  {
    id: "session-2",
    name: "Safari on iPhone",
    detail: "Last active yesterday",
    mobile: true,
  },
  {
    id: "session-3",
    name: "Chrome on macOS",
    detail: "Last active 3 days ago",
    mobile: false,
  },
]
export function AccountSecurity() {
  const { session } = useSession()
  const [devices, setDevices] = useState(otherSessions)
  const [selected, setSelected] = useState<
    (typeof otherSessions)[number] | null
  >(null)
  const [notice, setNotice] = useState("")
  return (
    <section className="flex flex-col gap-6">
      <PageHeader
        section="Account"
        title="Security"
        description="Review your account identity and the devices in your session list."
      />
      <Card>
        <CardHeader>
          <CardTitle>Account identity</CardTitle>
          <CardDescription>
            The account currently open in this workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-start gap-4">
          <ShieldCheckIcon className="size-6 shrink-0 text-muted-foreground" />
          <div className="flex min-w-0 flex-col gap-2">
            <p className="font-medium">
              {session.status === "authenticated" ? session.user.name : ""}
            </p>
            <p className="text-sm break-all text-muted-foreground">
              {session.status === "authenticated" ? session.user.email : ""}
            </p>
            <Badge variant="secondary" className="self-start">
              Owner
            </Badge>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Active sessions</CardTitle>
          <CardDescription>
            End a session you no longer need. Your current browser stays signed
            in.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col divide-y">
          <div className="flex flex-wrap items-center gap-4 pb-5">
            <ComputerDesktopIcon className="size-5 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">Current browser</p>
              <p className="mt-1 text-xs text-muted-foreground">Active now</p>
            </div>
            <Badge variant="secondary">This device</Badge>
          </div>
          {devices.map((device) => (
            <div
              key={device.id}
              className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
            >
              <div className="flex flex-1 items-center gap-4">
                {device.mobile ? (
                  <DevicePhoneMobileIcon className="size-5 text-muted-foreground" />
                ) : (
                  <ComputerDesktopIcon className="size-5 text-muted-foreground" />
                )}
                <div>
                  <p className="text-sm font-medium">{device.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {device.detail}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelected(device)}
                aria-label={`End ${device.name} session`}
              >
                End session
              </Button>
            </div>
          ))}
          {notice && (
            <p role="status" className="pt-4 text-sm text-muted-foreground">
              {notice}
            </p>
          )}
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
            <DialogTitle>End this session?</DialogTitle>
            <DialogDescription>
              {selected?.name} will be removed from your active session list.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelected(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                if (!selected) return
                setDevices((current) =>
                  current.filter((device) => device.id !== selected.id)
                )
                setNotice(`${selected.name} was removed from the session list.`)
                setSelected(null)
              }}
            >
              End session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}
