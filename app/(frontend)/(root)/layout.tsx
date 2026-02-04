import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { UserProvider } from "@/context/UserContext";
import { getPayload } from "payload";
import config from "@payload-config";
//import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";

export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const cookieHeader = (await cookies())
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ")

   const headerEntries = Object.fromEntries(await headers())
   const session = await auth.api.getSession({
      headers: new Headers({
         ...headerEntries,
         cookie: cookieHeader,
      }),
   })

   let user = session?.user ?? null;

   if (session?.user?.email) {
      const payload = await getPayload({ config });
      const { docs } = await payload.find({
         collection: "users",
         where: {
            email: {
               equals: session.user.email,
            },
         },
         limit: 1,
         overrideAccess: true,
      });

      if (docs[0]) {
         user = docs[0] as typeof user;
      }
   }
   return (
      <UserProvider user={user}>
         <div className="relative">
            <div 
               className="absolute inset-x-0 top-0 w-full h-225 sm:h-237.5 md:h-262.5 lg:h-350 -z-10 pointer-events-none bg-[url('/Assets/Img/lighthouse.webp')] bg-cover bg-no-repeat bg-center lg:bg-[url('/Assets/Svg/5555.svg')] lg:bg-contain lg:bg-no-repeat lg:bg-center opacity-100"
            ></div>
            <Navbar />
            <main>
               {children}
            </main>
            <Footer />
         </div>
      </UserProvider>
   );
}
