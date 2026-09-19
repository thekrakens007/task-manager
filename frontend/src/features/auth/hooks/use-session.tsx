import { createContext, useContext } from "react"
import type { SessionState } from "@/features/auth/types/auth.types"

interface SessionContextValue {
  session: SessionState
  refreshSession: () => Promise<void>
  logout: () => Promise<void>
}
export const SessionContext = createContext<SessionContextValue | undefined>(
  undefined
)

export function useSession() {
  const context = useContext(SessionContext)
  if (!context)
    throw new Error("useSession must be used within a SessionProvider")
  return context
}
