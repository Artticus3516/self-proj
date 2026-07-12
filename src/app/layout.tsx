import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PreLoader } from "@/components/PreLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import dynamic from "next/dynamic";
import { ThemeProvider } from "@/components/ThemeProvider";

const BackgroundWave = dynamic(() => import("@/components/BackgroundWave"), { 
  ssr: false 
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Atlas — Premium UI Web Design & Interactive 3D Portfolios",
  description:
    "Atlas is a next-generation digital agency specializing in website development, custom SaaS engineering, and interactive 3D portfolios built to enterprise standards.",
  keywords: [
    "website development",
    "digital agency",
    "interactive 3D portfolios",
    "premium UI web design",
    "IaaS infrastructure",
    "SaaS development",
    "cloud architecture",
    "web design saas",
    "saas development services",
    "enterprise web design",
    "react development studio",
    "cloud saas solutions",
    "ux web design agency",
  ],
  alternates: {
    canonical: "https://atlas-agency.com",
  },
  openGraph: {
    type: "website",
    title: "Atlas — Premium UI Web Design & Interactive 3D Portfolios",
    description:
      "Resilient digital infrastructure, custom SaaS engineering, and interactive 3D portfolios designed for enterprise velocity.",
    url: "https://atlas-agency.com",
    siteName: "Atlas",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative bg-[#faf9f6] text-zinc-950 dark:bg-[#030303] dark:text-white transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <PreLoader />
          <BackgroundWave />
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
