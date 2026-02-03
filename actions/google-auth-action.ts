"use client"

import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const signInWithGoogle = async () => {
   try {
      await authClient.signIn.social({
         provider: "google"
      })
   } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google. Please try again.");
   }
}