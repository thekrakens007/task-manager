import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

interface GoogleLoginButtonProps {
  disabled: boolean
  isLoading: boolean
  onClick: () => void
}

export function GoogleLoginButton({
  disabled,
  isLoading,
  onClick,
}: GoogleLoginButtonProps) {
  return (
    <Button
      type="button"
      variant="google"
      size="lg"
      className="w-full"
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <Spinner data-icon="inline-start" />
      ) : (
        <img
          src="/google-g.png"
          width={20}
          height={20}
          alt=""
          aria-hidden="true"
        />
      )}
      {isLoading ? "Signing in…" : "Continue with Google"}
    </Button>
  )
}
