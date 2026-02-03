import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "mongodb",
   }),
   secret: process.env.BETTER_AUTH_SECRET,
   trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
   baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
   appName: "Better Auth",
   emailAndPassword: {
      enabled: true,
      autoSignIn: false,
      minPasswordLength: 8,
      passwordValidation: (password) => {
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