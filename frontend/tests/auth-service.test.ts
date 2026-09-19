import { beforeEach, describe, expect, it } from "vitest"

import { authService } from "@/features/auth/services/auth-service"

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("refuse les identifiants vides", async () => {
    await expect(
        authService.loginWithPassword({
          username: "",
          password: "",
        }),
    ).rejects.toThrow(
        "Veuillez saisir votre adresse email et votre mot de passe.",
    )
  })

  it("refuse un mot de passe vide", async () => {
    await expect(
        authService.loginWithPassword({
          username: "test@example.com",
          password: "",
        }),
    ).rejects.toThrow(
        "Veuillez saisir votre adresse email et votre mot de passe.",
    )
  })

  it("considère une session absente comme non authentifiée", async () => {
    const session = await authService.getSession()

    expect(session.authenticated).toBe(false)
    expect(session.user).toBeNull()
  })

  it("supprime la session et le token lors de la déconnexion", async () => {
    localStorage.setItem(
        "task-manager.session",
        JSON.stringify({
          id: "1",
          email: "test@example.com",
          name: "Test User",
        }),
    )

    localStorage.setItem(
        "task-manager.token",
        "fake-token",
    )

    await authService.logout()

    expect(
        localStorage.getItem(
            "task-manager.session",
        ),
    ).toBeNull()

    expect(
        localStorage.getItem(
            "task-manager.token",
        ),
    ).toBeNull()
  })

  it("supprime une session stockée invalide", async () => {
    localStorage.setItem(
        "task-manager.session",
        "invalid-json",
    )

    localStorage.setItem(
        "task-manager.token",
        "fake-token",
    )

    const session = await authService.getSession()

    expect(session.user).toBeNull()

    expect(
        localStorage.getItem(
            "task-manager.session",
        ),
    ).toBeNull()
  })

  it("supprime une session stockée incomplète", async () => {
    localStorage.setItem(
        "task-manager.session",
        JSON.stringify({
          id: "1",
          email: "test@example.com",
        }),
    )

    localStorage.setItem(
        "task-manager.token",
        "fake-token",
    )

    const session = await authService.getSession()

    expect(session.user).toBeNull()

    expect(
        localStorage.getItem(
            "task-manager.session",
        ),
    ).toBeNull()
  })
})