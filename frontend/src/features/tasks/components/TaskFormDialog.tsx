import { useEffect, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

import {
  useCreateTask,
  useUpdateTask,
} from "../hooks/useTasks"

import type {
  Task,
  TaskRequest,
  TaskStatus,
} from "../types/task.types"

type TaskFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task | null
}

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
}: TaskFormDialogProps) {
  const isEditing = !!task

  const createTask = useCreateTask()
  const updateTask = useUpdateTask()

  const [title, setTitle] = useState("")
  const [description, setDescription] =
    useState("")
  const [status, setStatus] =
    useState<TaskStatus>("TODO")

  const [error, setError] =
    useState<string | null>(null)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description ?? "")
      setStatus(task.status)
    } else {
      setTitle("")
      setDescription("")
      setStatus("TODO")
    }

    setError(null)
  }, [task, open])

  const isSubmitting =
    createTask.isPending ||
    updateTask.isPending

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError(null)

    if (!title.trim()) {
      setError("Le titre est obligatoire.")
      return
    }

    const request: TaskRequest = {
      title: title.trim(),
      description: description.trim(),
      status,
    }

    try {
      if (isEditing && task) {
        await updateTask.mutateAsync({
          taskId: task.id,
          request,
        })
      } else {
        await createTask.mutateAsync(request)
      }

      onOpenChange(false)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue.",
      )
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing
              ? "Modifier la tâche"
              : "Nouvelle tâche"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de votre tâche."
              : "Créez une nouvelle tâche personnelle."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="task-title">
              Titre
            </Label>

            <Input
              id="task-title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Ex. Préparer le rapport"
              maxLength={200}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-description">
              Description
            </Label>

            <Textarea
              id="task-description"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="Décrivez la tâche..."
              rows={5}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="task-status">
              Statut
            </Label>

            <select
              id="task-status"
              value={status}
              onChange={(event) =>
                setStatus(
                  event.target.value as TaskStatus,
                )
              }
              disabled={isSubmitting}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="TODO">
                À faire
              </option>

              <option value="IN_PROGRESS">
                En cours
              </option>

              <option value="DONE">
                Terminée
              </option>
            </select>
          </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                onOpenChange(false)
              }
              disabled={isSubmitting}
            >
              Annuler
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Enregistrement..."
                : isEditing
                  ? "Enregistrer"
                  : "Créer la tâche"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

