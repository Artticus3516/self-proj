import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Blog CMS",
  description: "Manage and publish blog posts, insights, and engineering articles for the Archon platform.",
};

export default function AdminBlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
