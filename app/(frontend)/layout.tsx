import type { Metadata } from "next";
import { Noto_Sans_KR } from 'next/font/google';
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { Bowlby_One, Architects_Daughter } from "next/font/google";

const bowlbyOne = Bowlby_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bowlby",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-architects",
});




export const metadata: Metadata = {
  title: "Rettungsanker-Freiburg",
  description: "Next.js + Better Auth + Shadcn UI + Tailwind CSS",
  icons: {
    icon: '/LogoNeu.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bowlbyOne.variable} ${architectsDaughter.variable}`} suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
        <NextTopLoader showSpinner={false} height={6} color="#000000" />
        <Toaster richColors position="top-right" />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
