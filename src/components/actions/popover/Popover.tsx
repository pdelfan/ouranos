import * as RadixPopover from "@radix-ui/react-popover";
import React, { createContext, ReactNode, useContext, useState } from "react";

let PopoverContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

interface PopoverProps
  extends React.ComponentPropsWithoutRef<typeof RadixPopover.Root> {
  children: ReactNode;
}

export default function Popover(props: PopoverProps) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <RadixPopover.Root open={open} onOpenChange={setOpen} {...props}>
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
            className="bg-skin-base z-50 mb-2 mt-2 max-h-44 min-w-fit overflow-y-hidden rounded-xl border p-1 drop-shadow-lg hover:overflow-y-auto"
          >
            {children}
          </RadixPopover.Content>
        </RadixPopover.Portal>
      )}
    </PopoverContentContext.Provider>
  );
}

Popover.Content = PopoverContent;
