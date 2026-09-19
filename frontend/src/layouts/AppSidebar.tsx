import { Link } from "react-router-dom"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { AppLogo } from "@/components/common/app-logo"
import {
  AnimatedSidebar,
  AnimatedSidebarClose,
  AnimatedSidebarContent,
  AnimatedSidebarFooter,
  AnimatedSidebarHeader,
  AnimatedSidebarRail,
} from "@/components/motion/animated-sidebar"
import type { SessionUser } from "@/features/auth/types/auth.types"
import { SidebarNavigation } from "./SidebarNavigation"
import { SidebarAccount } from "./SidebarAccount"

export function AppSidebar({
  user,
  onSignOut,
}: {
  user: SessionUser
  onSignOut: () => void
}) {
  return (
    <AnimatedSidebar
      ariaLabel="Workspace navigation"
      collapsible="icon"
      panelClassName="border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <AnimatedSidebarHeader className="p-2">
        <div className="flex min-h-11 items-center gap-2 overflow-hidden">
          <Link
            to="/"
            aria-label="Dashboard home"
            className="flex min-w-0 flex-1 items-center overflow-hidden rounded-xl px-3 py-1.5 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <AppLogo className="h-8 group-data-[state=collapsed]/sidebar:hidden" />
            <AppLogo
              compact
              className="hidden h-8 group-data-[state=collapsed]/sidebar:flex"
            />
          </Link>
          <AnimatedSidebarClose className="ml-auto text-muted-foreground hover:bg-muted md:hidden">
            <XMarkIcon className="size-5" />
          </AnimatedSidebarClose>
        </div>
      </AnimatedSidebarHeader>
      <AnimatedSidebarContent>
        <SidebarNavigation />
      </AnimatedSidebarContent>
      <AnimatedSidebarFooter>
        <SidebarAccount user={user} onSignOut={onSignOut} />
      </AnimatedSidebarFooter>
      <AnimatedSidebarRail />
    </AnimatedSidebar>
  )
}
