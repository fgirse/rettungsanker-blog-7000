import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware is kept minimal since:
// - Better Auth handles auth on its routes
// - Payload CMS handles its own admin authentication
export async function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Add any custom matchers here if needed
  ],
}
