"use client";

import TanStackQueryProvider from "./tanstack";
import MantineProvider from "./mantine";
import "@mantine/core/styles.css";
import "@/styles/globals.css";
import { ATProtoProvider } from "./atproto";
import { ComposerProvider } from "./composer";

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  return (
    <TanStackQueryProvider>
      <ATProtoProvider>
        <MantineProvider>
          <ComposerProvider>{props.children}</ComposerProvider>
        </MantineProvider>
      </ATProtoProvider>
    </TanStackQueryProvider>
  );
}
