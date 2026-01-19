import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserProvider } from "@/context/UserContext";
//import { StarsBackground } from "@/components/animate-ui/backgrounds/stars";

export default async function HomeLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const session = await auth.api.getSession({
      headers: await headers()
   });
   const user = session?.user ?? null;
   return (
      <UserProvider user={user}>
         <div className="relative">
            <div 
               className="absolute inset-x-0 top-0 w-full h-[900px] sm:h-[950px] md:h-[1050px] lg:h-[1400px] -z-10 pointer-events-none bg-[url('/Assets/Img/lighthouse.webp')] bg-cover bg-no-repeat bg-center lg:bg-[url('/Assets/Svg/5555.svg')] lg:bg-contain lg:bg-no-repeat lg:bg-center opacity-100"
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
