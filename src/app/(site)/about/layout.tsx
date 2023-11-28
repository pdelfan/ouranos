import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos - About",
  description: "About Ouranos",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
