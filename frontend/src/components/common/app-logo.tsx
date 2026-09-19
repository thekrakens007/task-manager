import { cn } from "@/lib/utils"

interface AppLogoProps {
  className?: string
  compact?: boolean
}

export function AppLogo({ className, compact = false }: AppLogoProps) {
  return (
      <svg
          viewBox={compact ? "0 0 52 40" : "0 0 220 40"}
          role="img"
          aria-label="Task Manager"
          className={cn("h-10 w-auto", className)}
      >
        {/* Logo icon */}
        <g transform="translate(2 2)">
          <rect
              x="1.5"
              y="1.5"
              width="44"
              height="28"
              rx="6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
          />

          {/* Base */}
          <path
              d="M18 35h11"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
          />

          {/* Task lines */}
          <path
              d="M11 24.5h9"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
          />

          <path
              d="M11 19h13"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
          />

          {/* Progress bars */}
          <path
              d="M28 19v6.5"
              stroke="#38BDF8"
              strokeWidth="6"
              strokeLinecap="round"
          />

          <path
              d="M35 12v13.5"
              stroke="#2563EB"
              strokeWidth="6"
              strokeLinecap="round"
          />

          <path
              d="M42 16v9.5"
              stroke="#2DD4BF"
              strokeWidth="6"
              strokeLinecap="round"
          />

          {/* Task/check symbol */}
          <path
              d="M12 9a7 7 0 1 1 4.95 6.7"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
          />

          <path
              d="M12 9h7V2a7 7 0 0 0-7 7Z"
              fill="#EF5A3C"
          />

          <path
              d="M19 9h7a7 7 0 0 0-7-7v7Z"
              fill="#6366F1"
          />

          <path
              d="M19 9 14.05 15.7A7 7 0 0 0 26 9h-7Z"
              fill="#FACC15"
          />
        </g>

        {/* Application name */}
        {!compact ? (
            <g transform="translate(60 0)" fill="currentColor">
              <text
                  x="0"
                  y="18"
                  fontSize="15"
                  fontWeight="700"
                  letterSpacing="0.12em"
              >
                TASK
              </text>

              <text
                  x="0"
                  y="32"
                  fontSize="11"
                  fontWeight="600"
                  letterSpacing="0.22em"
                  opacity="0.72"
              >
                MANAGER
              </text>
            </g>
        ) : null}
      </svg>
  )
}