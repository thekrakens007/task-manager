import { useState } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { RectangleGroupIcon } from "@heroicons/react/24/outline"
import { getNavigationTitle } from "@/app/navigation"
import {
  AnimatedSidebarInset,
  AnimatedSidebarProvider,
  AnimatedSidebarTrigger,
} from "@/components/motion/animated-sidebar"
import { Separator } from "@/components/ui/separator"
import { useSession } from "@/features/auth/hooks/use-session"
import { useRequireAuth } from "@/features/auth/hooks/use-require-auth"
import { SignOutDialog } from "@/features/auth/components/sign-out-dialog"
import { AppSidebar } from "./AppSidebar"
import { AppLayoutSkeleton } from "./app-layout-skeleton"

export function AppLayout() {
  const session = useRequireAuth()
  const { logout } = useSession()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [showSignOut, setShowSignOut] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const title = getNavigationTitle(pathname)

  const signOut = async () => {
    setIsSigningOut(true)
    try {
      await logout()
      navigate("/login", { replace: true })
    } finally {
      setIsSigningOut(false)
      setShowSignOut(false)
    }
  }

  if (session.status !== "authenticated") return <AppLayoutSkeleton />

  return (
    <AnimatedSidebarProvider className="bg-background">
      <AppSidebar user={session.user} onSignOut={() => setShowSignOut(true)} />
      <AnimatedSidebarInset>
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background px-4">
          <AnimatedSidebarTrigger className="text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
            <RectangleGroupIcon className="size-5" />
          </AnimatedSidebarTrigger>
          <Separator orientation="vertical" className="h-5" />
          <span className="hidden text-sm text-muted-foreground sm:inline">
            Workspace
          </span>
          <span
            className="hidden text-muted-foreground sm:inline"
            aria-hidden="true"
          >
            /
          </span>
          <p className="truncate text-sm font-medium">{title}</p>
        </header>
        <div className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col">
            <Outlet />
          </div>
        </div>
      </AnimatedSidebarInset>
      <SignOutDialog
        open={showSignOut}
        onOpenChange={setShowSignOut}
        onConfirm={signOut}
        isPending={isSigningOut}
        mode="current"
      />
    </AnimatedSidebarProvider>
  )
}
