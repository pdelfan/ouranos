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
  const [open, setOpen] = useState(false);

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
            className="z-50 min-w-fit mt-2 mb-2 bg-white rounded-xl p-1 drop-shadow-lg border max-h-44 overflow-y-hidden hover:overflow-y-auto animate-fade animate-duration-200"
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
  textColor?: string;
  icon?: string;
}

function DropdownMenuItem(props: DropdownMenuItemProps) {
  const { onSelect, text, textColor, icon } = props;
  let { closeMenu } = useContext(DropdownMenuContext);

  return (
    <RadixDropdownMenu.Item
      onClick={(e) => {
        e.stopPropagation();
        closeMenu();
        onSelect();
      }}
      className={`flex justify-between items-center gap-5 py-1 px-2 ${
        textColor ? textColor : "text-neutral-600"
      } rounded-md hover:bg-neutral-100 hover:outline-none hover:cursor-pointer`}
    >
      <span className="font-medium">{text}</span>
      {icon && <Icon icon={icon} className="text-xl" />}
    </RadixDropdownMenu.Item>
  );
}

Dropdown.MenuItem = DropdownMenuItem;
