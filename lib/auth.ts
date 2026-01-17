import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "mongodb"
   }),
   trustedOrigins: ["http://localhost:3000", "http://localhost:3001"],
   emailAndPassword: {
      enabled: true,
      autoSignIn: false
   },
   socialProviders: {
      google: {
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
   },
   rateLimit: {
      window: 60, // time window in seconds
      max: 10,
   },
   advanced: {
      generateId: () => {
         // Generate MongoDB compatible ObjectID
         const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
         const randomBytes = Array.from({ length: 16 }, () => 
            Math.floor(Math.random() * 16).toString(16)
         ).join('');
         return timestamp + randomBytes;
      }
   }
})