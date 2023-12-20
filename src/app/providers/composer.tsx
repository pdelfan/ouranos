"use client";

import { AppBskyEmbedRecord } from "@atproto/api";
import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ComposerOptionsPostRef {
  uri: string;
  cid: string;
  text: string;
  author: {
    handle: string;
    displayName?: string;
    avatar?: string;
  };
}

export interface ComposerOptionsQuote {
  uri: string;
  cid: string;
  text: string;
  indexedAt: string;
  author: {
    did: string;
    handle: string;
    displayName?: string;
    avatar?: string;
  };
  embeds?: AppBskyEmbedRecord.ViewRecord["embeds"];
}

export interface ComposerOptions {
  replyTo?: ComposerOptionsPostRef;
  onPost?: () => void;
  quote?: ComposerOptionsQuote;
  mention?: string;
}

interface ComposerContextType {
  isOpen: boolean;
  options: ComposerOptions | null;
  openComposer: (initialOptions?: ComposerOptions) => void;
  closeComposer: () => void;
}

const ComposerContext = createContext<ComposerContextType | undefined>(
  undefined
);

export const useComposerContext = (): ComposerContextType => {
  const context = useContext(ComposerContext);
  if (!context) {
    throw new Error(
      "useComposerContext must be used within a ComposerProvider"
    );
  }
  return context;
};

interface ComposerProviderProps {
  children: ReactNode;
}

export const ComposerProvider: React.FC<ComposerProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ComposerOptions | null>(null);

  const openComposer = (initialOptions?: ComposerOptions) => {
    setOptions(initialOptions || null);
    setIsOpen(true);
  };

  const closeComposer = () => {
    setOptions(null);
    setIsOpen(false);
  };

  const contextValue: ComposerContextType = {
    isOpen,
    options,
    openComposer,
    closeComposer,
  };

  return (
    <ComposerContext.Provider value={contextValue}>
      {children}
    </ComposerContext.Provider>
  );
};
