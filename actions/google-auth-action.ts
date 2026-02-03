"use client"

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const signInWithGoogle = async () => {
   try {
      const result = await authClient.signIn.social({
         provider: "google",
         callbackURL: "/dashboard"
      });
      
      if (result.error) {
         console.error("Google sign-in error:", result.error);
         toast.error("Failed to sign in with Google. Please try again.");
      }
   } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
   }
}