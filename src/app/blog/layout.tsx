import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert insights on SaaS architecture, enterprise web design, digital transformation, and high-performance React development from the engineers at Figit .",
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
    canonical: "https://Figit -art.vercel.app/blog",
  },
  openGraph: {
    type: "website",
    title: "Blog",
    description:
      "Expert insights on SaaS architecture, enterprise web design, and digital transformation.",
    url: "https://Figit -art.vercel.app/blog",
    siteName: "Figit ",
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
        item: "https://Figit -art.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://Figit -art.vercel.app/blog",
      },
    ],
  };

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Blog", "CollectionPage"],
    "@id": "https://Figit -art.vercel.app/blog#blog",
    url: "https://Figit -art.vercel.app/blog",
    name: "Figit  Engineering & Insights Blog",
    description:
      "Expert insights on SaaS architecture, enterprise web design, digital transformation, and high-performance React development from the engineers at Figit .",
    publisher: {
      "@type": "Organization",
      name: "Figit  IT Services",
      url: "https://Figit -art.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://Figit -art.vercel.app/logo.png",
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
