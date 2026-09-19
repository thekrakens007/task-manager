import { Skeleton } from "@/components/ui/skeleton"

export function LoginCardSkeleton() {
  return (
    <div
      className="flex w-full flex-col gap-6"
      role="status"
      aria-label="Loading login"
    >
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-5 w-full" />
      </div>
      {[0, 1].map((item) => (
        <div key={item} className="flex flex-col gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-full" />
      <Skeleton className="mx-auto h-4 w-28" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="mx-auto h-5 w-60" />
    </div>
  )
}
