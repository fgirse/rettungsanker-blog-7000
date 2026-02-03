import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { Bowlby_One, Architects_Daughter } from "next/font/google";
import ScrollToTop from "@/components/BackToTop/ScrollToTop";

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
  title: 'Rettungsanker-Freiburg',
  description: 'Die Kiezkneipe in Freiburg',
  icons: {
    icon: '/Assets/Svg/image1.svg',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  "maximumScale": 1,
  viewportFit: "cover",
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
        <ScrollToTop />
      </body>
    </html>
  );
}
