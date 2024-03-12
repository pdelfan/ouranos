"use client";

import { ThemeProvider as Provider } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function ThemeProvider(props: Props) {
  const { children } = props;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isClient) {
    return (
      <Provider attribute="data-theme" disableTransitionOnChange={true}>
        {children}
      </Provider>
    );
  }
}
