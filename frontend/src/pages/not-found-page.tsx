import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden select-none">
      {/* Giant watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute text-[8rem] leading-none font-black tracking-tighter text-foreground/[0.04] sm:text-[12rem] md:text-[16rem] lg:text-[20rem]"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex max-w-sm flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Page not found
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="mt-2 flex items-center gap-3">
          <Link
            to="/"
            className="inline-flex h-9 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go to Dashboard
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex h-9 items-center rounded-md border border-border bg-transparent px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  )
}
