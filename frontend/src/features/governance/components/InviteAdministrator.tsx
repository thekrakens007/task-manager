import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const schema = z.object({
  name: z.string().trim().min(2, "Enter the administrator's name."),
  email: z.email("Enter a valid email address."),
})
type Invitation = z.infer<typeof schema>
export function InviteAdministrator({
  open,
  onClose,
  onInvite,
  existingEmails,
}: {
  open: boolean
  onClose: () => void
  onInvite: (values: Invitation) => void
  existingEmails: readonly string[]
}) {
  const form = useForm<Invitation>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "" },
  })
  const submit = (values: Invitation) => {
    if (
      existingEmails.some(
        (email) => email.toLowerCase() === values.email.toLowerCase()
      )
    ) {
      form.setError("email", {
        message: "This person already has access or an invitation.",
      })
      return
    }
    onInvite(values)
    form.reset()
    onClose()
  }
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose()
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite an administrator</DialogTitle>
          <DialogDescription>
            Add someone to the access list with the Administrator role.
          </DialogDescription>
        </DialogHeader>
        <form
          noValidate
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col gap-6"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="invite-name">Full name</FieldLabel>
              <Input
                id="invite-name"
                autoComplete="name"
                error={form.formState.errors.name?.message}
                {...form.register("name")}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="invite-email">Email address</FieldLabel>
              <Input
                id="invite-email"
                type="email"
                autoComplete="email"
                error={form.formState.errors.email?.message}
                {...form.register("email")}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create invitation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
