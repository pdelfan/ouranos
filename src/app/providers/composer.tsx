"use client";

import { AppBskyEmbedRecord } from "@atproto/api";
import React, { createContext, useState, ReactNode } from "react";

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

interface StateContext {
  isOpen: boolean;
  options: ComposerOptions | null;
}

interface ControlsContext {
  openComposer: (initialOptions?: ComposerOptions) => void;
  closeComposer: () => void;
}

const StateContext = createContext<StateContext>({
  isOpen: false,
  options: null,
});

const ControlsContext = createContext<ControlsContext>({
  openComposer: () => {},
  closeComposer: () => {},
});

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

  const controls = React.useMemo(
    () => ({
      openComposer,
      closeComposer,
    }),
    [],
  );

  const state = {
    isOpen,
    options,
  };

  return (
    <ControlsContext.Provider value={controls}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </ControlsContext.Provider>
  );
};

export function useComposerState() {
  return React.useContext(StateContext);
}

export function useComposerControls() {
  return React.useContext(ControlsContext);
}
