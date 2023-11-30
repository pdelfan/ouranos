import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ouranos — Login",
  description: "Your Bluesky web client",
};

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[100svh] flex items-center justify-center ">
      {children}
    </main>
  );
}
