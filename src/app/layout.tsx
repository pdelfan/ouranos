import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SessionProvider from "./providers/session";
import QueryProvider from "./providers/query";
import { ComposerProvider } from "./providers/composer";
import ToastProvider from "./providers/toast";
import { ScrollProvider } from "./providers/scroll";
import { getSessionFromServer } from "@/lib/api/auth/session";
import ThemeProvider from "./providers/theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Your friendly Bluesky client for the web",
  metadataBase: new URL("https://useouranos.app"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromServer();

  return (
    <html lang="en" className="bg-skin-base">
      <head>
        {/* for making the page fullscreen on iOS when added to home */}
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SessionProvider session={session}>
            <ScrollProvider>
              <QueryProvider>
                <ComposerProvider>{children}</ComposerProvider>
              </QueryProvider>
              <ToastProvider />
            </ScrollProvider>
          </SessionProvider>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
