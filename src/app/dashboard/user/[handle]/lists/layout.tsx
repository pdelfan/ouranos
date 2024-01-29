import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos — List",
  description: "List",
};

export default function ListsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
