import Button from "@/components/actions/button/Button";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CgClose } from "react-icons/cg";

interface Props {
  text: string;
}

export default function AltTag(props: Props) {
  const { text } = props;
  const [showAlt, setShowAlt] = useState(false);

  const handleShowAlt = () => {
    setShowAlt(!showAlt);
  };

  const handleCloseAlt = () => {
    setShowAlt(false);
  };

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleShowAlt();
        }}
        className="absolute bottom-1.5 left-1.5 text-xs font-semibold px-2 py-0.5 rounded-md text-white bg-black/50 hover:bg-neutral-500/90"
      >
        ALT
      </Button>

      <Dialog.Root open={showAlt} onOpenChange={handleCloseAlt}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 animate-fade animate-duration-200" />
          <Dialog.Content
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center justify-center fixed inset-0 z-50 "
          >
            <Dialog.Close asChild>
              <Button className="z-50 fixed left-3 top-3 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90">
                <CgClose className="text-xl" />
              </Button>
            </Dialog.Close>
            <div className="cursor-text fixed z-50 bg-black/60 m-3.5 max-w-xl max-h-[calc(100%-3rem)] overflow-auto p-4  text-white rounded-xl">
              <Dialog.Title className="text-xl font-semibold">
                Alternative text
              </Dialog.Title>
              <Dialog.Description className="mt-2">{text}</Dialog.Description>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
