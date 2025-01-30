"use client";

import TanStackQueryProvider from "./tanstack";
import MantineProvider from "./mantine";
import "@mantine/core/styles.css";
import "@/styles/globals.css";

interface Props {
  children: React.ReactNode;
}

export default function Providers(props: Props) {
  return (
    <TanStackQueryProvider>
      <MantineProvider>{props.children}</MantineProvider>
    </TanStackQueryProvider>
  );
}
