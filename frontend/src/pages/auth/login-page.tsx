import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSession } from "@/features/auth/hooks/use-session"
import { LoginCard } from "@/features/auth/components/login-card"
import { LoginCardSkeleton } from "@/features/auth/components/login-card-skeleton"

export default function LoginPage() {
  const { session } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (session.status === "authenticated") {
      navigate("/", { replace: true })
    }
  }, [session.status, navigate])

  if (session.status === "loading" || session.status === "authenticated") {
    return <LoginCardSkeleton />
  }

  return <LoginCard />
}
