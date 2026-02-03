import { createAuthClient } from "better-auth/react"

const getBaseURL = () => {
  if (typeof window !== 'undefined') {
    return "/api/auth"
  }
  return `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL || process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth`
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
})