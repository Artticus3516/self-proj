import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Insights & Engineering Blog | Atlas",
    description:
        "Expert insights on SaaS architecture, enterprise web design, digital transformation, and high-performance React development from the engineers at Atlas.",
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
        canonical: "https://atlas-agency.com/blog",
    },
    openGraph: {
        type: "website",
        title: "Insights & Engineering Blog | Atlas",
        description:
            "Expert insights on SaaS architecture, enterprise web design, and digital transformation.",
        url: "https://atlas-agency.com/blog",
        siteName: "Atlas",
    },
};

export default function BlogLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
