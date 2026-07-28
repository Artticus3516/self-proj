import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Services CMS",
  description: "Manage enterprise IT services, cloud infrastructure offerings, and digital transformation capabilities.",
};

export default function AdminServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
