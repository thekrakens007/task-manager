import { useEffect, type ReactNode } from "react"

/** This workspace intentionally uses one dark theme. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
  }, [])
  return children
}
