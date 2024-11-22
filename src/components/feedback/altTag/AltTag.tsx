import Button from "@/components/actions/button/Button";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CgClose } from "react-icons/cg";
import { useClipboard } from "use-clipboard-copy";
import { BiSolidCopy } from "react-icons/bi";

interface Props {
  text: string;
}

export default function AltTag(props: Props) {
  const { text } = props;
  const [showAlt, setShowAlt] = useState(false);
  const { copy, copied } = useClipboard({ copiedTimeout: 3500 });

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setShowAlt((prev) => !prev);
        }}
        className="text-skin-secondary bg-skin-secondary hover:bg-skin-muted hover:text-skin-base absolute bottom-1.5 left-1.5 rounded-md px-2 py-0.5 text-xs font-semibold border border-skin-base"
      >
        ALT
      </Button>

      <Dialog.Root
        open={showAlt}
        onOpenChange={() => setShowAlt((prev) => !prev)}
      >
        <Dialog.Portal>
          <Dialog.Overlay
            className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50"
            onClick={(e) => {
              e.stopPropagation();
              setShowAlt(false);
            }}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <Dialog.Content
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="m-3.5"
            >
              <Dialog.Close asChild>
                <Button className="text-skin-secondary bg-skin-secondary hover:bg-skin-muted hover:text-skin-base fixed left-3 top-3 z-50 rounded-full p-3.5 border border-skin-base">
                  <CgClose className="text-xl" />
                </Button>
              </Dialog.Close>
              <div className="text-skin-inverted bg-skin-base border border-skin-base z-50 max-h-[calc(100svh-10rem)] max-w-xl cursor-text overflow-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 mb-4 bg-skin-tertiary p-2 rounded-lg">
                  <Dialog.Title className="text-xl font-semibold text-skin-base">
                    Alternative text
                  </Dialog.Title>
                  <Button
                    onClick={() => copy(text)}
                    className="bg-skin-base text-skin-base px-3 py-1.5 rounded-lg border border-skin-base"
                  >
                    <BiSolidCopy />
                    {copied ? "Copied" : "Copy"}
                  </Button>
                </div>
                <Dialog.Description className="mt-2 text-skin-base">
                  {text}
                </Dialog.Description>
              </div>
            </Dialog.Content>
          </div>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
