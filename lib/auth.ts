import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

const getBaseURL = () => {
   return process.env.BETTER_AUTH_URL || "http://localhost:3000"
}

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "mongodb",
   }),
   secret: process.env.BETTER_AUTH_SECRET,
   trustedOrigins: [
      getBaseURL(),
      "http://localhost:3000",
      "http://localhost:3001", 
      "http://localhost:3002",
      "http://127.0.0.1:3000",
      ...(process.env.TRUSTED_ORIGINS ? process.env.TRUSTED_ORIGINS.split(",").map(o => o.trim()) : [])
   ],
   baseURL: getBaseURL(),
   advanced: {
      crossSubDomainCookies: {
         enabled: process.env.NODE_ENV === "production",
      },
   },
   basePath: "/api/auth",
   appName: "Better Auth",
   emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      minPasswordLength: 8,
      passwordValidation: (password: string | string[]) => {
         return password && password.length >= 8;
      }
   },
   socialProviders: {
      google: {
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
         redirectURI: `${process.env.BETTER_AUTH_URL || "http://localhost:3000"}/api/auth/callback/google`,
      },
   },
   rateLimit: {
      window: 60, // time window in seconds
      max: 10,
   },
})