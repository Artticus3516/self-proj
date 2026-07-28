import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Understand how Archon uses cookies and tracking technologies. Learn about first-party cookies, consent choices, and how to manage your cookie preferences.",
  alternates: {
    canonical: "https://archon-art.vercel.app/cookies",
  },
  openGraph: {
    type: "website",
    title: "Cookie Policy",
    description:
      "Archon's cookie policy — how we use cookies and tracking, and your consent choices.",
    url: "https://archon-art.vercel.app/cookies",
    siteName: "Archon",
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
      name: "Cookie Policy",
      item: "https://archon-art.vercel.app/cookies",
    },
  ],
};

export default function CookiesLayout({
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
