import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos — Search",
  description: "Search",
};

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
