import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  const is404 = isRouteErrorResponse(error) && error.status === 404
  const label = is404 ? "404" : "Error"

  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden select-none">
      {/* Giant watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute text-[8rem] leading-none font-black tracking-tighter text-foreground/[0.04] sm:text-[12rem] md:text-[16rem] lg:text-[20rem]"
      >
        {label}
      </span>

      {/* Content */}
      <div className="relative z-10 flex max-w-sm flex-col items-center gap-4 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          {label}
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {is404 ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {is404
            ? "The page you're looking for doesn't exist or may have been moved."
            : "We hit an unexpected snag. Please try again or head back to the dashboard."}
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to Dashboard
          </Link>
          {is404 ? (
            <button
              onClick={() => window.history.back()}
              className="inline-flex h-9 items-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              Go back
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex h-9 items-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
            >
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
