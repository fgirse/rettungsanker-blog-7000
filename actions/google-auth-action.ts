"use client"

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const signInWithGoogle = async () => {
   try {
      console.log("Initiating Google sign-in...");
      console.log("Auth client baseURL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000");
      
      const result = await authClient.signIn.social({
         provider: "google",
         callbackURL: "/"
      });
      
      console.log("Google sign-in result:", result);
      console.log("Result type:", typeof result);
      console.log("Result keys:", result ? Object.keys(result) : "null/undefined");
      
      if (result?.error) {
         console.error("Google sign-in error details:", JSON.stringify(result.error, null, 2));
         const errorMessage = result.error.message || result.error.toString() || "Failed to sign in with Google. Please try again.";
         toast.error(errorMessage);
         return result;
      }
      
      // Check if result is empty object (common OAuth redirect issue)
      if (result && Object.keys(result).length === 0) {
         console.warn("Empty result object - this might be normal for OAuth redirect");
         // Don't show error toast here as redirect might be in progress
         return result;
      }
      
      return result;
   } catch (error: any) {
      console.error("Google sign-in exception:", error);
      console.error("Exception details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
      
      const errorMessage = error?.message || error?.toString() || "Failed to sign in with Google. Please try again.";
      toast.error(errorMessage);
      throw error;
   }
}