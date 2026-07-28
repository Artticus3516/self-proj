interface BlogArticleSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  url: string;
  image?: string;
}

export function BlogArticleSchema({
  title,
  description,
  datePublished,
  dateModified,
  authorName = "Archon Engineering Team",
  url,
  image,
}: BlogArticleSchemaProps) {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url: url,
    author: {
      "@type": "Organization",
      name: authorName,
      url: "https://archon-art.vercel.app",
    },
    publisher: {
      "@type": "Organization",
      name: "Archon IT Services",
      url: "https://archon-art.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://archon-art.vercel.app/logo.png",
      },
    },
    ...(image ? { image: [image] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default BlogArticleSchema;
