import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Providers from "./providers";

export const metadata: Metadata = {
  title: { template: "%s — Ouranos", default: "Ouranos" },
  description: "Your friendly Bluesky client for the web",
  metadataBase: new URL("https://useouranos.app"),
  other: {
    "fc:frame": "vNext",
    "of:version": "vNext",
    "of:accepts:anonymous": "vNext",
    "of:image": "https://useouranos.app/opengraph-image.png",
    "fc:frame:image": "https://useouranos.app/opengraph-image.png",
    "fc:frame:button:1": "Home",
    "fc:frame:button:1:action": "link",
    "fc:frame:button:1:target": "https://useouranos.app",
    "fc:frame:button:2": "About",
    "fc:frame:button:2:action": "link",
    "fc:frame:button:2:target": "https://useouranos.app/about",
    "fc:frame:button:3": "GitHub",
    "fc:frame:button:3:action": "link",
    "fc:frame:button:3:target": "https://github.com/pdelfan/ouranos",
  },
};

const inter = Inter({ subsets: ["latin"] });

interface Props {
  children: React.ReactNode;
}

export default function RootLayout(props: Props) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
