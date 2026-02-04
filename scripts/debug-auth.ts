/**
 * Debug Authentication Configuration
 * 
 * This script helps diagnose "invalid origin" errors by showing
 * the actual auth configuration and trusted origins.
 */

import { auth } from "@/lib/auth"

async function debugAuth() {
  try {
    console.log("🔍 Authentication Configuration Debug\n")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    
    const baseURL = process.env.BETTER_AUTH_URL || "http://localhost:3000"
    const trustedOrigins = [
      baseURL,
      "http://localhost:3000",
      "http://localhost:3001", 
      "http://localhost:3002",
      "http://127.0.0.1:3000",
      ...(process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(",").map(o => o.trim()) : [])
    ]

    console.log("📍 Base URL:", baseURL)
    console.log("\n✅ Trusted Origins:")
    trustedOrigins.forEach(origin => {
      console.log("   •", origin)
    })

    console.log("\n📋 Environment Variables:")
    console.log("   BETTER_AUTH_URL:", process.env.BETTER_AUTH_URL || "(not set)")
    console.log("   NEXT_PUBLIC_BETTER_AUTH_URL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "(not set)")
    console.log("   TRUSTED_ORIGINS:", process.env.TRUSTED_ORIGINS || "(not set)")

    console.log("\n💡 Tips:")
    console.log("   1. Make sure client requests match a trusted origin above")
    console.log("   2. Set BETTER_AUTH_URL to your production domain")
    console.log("   3. Add additional origins via TRUSTED_ORIGINS (comma-separated)")
    console.log("   4. Check browser console for actual request origin")

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")

  } catch (error) {
    console.error("❌ Error:", error)
  }
}

debugAuth()
