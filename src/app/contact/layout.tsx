import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Archon's engineering team. We scope enterprise SaaS builds, cloud infrastructure projects, and digital transformations. Free architecture brief returned within 48 hours.",
  keywords: [
    "contact IT agency",
    "enterprise project consultation",
    "SaaS development quote",
    "cloud infrastructure consultation",
    "hire IT services agency",
    "free architecture brief",
  ],
  alternates: {
    canonical: "https://archon-art.vercel.app/contact",
  },
  openGraph: {
    type: "website",
    title: "Contact",
    description:
      "Submit your architecture brief and receive a scoped technical document within 48 hours — at no cost.",
    url: "https://archon-art.vercel.app/contact",
    siteName: "Archon",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description:
      "Submit your architecture brief and receive a scoped technical document within 48 hours — at no cost.",
    creator: "@ArchonAgency",
  },
};

const contactSchemaJsonLd = [
  {
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
        name: "Contact",
        item: "https://archon-art.vercel.app/contact",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Archon IT Services",
    description:
      "Start your enterprise IT project with Archon. Submit your architecture brief and receive a scoped technical document within 48 hours.",
    url: "https://archon-art.vercel.app/contact",
    mainEntity: {
      "@type": "Organization",
      name: "Archon IT Services",
      email: "artticus9@gmail.com",
      telephone: "+91 9625604705",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "artticus9@gmail.com",
        telephone: "+91 9625604705",
        areaServed: "Worldwide",
        availableLanguage: ["English"],
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Start a Project with Archon",
    description:
      "Follow these three steps to begin your enterprise IT project with Archon's engineering team.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Submit Your Architecture Brief",
        text: "Fill out the project intake form with your company name, architecture requirements, estimated scale, and a brief description of your project goals.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Receive Your Technical Scope Document",
        text: "Our engineers review your requirements and return a scoped technical document and preliminary architecture diagram within 48 hours — at no cost.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Begin Your Project",
        text: "Once the scope is approved, we assign a dedicated engineering pod and begin building your system with continuous progress updates and a 99.99% uptime SLA.",
      },
    ],
  },
];

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {contactSchemaJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ))}
      {children}
    </>
  );
}
