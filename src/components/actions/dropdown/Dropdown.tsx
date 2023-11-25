import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

let DropdownContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

export default function Dropdown({ children }: { children: ReactNode }) {
  let [open, setOpen] = useState(false);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <RadixDropdownMenu.Root open={open} onOpenChange={setOpen}>
        {children}
      </RadixDropdownMenu.Root>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ children }: { children: ReactNode }) {
  return (
    <RadixDropdownMenu.Trigger asChild>{children}</RadixDropdownMenu.Trigger>
  );
}

Dropdown.Trigger = DropdownTrigger;

let DropdownMenuContext = createContext({ closeMenu: () => {} });

function DropdownMenu({ children }: { children: ReactNode }) {
  let { open, setOpen } = useContext(DropdownContext);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <DropdownMenuContext.Provider value={{ closeMenu }}>
      {open && (
        <RadixDropdownMenu.Portal forceMount>
          <RadixDropdownMenu.Content
            onCloseAutoFocus={(e) => {
              e.preventDefault(); // remove outline on close
            }}
            align="center"
            className="z-50 min-w-[200px] mt-2 bg-white rounded-xl p-1 drop-shadow-lg border"
          >
            {children}
          </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
      )}
    </DropdownMenuContext.Provider>
  );
}

Dropdown.Menu = DropdownMenu;

interface DropdownMenuItemProps {
  onSelect: () => void;
  text: string;
  icon: string;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const { onSelect, text, icon } = props;
  let { closeMenu } = useContext(DropdownMenuContext);

  return (
    <RadixDropdownMenu.Item
      onClick={(e) => {
        e.stopPropagation();
        closeMenu();
        onSelect();
      }}
      className="flex justify-between items-center py-1 px-2 text-neutral-600 rounded-md hover:bg-neutral-100 hover:outline-none hover:cursor-pointer"
    >
      <span className="font-medium">{text}</span>
      <Icon icon={icon} className="text-xl" />
    </RadixDropdownMenu.Item>
  );
}

Dropdown.MenuItem = DropdownMenuItem;
