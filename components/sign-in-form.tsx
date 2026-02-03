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
         const result = await authClient.signIn.email({
            email,
            password,
         });
         
         toast.dismiss(loadingToast);
         
         if (result.error) {
            toast.error(result.error.message || "Failed to sign in");
            setIsLoading(false);
         } else {
            toast.success("Signed in successfully");
            router.push("/dashboard");
            router.refresh();
         }
      } catch (error) {
         toast.dismiss(loadingToast);
         toast.error("An unexpected error occurred");
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
