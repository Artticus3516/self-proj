import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Figit 's privacy policy. We are fully compliant with GDPR, CCPA, and India's DPDP Act 2023. Learn how we collect, process, and protect your data.",
  alternates: {
    canonical: "https://Figit -art.vercel.app/privacy",
  },
  openGraph: {
    type: "website",
    title: "Privacy Policy",
    description:
      "Figit 's privacy policy — GDPR, CCPA, and DPDP Act 2023 compliant data handling practices.",
    url: "https://Figit -art.vercel.app/privacy",
    siteName: "Figit ",
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
      item: "https://Figit -art.vercel.app",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: "https://Figit -art.vercel.app/privacy",
    },
  ],
};

export default function PrivacyLayout({
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
