import { useMemo } from "react"
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  ListTodo,
  Plus,
} from "lucide-react"
import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useTasks } from "@/features/tasks/hooks/useTasks"

import type {
  Task,
  TaskStatus,
} from "@/features/tasks/types/task.types"

function getStatusLabel(status: TaskStatus) {
  switch (status) {
    case "TODO":
      return "À faire"

    case "IN_PROGRESS":
      return "En cours"

    case "DONE":
      return "Terminée"

    default:
      return status
  }
}

function getStatusVariant(status: TaskStatus) {
  switch (status) {
    case "DONE":
      return "default" as const

    case "IN_PROGRESS":
      return "secondary" as const

    case "TODO":
    default:
      return "outline" as const
  }
}

function getStatusIcon(status: TaskStatus) {
  switch (status) {
    case "DONE":
      return <CheckCircle2 className="size-4" />

    case "IN_PROGRESS":
      return <Clock3 className="size-4" />

    case "TODO":
    default:
      return <Circle className="size-4" />
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function RecentTask({ task }: { task: Task }) {
  return (
      <div className="flex items-center justify-between gap-4 border-b py-4 last:border-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {getStatusIcon(task.status)}

            <p className="truncate font-medium">
              {task.title}
            </p>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(task.createdAt)}
          </p>
        </div>

        <Badge
            variant={getStatusVariant(task.status)}
            className="shrink-0"
        >
          {getStatusLabel(task.status)}
        </Badge>
      </div>
  )
}

export default function DashboardPage() {
  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useTasks()

  const statistics = useMemo(() => {
    return {
      total: tasks.length,

      todo: tasks.filter(
          (task) => task.status === "TODO",
      ).length,

      inProgress: tasks.filter(
          (task) => task.status === "IN_PROGRESS",
      ).length,

      done: tasks.filter(
          (task) => task.status === "DONE",
      ).length,
    }
  }, [tasks])

  const recentTasks = useMemo(() => {
    return [...tasks]
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
        )
        .slice(0, 5)
  }, [tasks])

  const todoPercentage =
      statistics.total > 0
          ? (statistics.todo / statistics.total) * 100
          : 0

  const inProgressPercentage =
      statistics.total > 0
          ? (statistics.inProgress / statistics.total) * 100
          : 0

  const donePercentage =
      statistics.total > 0
          ? (statistics.done / statistics.total) * 100
          : 0

  return (
      <div className="space-y-8">
        {/* En-tête */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Tableau de bord
            </h1>

            <p className="text-muted-foreground">
              Voici un aperçu de vos tâches.
            </p>
          </div>

          <Link to="/tasks">
            <Button>
              <Plus />
              Nouvelle tâche
            </Button>
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total
              </CardTitle>

              <ListTodo className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "—" : statistics.total}
              </div>

              <p className="text-xs text-muted-foreground">
                Toutes vos tâches
              </p>
            </CardContent>
          </Card>

          {/* À faire */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                À faire
              </CardTitle>

              <Circle className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "—" : statistics.todo}
              </div>

              <p className="text-xs text-muted-foreground">
                Tâches à commencer
              </p>
            </CardContent>
          </Card>

          {/* En cours */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                En cours
              </CardTitle>

              <Clock3 className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "—" : statistics.inProgress}
              </div>

              <p className="text-xs text-muted-foreground">
                Tâches actuellement en cours
              </p>
            </CardContent>
          </Card>

          {/* Terminées */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Terminées
              </CardTitle>

              <CheckCircle2 className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "—" : statistics.done}
              </div>

              <p className="text-xs text-muted-foreground">
                Tâches terminées
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Tâches récentes */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>
                  Tâches récentes
                </CardTitle>

                <p className="mt-1 text-sm text-muted-foreground">
                  Vos dernières tâches créées.
                </p>
              </div>

              <Link to="/tasks">
                <Button
                    variant="ghost"
                    size="sm"
                >
                  Voir tout
                  <ArrowRight />
                </Button>
              </Link>
            </CardHeader>

            <CardContent>
              {isLoading && (
                  <div className="py-10 text-center text-sm text-muted-foreground">
                    Chargement des tâches...
                  </div>
              )}

              {isError && (
                  <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
                    Impossible de charger les tâches.
                  </div>
              )}

              {!isLoading &&
                  !isError &&
                  recentTasks.length === 0 && (
                      <div className="flex min-h-[180px] items-center justify-center">
                        <div className="text-center">
                          <ListTodo className="mx-auto size-10 text-muted-foreground" />

                          <p className="mt-3 font-medium">
                            Aucune tâche
                          </p>

                          <p className="mt-1 text-sm text-muted-foreground">
                            Commencez par créer votre première tâche.
                          </p>

                          <Link to="/tasks">
                            <Button className="mt-4">
                              <Plus />
                              Créer une tâche
                            </Button>
                          </Link>
                        </div>
                      </div>
                  )}

              {!isLoading &&
                  !isError &&
                  recentTasks.length > 0 && (
                      <div>
                        {recentTasks.map((task) => (
                            <RecentTask
                                key={task.id}
                                task={task}
                            />
                        ))}
                      </div>
                  )}
            </CardContent>
          </Card>

          {/* Résumé */}
          <Card>
            <CardHeader>
              <CardTitle>
                Résumé
              </CardTitle>

              <p className="text-sm text-muted-foreground">
                État actuel de vos tâches.
              </p>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* À faire */}
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>À faire</span>

                  <span className="font-medium">
                  {statistics.todo}
                </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                      className="h-full rounded-full bg-muted-foreground"
                      style={{
                        width: `${todoPercentage}%`,
                      }}
                  />
                </div>
              </div>

              {/* En cours */}
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>En cours</span>

                  <span className="font-medium">
                  {statistics.inProgress}
                </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                      className="h-full rounded-full bg-foreground/60"
                      style={{
                        width: `${inProgressPercentage}%`,
                      }}
                  />
                </div>
              </div>

              {/* Terminées */}
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span>Terminées</span>

                  <span className="font-medium">
                  {statistics.done}
                </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                      className="h-full rounded-full bg-primary"
                      style={{
                        width: `${donePercentage}%`,
                      }}
                  />
                </div>
              </div>

              {/* Lien tâches */}
              <div className="border-t pt-5">
                <Link to="/tasks">
                  <Button
                      variant="outline"
                      className="w-full"
                  >
                    Gérer mes tâches
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}