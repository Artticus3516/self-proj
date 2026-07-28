import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Archon's enterprise IT services: custom SaaS development, Infrastructure as a Service (IaaS), cloud migration, DevOps automation, and digital transformation consulting. 99.99% uptime SLA.",
  keywords: [
    "SaaS engineering services",
    "IaaS cloud infrastructure",
    "digital transformation agency",
    "DevOps automation services",
    "enterprise IT consulting",
    "cloud migration services",
    "custom software development",
    "high-availability hosting",
    "CI/CD pipeline architecture",
    "microservices containerization",
  ],
  alternates: {
    canonical: "https://archon-art.vercel.app/services",
  },
  openGraph: {
    type: "website",
    title: "Services",
    description:
      "Custom SaaS development, Infrastructure as a Service, and digital transformation consulting for enterprise organisations. Built for systems that cannot fail.",
    url: "https://archon-art.vercel.app/services",
    siteName: "Archon",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services",
    description:
      "Custom SaaS development, Infrastructure as a Service, and digital transformation consulting for enterprise organisations.",
    creator: "@ArchonAgency",
  },
};

const serviceSchemaJsonLd = [
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
        name: "Services",
        item: "https://archon-art.vercel.app/services",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Archon IT Services",
      url: "https://archon-art.vercel.app",
    },
    serviceType: "Infrastructure as a Service (IaaS)",
    name: "Infrastructure as a Service",
    description:
      "Architect and provision resilient server topologies built for scale. High-availability clusters, custom DevOps pipelines, and enterprise-grade cloud architectures with 99.99% uptime SLA.",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Archon IT Services",
      url: "https://archon-art.vercel.app",
    },
    serviceType: "SaaS Engineering",
    name: "SaaS Engineering & Development",
    description:
      "End-to-end engineering of production-grade software platforms. Multi-tenant database schemas, real-time data pipelines, authentication systems, and performance optimization.",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "Organization",
      name: "Archon IT Services",
      url: "https://archon-art.vercel.app",
    },
    serviceType: "Digital Transformation",
    name: "Digital Transformation Consulting",
    description:
      "Migrate and modernize monolithic enterprise architectures into high-velocity cloud-native frameworks with zero downtime and zero data loss.",
    areaServed: "Worldwide",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Infrastructure as a Service (IaaS)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Infrastructure as a Service (IaaS) is a cloud computing model where virtualised computing resources — servers, storage, and networking — are provisioned and managed remotely. Archon designs high-availability IaaS clusters with custom DevOps pipelines, auto-scaling systems, and SOC 2 compliant security hardening.",
        },
      },
      {
        "@type": "Question",
        name: "How does custom SaaS engineering work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Custom SaaS engineering involves building scalable, multi-tenant software platforms from the ground up. Archon handles the full lifecycle: multi-tenant database architecture, real-time data pipelines and APIs, authentication and authorisation systems, and performance optimisation for production scale.",
        },
      },
      {
        "@type": "Question",
        name: "What does digital transformation include?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Digital transformation at Archon means migrating legacy monolithic systems to cloud-native architectures. This includes microservices and containerisation, zero-downtime deployment strategies, cloud-native architecture redesign, and post-migration performance benchmarking.",
        },
      },
      {
        "@type": "Question",
        name: "How long does a typical enterprise project take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Project timelines vary by scope. Archon onboards new projects in under 48 hours with a scoped architecture brief. MVP builds typically take 4-8 weeks, mid-market enterprise projects 3-6 months, and full-scale digital transformations 6-12 months. All projects include ongoing support and maintenance.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide ongoing maintenance and support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All Archon engagements include post-deployment support with a 99.99% uptime SLA. We provide continuous monitoring, security patching, performance optimisation, and scaling support as your business grows.",
        },
      },
      {
        "@type": "Question",
        name: "What security standards does Archon follow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Archon adheres to SOC 2 security standards. Every project includes security hardening, compliance audits, encrypted data transmission via TLS 1.3, and role-based access controls. We also support GDPR, CCPA, and India's DPDP Act 2023 compliance requirements.",
        },
      },
    ],
  },
];

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {serviceSchemaJsonLd.map((schema, i) => (
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
