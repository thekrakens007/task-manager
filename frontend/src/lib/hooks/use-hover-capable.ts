import { useSyncExternalStore } from "react"

const query = "(hover: hover) and (pointer: fine)"
function subscribe(callback: () => void) {
  const media = window.matchMedia(query)
  media.addEventListener("change", callback)
  return () => media.removeEventListener("change", callback)
}
function getSnapshot() {
  return window.matchMedia(query).matches
}
function getServerSnapshot() {
  return false
}

/** beui pointer-aware hover behavior, subscribed without a mount-time effect. */
export function useHoverCapable() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
