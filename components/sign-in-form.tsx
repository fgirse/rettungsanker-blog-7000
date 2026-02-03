"use client"

import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { signInFormSchema } from "@/lib/auth-schema"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"


export default function SignInForm() {
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   
   const form = useForm<z.infer<typeof signInFormSchema>>({
      resolver: zodResolver(signInFormSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   async function onSubmit(values: z.infer<typeof signInFormSchema>) {
      const { email, password } = values;
      setIsLoading(true);
      const loadingToast = toast.loading("Signing in...");
      
      try {
         console.log("Attempting to sign in with email:", email);
         console.log("Auth client baseURL:", process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000");
         
         type SignInResult = {
            error?: string | { message?: string };
            data?: {
               redirect?: boolean;
               token?: string;
               url?: string;
               user?: {
                  id: string;
                  email: string;
                  name: string;
                  [key: string]: unknown;
               };
            } | null;
         };

         const rawResult = await authClient.signIn.email({
            email,
            password,
         });

         // Normalize the result so error is never null
         const result: SignInResult = {
            error: rawResult.error ?? undefined,
            data: rawResult.data,
         };
         
         console.log("Sign in result:", JSON.stringify(result, null, 2));
         toast.dismiss(loadingToast);
         
         if (result.error) {
            console.error("Sign in error:", JSON.stringify(result.error, null, 2));
            const errorMessage = typeof result.error === 'string' 
                               ? result.error 
                               : (result.error as { message?: string }).message || "Invalid email or password";
            toast.error(errorMessage);
            setIsLoading(false);
         } else if (result.data) {
            toast.success("Signed in successfully");
            router.push("/dashboard");
            router.refresh();
         } else {
            console.error("Unexpected result format:", result);
            toast.error("Sign in failed. Please try again.");
            setIsLoading(false);
         }
      } catch (error) {
         console.error("Sign in exception:", error);
         toast.dismiss(loadingToast);
         
         let errorMessage = "An unexpected error occurred";
         if (error instanceof TypeError && error.message.includes("fetch")) {
            errorMessage = "Network error: Unable to reach authentication server. Please check your connection.";
         } else if (error instanceof Error) {
            errorMessage = error.message;
         }
         
         toast.error(errorMessage);
         setIsLoading(false);
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input type="password" placeholder="********" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
               {isLoading ? "Signing in..." : "Sign In"}
            </Button>
         </form>
      </Form>
   )
}
