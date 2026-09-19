import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useSession } from "./use-session"

export function useRequireAuth() {
  const { session } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (session.status === "unauthenticated") {
      navigate("/login", {
        replace: true,
      })
    }
  }, [session.status, navigate])

  return session
}

