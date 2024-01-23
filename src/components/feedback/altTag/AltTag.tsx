import Button from "@/components/actions/button/Button";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CgClose } from "react-icons/cg";
import { useClipboard } from "use-clipboard-copy";
import toast from "react-hot-toast";
import { BiSolidCopy } from "react-icons/bi";

interface Props {
  text: string;
}

export default function AltTag(props: Props) {
  const { text } = props;
  const [showAlt, setShowAlt] = useState(false);
  const clipboard = useClipboard({ copiedTimeout: 3500 });

  const handleCopyAltText = () => {
    clipboard.copy(text);
    toast.success("Alt text copied to clipboard");
  };

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
          e.preventDefault();
          handleShowAlt();
        }}
        className="absolute bottom-1.5 left-1.5 text-xs font-semibold px-2 py-0.5 rounded-md text-white bg-black/50 hover:bg-neutral-500/90"
      >
        ALT
      </Button>

      <Dialog.Root open={showAlt} onOpenChange={handleCloseAlt}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 animate-fade animate-duration-200" />
          <div className="flex items-center justify-center fixed inset-0 z-50">
            <Dialog.Content
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onPointerDownOutside={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleCloseAlt();
              }}
              className="m-3.5"
            >
              <Dialog.Close asChild>
                <Button className="z-50 fixed left-3 top-3 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90">
                  <CgClose className="text-xl" />
                </Button>
              </Dialog.Close>
              <div className="cursor-text z-50 bg-black/60  max-w-xl max-h-[calc(100svh-10rem)] overflow-auto p-4  text-white rounded-xl">
                <div className="flex flex-wrap gap-3 justify-between mb-4">
                  <Dialog.Title className="text-xl font-semibold">
                    Alternative text
                  </Dialog.Title>
                  <Button
                    onClick={handleCopyAltText}
                    className="bg-gray-200/20 p-2 rounded-lg hover:bg-gray-200/30"
                  >
                    <BiSolidCopy />
                  </Button>
                </div>
                <Dialog.Description className="mt-2">{text}</Dialog.Description>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
