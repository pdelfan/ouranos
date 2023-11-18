import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Ouranos — Login",
  description: "Your Bluesky web client",
};

export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();
  if (session?.user) redirect("/dashboard/home");

  return (
    <main className="min-h-[100svh] flex items-center justify-center ">
      {children}
    </main>
  );
}
