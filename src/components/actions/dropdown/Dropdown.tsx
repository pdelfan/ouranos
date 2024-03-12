import * as RadixDropdownMenu from "@radix-ui/react-dropdown-menu";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";

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

function DropdownTrigger({
  children,
  disabled,
}: {
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <RadixDropdownMenu.Trigger asChild disabled={disabled}>
      {children}
    </RadixDropdownMenu.Trigger>
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
            className="animate-fade animate-duration-200 border-skin-base bg-skin-base z-50 mb-2 mt-2 max-h-44 min-w-fit overflow-y-auto rounded-xl border p-1 shadow-lg"
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
  icon?: ReactElement;
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
      className={`flex cursor-pointer items-center justify-between gap-5 px-2 py-1 ${
        textColor ? textColor : "text-skin-base"
      } hover:bg-skin-tertiary hover:cursor-pointerbg-skin-tertiary rounded-md hover:outline-none`}
    >
      <span className="font-medium">{text}</span>
      <span className="text-xl">{icon}</span>
    </RadixDropdownMenu.Item>
  );
}

Dropdown.MenuItem = DropdownMenuItem;
