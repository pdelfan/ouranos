import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionProvider from "./providers/session";
import { getSessionFromServer } from "./api/auth/[...nextauth]/route";
import QueryProvider from "./providers/query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ouranos",
  description: "Your Bluesky web client",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
