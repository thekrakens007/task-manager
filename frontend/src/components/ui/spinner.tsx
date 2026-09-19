import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"
export function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <ArrowPathIcon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  )
}
