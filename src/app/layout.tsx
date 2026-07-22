import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { PreLoader } from "@/components/PreLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import BackgroundWave from "@/components/BackgroundWave";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archon — Premium UI Web Design & Interactive 3D Portfolios",
  description:
    "Archon is a next-generation digital agency specializing in website development, custom SaaS engineering, and interactive 3D portfolios built to enterprise standards.",
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
    canonical: "https://Archon-agency.com",
  },
  openGraph: {
    type: "website",
    title: "Archon — Premium UI Web Design & Interactive 3D Portfolios",
    description:
      "Resilient digital infrastructure, custom SaaS engineering, and interactive 3D portfolios designed for enterprise velocity.",
    url: "https://Archon-agency.com",
    siteName: "Archon",
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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col relative bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
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
