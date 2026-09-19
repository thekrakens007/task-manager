import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query"

import { taskService } from "../services/task-service"
import type {
    TaskRequest,
    TaskStatus,
} from "../types/task.types"

type UseTasksParams = {
    status?: TaskStatus
    search?: string
}

export function useTasks(
    params: UseTasksParams = {},
) {
    return useQuery({
        queryKey: [
            "tasks",
            params.status ?? null,
            params.search ?? "",
        ],
        queryFn: () =>
            taskService.getTasks(params),
    })
}

export function useCreateTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (request: TaskRequest) =>
            taskService.createTask(request),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            })
        },
    })
}

export function useUpdateTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
                         taskId,
                         request,
                     }: {
            taskId: number
            request: TaskRequest
        }) =>
            taskService.updateTask(
                taskId,
                request,
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            })
        },
    })
}

export function useDeleteTask() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (taskId: number) =>
            taskService.deleteTask(taskId),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            })
        },
    })
}