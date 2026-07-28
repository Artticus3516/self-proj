import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Traffic Logs",
  description: "View GDPR/DPDP compliant analytics and traffic logs for the Archon platform.",
};

export default function AdminTrafficLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
