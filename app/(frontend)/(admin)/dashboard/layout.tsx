import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import AppHeader from "@/components/app-header"
import { auth } from "@/lib/auth"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { UserProvider } from "@/context/UserContext"


export default async function DashboardLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const cookieHeader = (await cookies())
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ")

   const headerEntries = Object.fromEntries(await headers())
   const session = await auth.api.getSession({
      headers: new Headers({
         ...headerEntries,
         cookie: cookieHeader,
      })
   })

   if (!session) {
      return redirect("/sign-in")
   }

   const user = session?.user;
   return (
      <UserProvider user={user}>
         <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
               <AppHeader user={user} />
               <main className="flex-1 p-6">{children}</main>
            </SidebarInset>
         </SidebarProvider>
      </UserProvider>
   )
}

