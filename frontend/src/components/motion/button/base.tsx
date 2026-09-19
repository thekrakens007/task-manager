"use client"
// beui.dev/components/motion/button

import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  useReducedMotion,
} from "motion/react"
import {
  forwardRef,
  type PointerEvent,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from "react"
import { EASE_OUT, SPRING_PRESS } from "@/lib/ease"
import { useHoverCapable } from "@/lib/hooks/use-hover-capable"
import { cn } from "@/lib/utils"

export type ButtonVariant =
  | "google"
  | "primary"
  | "default"
  | "secondary"
  | "ghost"
  | "outline"
  | "destructive"
  | "destructive-outline"
  | "link"
export type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "default"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"

export interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "children"
> {
  variant?: ButtonVariant
  size?: ButtonSize
  pressScale?: number
  /** Spawn a Material-style ripple from the press point. Off by default. */
  ripple?: boolean
  children?: ReactNode
}

export interface ButtonLinkProps extends Omit<
  HTMLMotionProps<"a">,
  "children"
> {
  variant?: ButtonVariant
  size?: ButtonSize
  pressScale?: number
  children?: ReactNode
}

type Ripple = { id: number; x: number; y: number; size: number }

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  google: "google-signin",
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  "destructive-outline":
    "border border-destructive text-destructive hover:bg-destructive/10",
  link: "text-primary underline-offset-4 hover:underline",
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "border border-border bg-card text-foreground hover:border-border",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-primary/5",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-primary/5",
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  xs: "h-6 px-1 text-xs gap-1 rounded-md",
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  default: "h-10 px-4 text-sm gap-2 rounded-xl",
  "icon-xs": "size-6 rounded-md",
  "icon-sm": "size-8 rounded-lg",
  "icon-lg": "size-11 rounded-xl",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-11 px-5 text-sm gap-2 rounded-xl",
  icon: "size-11 rounded-xl",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      pressScale = 0.97,
      ripple = false,
      className,
      children,
      onPointerDown,
      ...rest
    },
    ref
  ) {
    const reduce = useReducedMotion()
    const canHover = useHoverCapable()
    const [ripples, setRipples] = useState<Ripple[]>([])
    const nextId = useRef(0)

    const handlePointerDown = useCallback(
      (event: PointerEvent<HTMLButtonElement>) => {
        if (ripple && !reduce) {
          const rect = event.currentTarget.getBoundingClientRect()
          const size = Math.max(rect.width, rect.height) * 2
          const id = nextId.current++
          setRipples((prev) => [
            ...prev,
            {
              id,
              x: event.clientX - rect.left,
              y: event.clientY - rect.top,
              size,
            },
          ])
        }
        onPointerDown?.(event)
      },
      [ripple, reduce, onPointerDown]
    )

    return (
      <motion.button
        ref={ref}
        data-slot="button"
        data-size={size}
        type="button"
        whileTap={reduce ? undefined : { scale: pressScale }}
        whileHover={reduce || !canHover ? undefined : { scale: 1.02 }}
        transition={SPRING_PRESS}
        onPointerDown={handlePointerDown}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none",
          "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-4 [&_svg]:shrink-0",
          "disabled:pointer-events-none disabled:opacity-50",
          ripple && "relative overflow-hidden",
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          className
        )}
        {...rest}
      >
        {ripple && !reduce ? (
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <AnimatePresence>
              {ripples.map((r) => (
                <motion.span
                  key={r.id}
                  className="absolute rounded-full bg-current"
                  style={{
                    left: r.x,
                    top: r.y,
                    width: r.size,
                    height: r.size,
                    x: "-50%",
                    y: "-50%",
                  }}
                  initial={{ scale: 0.05, opacity: 0.3 }}
                  animate={{ scale: 1, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.6, ease: EASE_OUT }}
                  onAnimationComplete={() =>
                    setRipples((prev) => prev.filter((x) => x.id !== r.id))
                  }
                />
              ))}
            </AnimatePresence>
          </span>
        ) : null}
        {children}
      </motion.button>
    )
  }
)

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  function ButtonLink(
    {
      variant = "primary",
      size = "md",
      pressScale = 0.97,
      className,
      children,
      ...rest
    },
    ref
  ) {
    const reduce = useReducedMotion()
    const canHover = useHoverCapable()

    return (
      <motion.a
        ref={ref}
        whileTap={reduce ? undefined : { scale: pressScale }}
        whileHover={reduce || !canHover ? undefined : { scale: 1.02 }}
        transition={SPRING_PRESS}
        className={cn(
          "inline-flex items-center justify-center font-medium select-none",
          "transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:size-4 [&_svg]:shrink-0",
          VARIANT_CLASS[variant],
          SIZE_CLASS[size],
          className
        )}
        {...rest}
      >
        {children}
      </motion.a>
    )
  }
)
