import { auth } from '@clerk/nextjs/server'

export const checkRole = async (role: 'admin' | 'user') => {
  const { sessionClaims } = await auth()

  return (sessionClaims?.metadata as { role?: string })?.role === role
}