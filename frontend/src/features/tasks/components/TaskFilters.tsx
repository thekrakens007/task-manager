import { Input } from "@/components/ui/input"

import type { TaskStatus } from "../types/task.types"

type TaskFiltersProps = {
    search: string
    status: TaskStatus | "ALL"
    onSearchChange: (value: string) => void
    onStatusChange: (value: TaskStatus | "ALL") => void
}

export function TaskFilters({
                                search,
                                status,
                                onSearchChange,
                                onStatusChange,
                            }: TaskFiltersProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row">
            <Input
                placeholder="Rechercher une tâche..."
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
                className="sm:max-w-sm"
            />

            <select
                value={status}
                onChange={(event) =>
                    onStatusChange(
                        event.target.value as TaskStatus | "ALL",
                    )
                }
                className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-[180px]"
            >
                <option value="ALL">Tous les statuts</option>
                <option value="TODO">À faire</option>
                <option value="IN_PROGRESS">En cours</option>
                <option value="DONE">Terminées</option>
            </select>
        </div>
    )
}