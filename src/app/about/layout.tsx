import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the team behind Archon. We are a digital infrastructure and software agency specializing in SaaS engineering, cloud architecture, DevOps automation, and enterprise web design with 99.99% uptime SLA.",
  keywords: [
    "about archon",
    "IT services agency team",
    "digital infrastructure company",
    "enterprise software agency",
    "cloud architecture experts",
    "SaaS engineering team",
    "DevOps automation specialists",
  ],
  alternates: {
    canonical: "https://archon-art.vercel.app/about",
  },
  openGraph: {
    type: "website",
    title: "About Us",
    description:
      "We are a digital infrastructure and software agency. We architect the operational backbone of organisations that demand reliability, scale, and precision.",
    url: "https://archon-art.vercel.app/about",
    siteName: "Archon",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us",
    description:
      "We are a digital infrastructure and software agency. We architect the operational backbone of organisations that demand reliability, scale, and precision.",
    creator: "@ArchonAgency",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://archon-art.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: "https://archon-art.vercel.app/about",
    },
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
