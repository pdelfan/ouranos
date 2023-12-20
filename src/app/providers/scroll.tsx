"use client";

import useHideOnScroll from "@/lib/hooks/useHideOnScroll";
import { ReactNode, createContext, useContext } from "react";

const ScrollContext = createContext<boolean | undefined>(undefined);

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
  const show = useHideOnScroll();

  return (
    <ScrollContext.Provider value={show}>{children}</ScrollContext.Provider>
  );
};
