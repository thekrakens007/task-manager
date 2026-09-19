import { createContext, useContext } from "react"
type SidebarState = "expanded" | "collapsed"
interface AnimatedSidebarContextValue {
  isMobile: boolean
  layoutId: string
  open: boolean
  openMobile: boolean
  reduce: boolean
  setOpen: (open: boolean) => void
  setOpenMobile: (open: boolean) => void
  setTriggerNode: (node: HTMLButtonElement | null) => void
  focusTrigger: () => void
  state: SidebarState
  toggleSidebar: () => void
}

export const AnimatedSidebarContext =
  createContext<AnimatedSidebarContextValue | null>(null)

export function useAnimatedSidebar() {
  const context = useContext(AnimatedSidebarContext)
  if (!context) {
    throw new Error(
      "useAnimatedSidebar must be used inside AnimatedSidebarProvider."
    )
  }
  return context
}
