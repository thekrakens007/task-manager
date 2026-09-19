import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useSession } from "@/features/auth/hooks/use-session"
import { authService } from "@/features/auth/services/auth-service"

export function LoginCard() {
  const navigate = useNavigate()
  const { refreshSession } = useSession()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError(null)
    setIsLoading(true)

    try {
      await authService.loginWithPassword({
        username: email,
        password,
      })

      await refreshSession()

      navigate("/", { replace: true })
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Email ou mot de passe incorrect.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>

        <CardDescription>
          Connectez-vous à votre espace Task Manager.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              Adresse email
            </Label>

            <Input
              id="email"
              type="email"
              placeholder="vous@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">
              Mot de passe
            </Label>

            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading
              ? "Connexion..."
              : "Se connecter"}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Vous n'avez pas encore de compte ?{" "}
          <Link
              to="/register"
              className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            Créer un compte
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}

