import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Engineering Blog | Archon",
  description:
    "Expert insights on SaaS architecture, enterprise web design, digital transformation, and high-performance React development from the engineers at Archon.",
  keywords: [
    "saas architecture blog",
    "enterprise web design insights",
    "digital transformation articles",
    "react performance optimization",
    "nextjs development blog",
    "cloud infrastructure guides",
    "web development best practices",
  ],
  alternates: {
    canonical: "https://archon-art.vercel.app/blog",
  },
  openGraph: {
    type: "website",
    title: "Insights & Engineering Blog | Archon",
    description:
      "Expert insights on SaaS architecture, enterprise web design, and digital transformation.",
    url: "https://archon-art.vercel.app/blog",
    siteName: "Archon",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        name: "Blog",
        item: "https://archon-art.vercel.app/blog",
      },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Blog", "CollectionPage"],
    "@id": "https://archon-art.vercel.app/blog#blog",
    url: "https://archon-art.vercel.app/blog",
    name: "Archon Engineering & Insights Blog",
    description:
      "Expert insights on SaaS architecture, enterprise web design, digital transformation, and high-performance React development from the engineers at Archon.",
    publisher: {
      "@type": "Organization",
      name: "Archon IT Services",
      url: "https://archon-art.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://archon-art.vercel.app/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {children}
    </>
  );
}
