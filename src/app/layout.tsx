import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PreLoader } from "@/components/PreLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackgroundWave } from "@/components/BackgroundWave";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Agency — Web, IaaS & SaaS Solutions",
  description:
    "A full-service digital agency delivering world-class websites, cloud infrastructure, and software-as-a-service solutions for modern businesses.",
  openGraph: {
    type: "website",
    title: "Digital Agency — Web, IaaS & SaaS Solutions",
    description:
      "A full-service digital agency delivering world-class websites, cloud infrastructure, and software-as-a-service solutions.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative bg-[#030303]">
        <PreLoader />
        <BackgroundWave />
        <Navbar />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
