"use client";

import { MantineProvider as BaseProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";

const theme = createTheme({
  colors: {
    purple: [
      "#f9e9ff",
      "#eaceff",
      "#d09bff",
      "#b664ff",
      "#9f36ff",
      "#9118ff",
      "#8a06ff",
      "#7700e5",
      "#6a00cd",
      "#5b00b4",
    ],
  },
  primaryColor: "purple",
});

interface Props {
  children: React.ReactNode;
}

export default function MantineProvider(props: Props) {
  return <BaseProvider theme={theme}>{props.children}</BaseProvider>;
}
