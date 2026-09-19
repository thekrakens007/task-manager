import type { ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { MotionConfig } from "motion/react"
import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from "@/features/auth/components/SessionProvider"
import { queryClient } from "@/lib/react-query"

interface ProvidersProps {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={queryClient}>
          <SessionProvider>{children}</SessionProvider>
        </QueryClientProvider>
      </MotionConfig>
    </ThemeProvider>
  )
}
