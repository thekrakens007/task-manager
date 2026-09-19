import { api } from "@/lib/api"
import type {
    Task,
    TaskRequest,
    TaskStatus,
} from "../types/task.types"

type GetTasksParams = {
    status?: TaskStatus
    search?: string
}

function buildQueryString(params: GetTasksParams = {}) {
    const searchParams = new URLSearchParams()

    if (params.status) {
        searchParams.set("status", params.status)
    }

    if (params.search?.trim()) {
        searchParams.set("search", params.search.trim())
    }

    const queryString = searchParams.toString()

    return queryString ? `?${queryString}` : ""
}

export const taskService = {
    async getTasks(params: GetTasksParams = {}): Promise<Task[]> {
        const queryString = buildQueryString(params)

        return api.get<Task[]>(
            `/tasks${queryString}`,
        )
    },

    async createTask(
        request: TaskRequest,
    ): Promise<Task> {
        return api.post<Task>(
            "/tasks",
            request,
        )
    },

    async updateTask(
        taskId: number,
        request: TaskRequest,
    ): Promise<Task> {
        return api.put<Task>(
            `/tasks/${taskId}`,
            request,
        )
    },

    async deleteTask(taskId: number): Promise<void> {
        await api.delete<void>(
            `/tasks/${taskId}`,
        )
    },
}