import { auth } from './auth'
import type { Payload } from 'payload'

/**
 * Better Auth strategy for Payload CMS
 * This allows Payload to authenticate users via Better Auth sessions
 */
export const betterAuthStrategy = {
  name: 'better-auth',
  authenticate: async ({ payload, headers }: { payload: Payload; headers: Headers }) => {
    try {
      // Get session from Better Auth using the cookies/headers
      const session = await auth.api.getSession({
        headers: headers as Headers
      })

      if (!session?.user) {
        return { user: null }
      }

      // Find user in Payload collection
      const users = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: session.user.email
          }
        },
        limit: 1
      })

      if (users.docs.length === 0) {
        // User exists in Better Auth but not in Payload, create it
        const newUser = await payload.create({
          collection: 'users',
          data: {
            email: session.user.email,
            name: session.user.name || '',
            emailVerified: session.user.emailVerified || false,
            image: session.user.image || '',
          }
        })
        
        return { user: newUser }
      }

      return { user: users.docs[0] }
    } catch (error) {
      console.error('Better Auth strategy error:', error)
      return { user: null }
    }
  }
}
