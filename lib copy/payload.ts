import configPromise from '@payload-config'
import { getPayloadAuth } from 'payload-auth/better-auth'

export const getPayload = async () => getPayloadAuth(configPromise)

let cachedPayload: any = null

export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload
  }
  
  cachedPayload = await getPayload()
  return cachedPayload
}

export async function getNavigationData() {
  try {
    const payload = await getPayloadClient()
    const navigation = await payload.findGlobal({
      slug: 'navigation',
    })
    return navigation
  } catch (error) {
    console.error('Error fetching navigation data:', error)
    return null
  }
}

export async function getHeroPageData() {
  try {
    const payload = await getPayloadClient()
    const pages = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: 'home',
        },
      },
      limit: 1,
    })
    
    if (pages.docs && pages.docs.length > 0) {
      return pages.docs[0]
    }
    return null
  } catch (error) {
    console.error('Error fetching hero page data:', error)
    return null
  }
}
