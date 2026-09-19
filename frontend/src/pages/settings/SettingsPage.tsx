import { useState } from "react"

import { useSession } from "@/features/auth/hooks/use-session"

import { Button } from "@/components/ui/button"

import { useNavigate } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
  const { session, logout } = useSession()

  const [isLoggingOut, setIsLoggingOut] =
      useState(false)

  const navigate = useNavigate()

  if (session.status !== "authenticated") {
    return null
  }

  const { user } = session

  async function handleLogout() {
    try {
      setIsLoggingOut(true)

      await logout()

      navigate("/login", {
        replace: true,
      })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Paramètres
          </h1>

          <p className="text-muted-foreground">
            Gérez les informations de votre compte.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Informations du compte
            </CardTitle>

            <CardDescription>
              Informations associées à votre compte
              Task Manager.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Nom
                </p>

                <p className="text-sm text-muted-foreground">
                  {user.name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Adresse email
                </p>

                <p className="text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Identifiant utilisateur
                </p>

                <p className="text-sm text-muted-foreground">
                  {user.id}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Authentification
                </p>

                <p className="text-sm text-muted-foreground">
                  Session JWT
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Session
            </CardTitle>

            <CardDescription>
              Gérez votre session actuelle.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
                variant="destructive"
                onClick={handleLogout}
                disabled={isLoggingOut}
            >
              {isLoggingOut
                  ? "Déconnexion..."
                  : "Se déconnecter"}
            </Button>
          </CardContent>
        </Card>
      </div>
  )
}