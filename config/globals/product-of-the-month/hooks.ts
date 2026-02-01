import type { GlobalAfterChangeHook } from "payload"

export const afterChangeHook: GlobalAfterChangeHook = async ({ doc, req }) => {
  // Revalidate pages that use this global
  try {
    if (req.context?.revalidate && typeof req.context.revalidate === 'function') {
      await req.context.revalidate("/")
    }
  } catch (error) {
    console.error("Error revalidating:", error)
  }

  return doc
}
