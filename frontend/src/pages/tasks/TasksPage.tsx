import { useState } from "react"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { TaskFilters } from "@/features/tasks/components/TaskFilters"
import { TaskFormDialog } from "@/features/tasks/components/TaskFormDialog"
import { TaskTable } from "@/features/tasks/components/TaskTable"

import {
  useDeleteTask,
  useTasks,
  useUpdateTask,
} from "@/features/tasks/hooks/useTasks"

import type {
  Task,
  TaskRequest,
  TaskStatus,
} from "@/features/tasks/types/task.types"

export default function TasksPage() {
  const [search, setSearch] = useState("")

  const [status, setStatus] =
      useState<TaskStatus | "ALL">("ALL")

  const [dialogOpen, setDialogOpen] =
      useState(false)

  const [selectedTask, setSelectedTask] =
      useState<Task | null>(null)

  const [deletingTask, setDeletingTask] =
      useState<Task | null>(null)

  const {
    data: tasks = [],
    isLoading,
    isError,
    error,
  } = useTasks({
    search,
    status:
        status === "ALL"
            ? undefined
            : status,
  })

  const updateTask = useUpdateTask()

  const deleteTask = useDeleteTask()

  function handleCreate() {
    setSelectedTask(null)
    setDialogOpen(true)
  }

  function handleEdit(task: Task) {
    setSelectedTask(task)
    setDialogOpen(true)
  }

  function handleDialogChange(open: boolean) {
    setDialogOpen(open)

    if (!open) {
      setSelectedTask(null)
    }
  }

  async function handleStatusChange(
      task: Task,
      newStatus: TaskStatus,
  ) {
    if (task.status === newStatus) {
      return
    }

    const request: TaskRequest = {
      title: task.title,
      description: task.description ?? "",
      status: newStatus,
    }

    try {
      await updateTask.mutateAsync({
        taskId: task.id,
        request,
      })
    } catch (error) {
      console.error(
          "Erreur lors de la modification du statut :",
          error,
      )
    }
  }

  async function handleDelete() {
    if (!deletingTask) {
      return
    }

    try {
      await deleteTask.mutateAsync(
          deletingTask.id,
      )

      setDeletingTask(null)
    } catch (error) {
      console.error(
          "Erreur lors de la suppression :",
          error,
      )
    }
  }

  return (
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Mes tâches
            </h1>

            <p className="text-muted-foreground">
              Gérez vos tâches personnelles.
            </p>
          </div>

          <Button onClick={handleCreate}>
            Nouvelle tâche
          </Button>
        </div>

        {/* Liste */}
        <Card>
          <CardHeader>
            <CardTitle>
              Liste des tâches
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <TaskFilters
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
            />

            {/* Chargement */}
            {isLoading && (
                <div className="flex min-h-[220px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">
                    Chargement des tâches...
                  </p>
                </div>
            )}

            {/* Erreur */}
            {isError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                  <p className="font-medium">
                    Impossible de charger les tâches.
                  </p>

                  <p className="mt-1">
                    {error instanceof Error
                        ? error.message
                        : "Une erreur est survenue lors de la communication avec le serveur."}
                  </p>
                </div>
            )}

            {/* Tableau */}
            {!isLoading && !isError && (
                <TaskTable
                    tasks={tasks}
                    onEdit={handleEdit}
                    onDelete={setDeletingTask}
                    onStatusChange={
                      handleStatusChange
                    }
                    isUpdatingStatus={
                      updateTask.isPending
                    }
                />
            )}
          </CardContent>
        </Card>

        {/* Création / modification */}
        <TaskFormDialog
            open={dialogOpen}
            onOpenChange={handleDialogChange}
            task={selectedTask}
        />

        {/* Confirmation suppression */}
        <Dialog
            open={!!deletingTask}
            onOpenChange={(open) => {
              if (!open && !deleteTask.isPending) {
                setDeletingTask(null)
              }
            }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Supprimer la tâche ?
              </DialogTitle>

              <DialogDescription>
                Voulez-vous vraiment supprimer cette
                tâche ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>

            {deletingTask && (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="font-medium">
                    {deletingTask.title}
                  </p>

                  {deletingTask.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {deletingTask.description}
                      </p>
                  )}
                </div>
            )}

            {deleteTask.isError && (
                <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {deleteTask.error instanceof Error
                      ? deleteTask.error.message
                      : "Impossible de supprimer la tâche."}
                </div>
            )}

            <DialogFooter>
              <Button
                  variant="outline"
                  onClick={() =>
                      setDeletingTask(null)
                  }
                  disabled={deleteTask.isPending}
              >
                Annuler
              </Button>

              <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleteTask.isPending}
              >
                {deleteTask.isPending
                    ? "Suppression..."
                    : "Supprimer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
  )
}