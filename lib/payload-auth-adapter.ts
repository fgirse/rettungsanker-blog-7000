import { auth } from './auth'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Custom authentication adapter to use Better Auth sessions with Payload CMS
 * This allows users authenticated via Better Auth to access Payload Admin panel
 */
export async function getBetterAuthUser(req: Request) {
  try {
    // Get session from Better Auth
    const session = await auth.api.getSession({
      headers: req.headers
    })

    if (!session?.user) {
      return null
    }

    // Fetch full user data from MongoDB via Payload
    const payload = await getPayload({ config })
    
    const users = await payload.find({
      collection: 'user',
      where: {
        email: {
          equals: session.user.email
        }
      },
      limit: 1
    })

    if (users.docs.length === 0) {
      return null
    }

    return users.docs[0]
  } catch (error) {
    console.error('Error getting Better Auth user:', error)
    return null
  }
}
