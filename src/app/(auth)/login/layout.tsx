import type { Metadata } from "next";
import Image from "next/image";

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
    <>
      <main className="min-h-[100svh] flex items-center justify-center animate-fade-up animate-delay-500 animate-duration-[1000ms">
        {children}
      </main>
      <Image
        src="/images/loginBackground.svg"
        alt="Numerous ouranos logos"
        width={1000}
        height={200}
        className="fixed bottom-0 w-screen h-[50svh] object-cover animate-fade-up animate-delay-300 animate-duration-[1500ms]"
      />
    </>
  );
}
