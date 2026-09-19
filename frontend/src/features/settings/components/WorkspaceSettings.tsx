import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSession } from "@/features/auth/hooks/use-session"

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter a workspace name with at least 2 characters."),
  domain: z
    .string()
    .trim()
    .regex(
      /^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i,
      "Enter a valid domain, such as northwind.dev."
    ),
  description: z
    .string()
    .trim()
    .max(280, "Keep the description under 280 characters."),
})
type Profile = z.infer<typeof schema>
const defaults: Profile = {
  name: "Northwind",
  domain: "northwind.dev",
  description:
    "A shared workspace for managing users, tracking growth, and keeping daily operations running smoothly.",
}
const storageKey = "workspace.profile.v1"
function readProfile(): Profile {
  try {
    return schema.parse(JSON.parse(localStorage.getItem(storageKey) ?? "null"))
  } catch {
    return defaults
  }
}

export function WorkspaceSettings() {
  const { session } = useSession()
  const [notice, setNotice] = useState<"saved" | "error" | null>(null)
  const [savedProfile, setSavedProfile] = useState(readProfile)
  const form = useForm<Profile>({
    resolver: zodResolver(schema),
    defaultValues: savedProfile,
  })
  const { errors, isDirty } = form.formState
  const save = (values: Profile) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(values))
      setSavedProfile(values)
      form.reset(values)
      setNotice("saved")
    } catch {
      setNotice("error")
    }
  }
  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Workspace management
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm leading-6 text-muted-foreground">
          Make this workspace yours. Manage its identity and account details.
        </p>
      </header>
      <div className="grid items-start gap-6 lg:grid-cols-3">
        <form
          noValidate
          onSubmit={form.handleSubmit(save)}
          onChange={() => setNotice(null)}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Workspace profile</CardTitle>
              <CardDescription>
                The details that identify your workspace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FieldGroup className="gap-6">
                <Field data-invalid={!!errors.name}>
                  <FieldLabel htmlFor="workspace-name">
                    Workspace name
                  </FieldLabel>
                  <Input
                    id="workspace-name"
                    autoComplete="organization"
                    error={errors.name?.message}
                    {...form.register("name")}
                  />
                </Field>
                <Field data-invalid={!!errors.domain}>
                  <FieldLabel htmlFor="workspace-domain">
                    Primary domain
                  </FieldLabel>
                  <Input
                    id="workspace-domain"
                    autoCapitalize="none"
                    spellCheck={false}
                    error={errors.domain?.message}
                    {...form.register("domain")}
                  />
                </Field>
                <Field data-invalid={!!errors.description}>
                  <FieldLabel htmlFor="workspace-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    id="workspace-description"
                    rows={4}
                    aria-invalid={!!errors.description}
                    aria-describedby="description-help"
                    {...form.register("description")}
                  />
                  <p
                    id="description-help"
                    className="text-xs text-muted-foreground"
                  >
                    {errors.description?.message ??
                      "A short description of your workspace. Up to 280 characters."}
                  </p>
                </Field>
                {notice && (
                  <Alert
                    variant={notice === "error" ? "destructive" : "default"}
                  >
                    {notice === "saved" && <CheckCircleIcon />}
                    <AlertDescription>
                      {notice === "saved"
                        ? "Workspace changes saved on this device."
                        : "Changes could not be saved. Check your browser storage settings and try again."}
                    </AlertDescription>
                  </Alert>
                )}
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                size="lg"
                disabled={!isDirty}
                className="w-full sm:w-auto"
                onClick={() => {
                  form.reset(savedProfile)
                  setNotice(null)
                }}
              >
                Reset changes
              </Button>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto"
                disabled={!isDirty}
              >
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </form>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your account</CardTitle>
              <CardDescription>
                Currently signed in to this workspace.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium">
                  {session.status === "authenticated" ? session.user.name : ""}
                </p>
                <p className="text-sm break-all text-muted-foreground">
                  {session.status === "authenticated" ? session.user.email : ""}
                </p>
              </div>
              <Badge variant="secondary" className="self-start">
                Owner
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Account access</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-sm leading-6 text-muted-foreground">
              <p>
                Your workspace administrator manages roles, invitations, and
                password recovery.
              </p>
              <p>
                Use the account menu to securely sign out when you’re finished.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
