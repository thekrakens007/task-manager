import { Link, Outlet } from "react-router-dom"
import { AppLogo } from "@/components/common/app-logo"

export function AuthLayout() {
  return (
      <div className="grid min-h-svh bg-background text-foreground lg:grid-cols-2">
        {/* Left side - Authentication */}
        <div className="flex min-h-svh flex-col">
          <header className="px-6 py-5 sm:px-8">
            <Link
                to="/"
                aria-label="Task Manager - Accueil"
                className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <AppLogo className="h-8" />
            </Link>
          </header>

          <main className="flex flex-1 items-center justify-center px-6 py-6 sm:px-12">
            <div className="w-full max-w-xs">
              <Outlet />
            </div>
          </main>

          <footer className="px-6 py-4 text-center text-xs text-muted-foreground">
            Votre espace. Toutes vos tâches au même endroit.
          </footer>
        </div>

        {/* Right side - Task Manager presentation */}
        <aside
            className="relative hidden items-center justify-center overflow-hidden bg-muted lg:flex"
            aria-label="Présentation de Task Manager"
        >
          {/* Decorative orbit */}
          <div className="auth-orbit" aria-hidden="true">
            <div className="auth-orbit-inner" />

            <div className="auth-orbit-core">
              <AppLogo compact className="h-12" />
            </div>
          </div>

          {/* Presentation text */}
          <div className="absolute inset-x-12 bottom-12 flex flex-col gap-3 text-center">
            <h2 className="text-2xl font-medium tracking-tight">
              Organisez vos tâches.
              <br />
              Atteignez vos objectifs.
            </h2>

            <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
              Créez, suivez et gérez vos tâches depuis un espace simple
              et centralisé.
            </p>
          </div>
        </aside>
      </div>
  )
}