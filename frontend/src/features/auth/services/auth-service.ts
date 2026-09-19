import { z } from "zod"

import type {
  AuthResponse,
  SessionUser,
} from "../types/auth.types"

const API_URL = "/api"

const SESSION_STORAGE_KEY = "task-manager.session"
const TOKEN_STORAGE_KEY = "task-manager.token"

const authResponseSchema = z.object({
  token: z.string().min(1),
  userId: z.number(),
  name: z.string().min(1),
  email: z.email(),
})

const sessionUserSchema = z.object({
  id: z.string(),
  email: z.email(),
  name: z.string().min(1),
})

function readStoredSession(): SessionUser | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.localStorage.getItem(
    SESSION_STORAGE_KEY,
  )

  if (!raw) {
    return null
  }

  try {
    return sessionUserSchema.parse(
      JSON.parse(raw),
    )
  } catch {
    window.localStorage.removeItem(
      SESSION_STORAGE_KEY,
    )

    return null
  }
}

function writeStoredSession(
  user: SessionUser | null,
) {
  if (typeof window === "undefined") {
    return
  }

  if (!user) {
    window.localStorage.removeItem(
      SESSION_STORAGE_KEY,
    )

    return
  }

  window.localStorage.setItem(
    SESSION_STORAGE_KEY,
    JSON.stringify(user),
  )
}

function writeToken(token: string | null) {
  if (typeof window === "undefined") {
    return
  }

  if (!token) {
    window.localStorage.removeItem(
      TOKEN_STORAGE_KEY,
    )

    return
  }

  window.localStorage.setItem(
    TOKEN_STORAGE_KEY,
    token,
  )
}

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null
  }

  return window.localStorage.getItem(
    TOKEN_STORAGE_KEY,
  )
}

async function request<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
    },
  )

  const data = await response
    .json()
    .catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Une erreur est survenue. Veuillez réessayer.",
    )
  }

  return data as T
}

export const authService = {
  async register({
    name,
    email,
    password,
  }: {
    name: string
    email: string
    password: string
  }) {
    if (!name.trim()) {
      throw new Error(
        "Veuillez saisir votre nom.",
      )
    }

    if (!email.trim()) {
      throw new Error(
        "Veuillez saisir votre adresse email.",
      )
    }

    if (!password) {
      throw new Error(
        "Veuillez saisir votre mot de passe.",
      )
    }

    if (password.length < 6) {
      throw new Error(
        "Le mot de passe doit contenir au moins 6 caractères.",
      )
    }

    const data =
      await request<AuthResponse>(
        "/auth/register",
        {
          method: "POST",

          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        },
      )

    const parsed =
      authResponseSchema.parse(data)

    const user: SessionUser = {
      id: String(parsed.userId),
      email: parsed.email,
      name: parsed.name,
    }

    writeToken(parsed.token)
    writeStoredSession(user)

    return {
      user,
      token: parsed.token,
    }
  },

  async loginWithPassword({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    if (!username.trim() || !password) {
      throw new Error(
        "Veuillez saisir votre adresse email et votre mot de passe.",
      )
    }

    const data =
      await request<AuthResponse>(
        "/auth/login",
        {
          method: "POST",

          body: JSON.stringify({
            email: username.trim(),
            password,
          }),
        },
      )

    const parsed =
      authResponseSchema.parse(data)

    const user: SessionUser = {
      id: String(parsed.userId),
      email: parsed.email,
      name: parsed.name,
    }

    writeToken(parsed.token)
    writeStoredSession(user)

    return {
      user,
      token: parsed.token,
    }
  },

  async getSession() {
    const user = readStoredSession()
    const token = getToken()

    return {
      authenticated:
        !!user && !!token,

      user,
    }
  },

  async logout() {
    writeToken(null)
    writeStoredSession(null)

    return {
      success: true,
    }
  },
}
