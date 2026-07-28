import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Leads",
  description: "View and manage incoming project architecture briefs and client leads.",
};

export default function AdminLeadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
