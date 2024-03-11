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
        className="text-skin-inverted bg-skin-overlay hover:bg-skin-inverted absolute bottom-1.5 left-1.5 rounded-md px-2 py-0.5 text-xs font-semibold"
      >
        ALT
      </Button>

      <Dialog.Root open={showAlt} onOpenChange={handleCloseAlt}>
        <Dialog.Portal>
          <Dialog.Overlay className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50" />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
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
                <Button className="text-skin-inverted bg-skin-overlay hover:bg-skin-inverted fixed left-3 top-3 z-50 rounded-full p-3.5">
                  <CgClose className="text-xl" />
                </Button>
              </Dialog.Close>
              <div className="text-skin-inverted z-50 max-h-[calc(100svh-10rem)]  max-w-xl cursor-text overflow-auto rounded-xl  bg-black/60 p-4">
                <div className="mb-4 flex flex-wrap justify-between gap-3">
                  <Dialog.Title className="text-xl font-semibold">
                    Alternative text
                  </Dialog.Title>
                  <Button
                    onClick={handleCopyAltText}
                    className="bg-skin-inverted hover:bg-skin-inverted/90 rounded-lg p-2"
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
