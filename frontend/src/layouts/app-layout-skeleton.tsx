import { Skeleton } from "@/components/ui/skeleton"
export function AppLayoutSkeleton() {
  return (
    <div
      className="flex min-h-svh"
      role="status"
      aria-label="Loading workspace"
    >
      <aside className="hidden w-64 shrink-0 flex-col gap-6 border-r bg-sidebar p-4 md:flex">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-auto h-11 w-full" />
      </aside>
      <main className="min-w-0 flex-1">
        <div className="flex h-14 items-center gap-4 border-b px-4">
          <Skeleton className="size-8" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex flex-col gap-6 p-4 md:p-8">
          <Skeleton className="h-9 w-48" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((key) => (
              <Skeleton key={key} className="h-32 w-full" />
            ))}
          </div>
          <Skeleton className="h-72 w-full" />
        </div>
      </main>
    </div>
  )
}
