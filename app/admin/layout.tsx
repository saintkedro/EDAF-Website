import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s · EDAF admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[60vh] bg-cream">{children}</div>;
}
