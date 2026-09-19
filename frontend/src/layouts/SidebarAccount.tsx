import { useNavigate } from "react-router-dom"

import {
  ArrowRightOnRectangleIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useAnimatedSidebar } from "@/components/motion/sidebar-context"

import type { SessionUser } from "@/features/auth/types/auth.types"

export function SidebarAccount({
                                 user,
                                 onSignOut,
                               }: {
  user: SessionUser
  onSignOut: () => void
}) {
  const navigate = useNavigate()

  const { setOpenMobile } =
      useAnimatedSidebar()

  const initials = user.name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)

  function handleSettings() {
    setOpenMobile(false)
    navigate("/settings")
  }

  function handleSignOut() {
    setOpenMobile(false)
    onSignOut()
  }

  return (
      <DropdownMenu>
        <DropdownMenuTrigger
            aria-label={`${user.name} menu du compte`}
            title={user.name}
            className="flex min-h-11 w-full min-w-0 items-center gap-3 rounded-xl px-2 text-left transition-colors outline-none group-data-[state=collapsed]/sidebar:justify-center group-data-[state=collapsed]/sidebar:px-0 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Avatar className="size-9">
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>

          <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
          <span className="block truncate text-sm font-medium">
            {user.name}
          </span>

          <span className="block truncate text-xs text-muted-foreground">
            {user.email}
          </span>
        </span>

          <ChevronUpDownIcon className="size-4 shrink-0 text-muted-foreground group-data-[state=collapsed]/sidebar:hidden" />
        </DropdownMenuTrigger>

        <DropdownMenuContent
            side="top"
            align="start"
            sideOffset={8}
            className="w-60"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem
                className="min-h-10"
                onClick={handleSettings}
            >
              <Cog6ToothIcon />
              Paramètres
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
                variant="destructive"
                className="min-h-10"
                onClick={handleSignOut}
            >
              <ArrowRightOnRectangleIcon />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
  )
}