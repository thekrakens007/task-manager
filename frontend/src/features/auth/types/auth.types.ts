export type SessionUser = {
  id: string
  email: string
  name: string
}

export type SessionState =
    | { status: "loading" }
    | { status: "authenticated"; user: SessionUser }
    | { status: "unauthenticated" }

export type AuthResponse = {
  token: string
  userId: number
  name: string
  email: string
}