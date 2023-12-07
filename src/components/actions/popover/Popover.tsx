import * as RadixPopover from "@radix-ui/react-popover";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

let PopoverContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

export default function Popover({ children }: { children: ReactNode }) {
  let [open, setOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <RadixPopover.Root open={open} onOpenChange={setOpen}>
        {children}
      </RadixPopover.Root>
    </PopoverContext.Provider>
  );
}

function PopoverTrigger({ children }: { children: ReactNode }) {
  return <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>;
}

Popover.Trigger = PopoverTrigger;

let PopoverContentContext = createContext({ closeMenu: () => {} });

function PopoverContent({ children }: { children: ReactNode }) {
  let { open, setOpen } = useContext(PopoverContext);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <PopoverContentContext.Provider value={{ closeMenu }}>
      {open && (
        <RadixPopover.Portal forceMount>
          <RadixPopover.Content
            onCloseAutoFocus={(e) => {
              e.preventDefault(); // remove outline on close
            }}
            align="center"
            className="z-50 min-w-fit mt-2 mb-2 bg-white rounded-xl p-1 drop-shadow-lg border max-h-44 overflow-y-hidden hover:overflow-y-auto"
          >
            {children}
          </RadixPopover.Content>
        </RadixPopover.Portal>
      )}
    </PopoverContentContext.Provider>
  );
}

Popover.Content = PopoverContent;
