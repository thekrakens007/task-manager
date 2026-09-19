import { getToken, authService } from "@/features/auth/services/auth-service"

const API_URL = "/api"

type ApiRequestOptions = RequestInit & {
  skipAuth?: boolean
}

async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { skipAuth = false, ...requestOptions } = options

  const token = getToken()

  const headers = new Headers(requestOptions.headers)

  headers.set("Content-Type", "application/json")

  if (token && !skipAuth) {
    headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...requestOptions,
    headers,
  })

  /*
   * Si le JWT est expiré ou invalide,
   * on nettoie la session locale et on renvoie
   * l'utilisateur vers la page de connexion.
   */
  if (response.status === 401 && !skipAuth) {
    await authService.logout()

    if (
      typeof window !== "undefined" &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login"
    }

    throw new Error(
      "Votre session a expiré. Veuillez vous reconnecter.",
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      "Une erreur est survenue lors de la communication avec le serveur."

    throw new Error(message)
  }

  return data as T
}

export const api = {
  get<T>(endpoint: string) {
    return apiRequest<T>(endpoint, {
      method: "GET",
    })
  },

  post<T>(endpoint: string, body?: unknown) {
    return apiRequest<T>(endpoint, {
      method: "POST",
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    })
  },

  put<T>(endpoint: string, body?: unknown) {
    return apiRequest<T>(endpoint, {
      method: "PUT",
      body:
        body !== undefined
          ? JSON.stringify(body)
          : undefined,
    })
  },

  delete<T>(endpoint: string) {
    return apiRequest<T>(endpoint, {
      method: "DELETE",
    })
  },
}

