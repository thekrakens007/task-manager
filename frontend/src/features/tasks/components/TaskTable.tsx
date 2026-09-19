import {
    ChevronDown,
    Pencil,
    Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
} from "@/components/ui/card"

import type {
    Task,
    TaskStatus,
} from "../types/task.types"

type TaskTableProps = {
    tasks: Task[]
    onEdit: (task: Task) => void
    onDelete: (task: Task) => void
    onStatusChange: (
        task: Task,
        status: TaskStatus,
    ) => void
    isUpdatingStatus?: boolean
}

function getStatusClasses(status: TaskStatus) {
    switch (status) {
        case "TODO":
            return "border-border bg-muted text-muted-foreground"

        case "IN_PROGRESS":
            return "border-border bg-secondary text-secondary-foreground"

        case "DONE":
            return "border-border bg-primary text-primary-foreground"

        default:
            return "border-border bg-muted text-muted-foreground"
    }
}

export function TaskTable({
                              tasks,
                              onEdit,
                              onDelete,
                              onStatusChange,
                              isUpdatingStatus = false,
                          }: TaskTableProps) {
    if (tasks.length === 0) {
        return (
            <Card>
                <CardContent className="flex min-h-[220px] items-center justify-center">
                    <div className="text-center">
                        <p className="font-medium">
                            Aucune tâche trouvée
                        </p>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Créez une nouvelle tâche pour commencer.
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="border-b text-left text-sm">
                            <th className="px-6 py-4 font-medium">
                                Titre
                            </th>

                            <th className="px-6 py-4 font-medium">
                                Description
                            </th>

                            <th className="px-6 py-4 font-medium">
                                Statut
                            </th>

                            <th className="px-6 py-4 font-medium">
                                Créée le
                            </th>

                            <th className="px-6 py-4 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                        {tasks.map((task) => (
                            <tr
                                key={task.id}
                                className="border-b last:border-0"
                            >
                                <td className="px-6 py-4">
                                    <div className="font-medium">
                                        {task.title}
                                    </div>
                                </td>

                                <td className="max-w-[320px] px-6 py-4">
                                    <p className="truncate text-muted-foreground">
                                        {task.description ||
                                            "Aucune description"}
                                    </p>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="relative inline-block">
                                        <select
                                            value={task.status}
                                            disabled={isUpdatingStatus}
                                            onChange={(event) =>
                                                onStatusChange(
                                                    task,
                                                    event.target.value as TaskStatus,
                                                )
                                            }
                                            className={`h-8 appearance-none rounded-full border px-3 pr-8 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${getStatusClasses(
                                                task.status,
                                            )}`}
                                            aria-label={`Modifier le statut de ${task.title}`}
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

                                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                                            <ChevronDown className="size-3" />
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4 text-sm text-muted-foreground">
                                    {new Date(
                                        task.createdAt,
                                    ).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                onEdit(task)
                                            }
                                            title="Modifier la tâche"
                                            aria-label="Modifier la tâche"
                                        >
                                            <Pencil />
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                onDelete(task)
                                            }
                                            title="Supprimer la tâche"
                                            aria-label="Supprimer la tâche"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    )
}