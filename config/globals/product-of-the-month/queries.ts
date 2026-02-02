import { getPayload } from "payload"
import config from "@/payload.config"

export async function getProductOfTheMonth() {
  const payload = await getPayload({ config })
  
  try {
    const productOfTheMonth = await payload.findGlobal({
      slug: "productOfTheMonth" as any,
      depth: 0,
    })

    return productOfTheMonth
  } catch (error) {
    console.error("Error fetching product of the month:", error)
    return null
  }
}
