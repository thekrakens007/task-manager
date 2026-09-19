import type { ReactNode } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { SessionContext } from "@/features/auth/hooks/use-session"
import { authService } from "@/features/auth/services/auth-service"
import type { SessionState } from "@/features/auth/types/auth.types"

const sessionKey = ["session"] as const

export function SessionProvider({
                                  children,
                                }: {
  children: ReactNode
}) {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: sessionKey,
    queryFn: authService.getSession,
    retry: false,
  })

  const session: SessionState = query.isPending
      ? { status: "loading" }
      : query.data?.user && query.data.authenticated
          ? {
            status: "authenticated",
            user: query.data.user,
          }
          : {
            status: "unauthenticated",
          }

  const refreshSession = async () => {
    const nextSession = await authService.getSession()

    queryClient.setQueryData(
        sessionKey,
        nextSession,
    )
  }

  const logout = async () => {
    await authService.logout()

    queryClient.setQueryData(
        sessionKey,
        {
          authenticated: false,
          user: null,
        },
    )
  }

  return (
      <SessionContext.Provider
          value={{
            session,
            refreshSession,
            logout,
          }}
      >
        {children}
      </SessionContext.Provider>
  )
}