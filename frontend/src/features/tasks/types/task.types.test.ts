import { describe, expect, it } from "vitest"

import type {
    Task,
    TaskStatus,
} from "./task.types"

describe("Task types", () => {
    it("should support valid task statuses", () => {
        const statuses: TaskStatus[] = [
            "TODO",
            "IN_PROGRESS",
            "DONE",
        ]

        expect(statuses).toHaveLength(3)
    })

    it("should represent a task", () => {
        const task: Task = {
            id: 1,
            title: "Tester l'application",
            description: "Vérifier le CRUD des tâches.",
            status: "TODO",
            createdAt: "2026-09-18T10:00:00",
            updatedAt: "2026-09-18T10:00:00",
        }

        expect(task.id).toBe(1)
        expect(task.title).toBe(
            "Tester l'application",
        )
        expect(task.status).toBe("TODO")
    })
})