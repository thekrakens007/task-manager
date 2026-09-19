import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { useSession } from "@/features/auth/hooks/use-session"
import { authService } from "@/features/auth/services/auth-service"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function RegisterPage() {
  const { session, refreshSession } = useSession()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [error, setError] =
    useState<string | null>(null)

  const [loading, setLoading] =
    useState(false)

  useEffect(() => {
    if (session.status === "authenticated") {
      navigate("/", { replace: true })
    }
  }, [session.status, navigate])

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError(null)

    if (!name.trim()) {
      setError("Le nom est obligatoire.")
      return
    }

    if (!email.trim()) {
      setError(
        "L'adresse email est obligatoire.",
      )
      return
    }

    if (password.length < 6) {
      setError(
        "Le mot de passe doit contenir au moins 6 caractères.",
      )
      return
    }

    if (password !== confirmPassword) {
      setError(
        "Les mots de passe ne correspondent pas.",
      )
      return
    }

    try {
      setLoading(true)

      await authService.register({
        name,
        email,
        password,
      })

      await refreshSession()

      navigate("/", { replace: true })
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'inscription.",
      )
    } finally {
      setLoading(false)
    }
  }

  if (
    session.status === "loading" ||
    session.status === "authenticated"
  ) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            Créer un compte
          </CardTitle>

          <CardDescription>
            Créez votre compte Task Manager.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="name">
                Nom
              </Label>

              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                disabled={loading}
                autoComplete="name"
              />
            </div>

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
                disabled={loading}
                autoComplete="email"
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
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirmer le mot de passe
              </Label>

              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(
                    event.target.value,
                  )
                }
                disabled={loading}
                autoComplete="new-password"
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
              disabled={loading}
            >
              {loading
                ? "Création du compte..."
                : "Créer mon compte"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ?{" "}
              <Link
                to="/login"
                className="font-medium text-foreground underline underline-offset-4"
              >
                Se connecter
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

