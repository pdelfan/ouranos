"use client";

import useScrollTranslation from "@/lib/hooks/useScrollTranslation";
import { ReactNode, createContext, useContext } from "react";

const ScrollContext = createContext<number>(0);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    return;
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
}
export const ScrollProvider = (props: ScrollProviderProps) => {
  const { children } = props;
  const val = useScrollTranslation();

  return (
    <ScrollContext.Provider value={val}>{children}</ScrollContext.Provider>
  );
};
