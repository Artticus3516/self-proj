import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { PreLoader } from "@/components/PreLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import BackgroundWaveWrapper from "@/components/BackgroundWaveWrapper";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archon — Enterprise IT Services, SaaS Engineering, Web Design & SEO Automation",
  description:
    "Archon is a premier full-service IT services agency. We specialize in custom SaaS engineering, high-performance web design, search engine optimization (SEO), business workflow automation, and robust IaaS cloud infrastructures.",
  keywords: [
    "IT services agency",
    "SaaS development",
    "SEO optimization services",
    "custom web design agency",
    "workflow automation",
    "IaaS cloud migration",
    "artificial intelligence integration",
    "DevOps orchestration",
    "enterprise software development",
    "cloud architecture design",
    "high-availability hosting",
    "AEO optimization",
    "GEO optimization agency",
    "digital transformation consultancy",
    "responsive UI UX design",
    "IT systems automation",
  ],
  alternates: {
    canonical: "https://archon-art.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Archon — Enterprise IT Services, SaaS Engineering, Web Design & SEO Automation",
    description:
      "Unlock digital velocity with Archon. From enterprise SaaS engineering and cutting-edge web design to technical SEO and automated cloud infrastructure.",
    url: "https://archon-art.vercel.app",
    siteName: "Archon",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archon — Enterprise IT Services, SaaS Engineering, Web Design & SEO Automation",
    description:
      "Unlock digital velocity with Archon. From enterprise SaaS engineering and cutting-edge web design to technical SEO and automated cloud infrastructure.",
    creator: "@ArchonAgency",
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
      className={cn("h-full", "antialiased", geistMono.variable, "font-sans", inter.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["ProfessionalService", "Organization"],
              "name": "Archon IT Services",
              "image": "https://archon-art.vercel.app/logo.png",
              "@id": "https://archon-art.vercel.app/#organization",
              "url": "https://archon-art.vercel.app",
              "telephone": "+91 9625604705",
              "email": "artticus9@gmail.com",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Tech Hub, Sector 5",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "postalCode": "560001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 12.9716,
                "longitude": 77.5946
              },
              "sameAs": [
                "https://twitter.com/ArchonAgency",
                "https://github.com/ArchonAgency",
                "https://linkedin.com/company/ArchonAgency"
              ],
              "description": "Archon is a premium full-service IT agency specializing in scalable SaaS engineering, high-performance web design, search engine optimization (SEO), business automation, and robust IaaS cloud solutions.",
              "foundingDate": "2018",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "minValue": 10,
                "maxValue": 50
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "speakable": {
                "@type": "SpeakableSpecification",
                "cssSelector": ["h1", ".hero-description", "main p"]
              },
              "offers": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SaaS Engineering & Development",
                    "description": "Full-stack multi-tenant software architectures built for enterprise scale, speed, and absolute reliability."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Search Engine Optimization (SEO) & GEO",
                    "description": "Advanced technical SEO and Generative Engine Optimization strategies designed to maximize modern search visibility."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Premium Web Design & Interactive UI",
                    "description": "Stunning interactive 3D portfolios, responsive UI/UX architectures, and rapid-loading website design."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Cloud Infrastructure & IaaS",
                    "description": "Architecting resilient server topologies, custom DevOps pipelines, and high-availability cloud solutions."
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "IT Automation & AI Workflow Solutions",
                    "description": "Optimizing business operations through automated cloud pipelines, scripts, and robotic process automation."
                  }
                }
              ]
            }).replace(/</g, "\\u003c")
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Archon",
              "alternateName": "Archon IT Services",
              "url": "https://archon-art.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://archon-art.vercel.app/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }).replace(/</g, "\\u003c")
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col relative bg-background text-foreground transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
        >
          <PreLoader />
          <BackgroundWaveWrapper />
          <Navbar />
          {children}
          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
