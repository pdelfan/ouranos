"use client";

import { useComposerContext } from "@/app/providers/compoter";
import Editor from "@/components/inputs/editor/Editor";
import * as Dialog from "@radix-ui/react-dialog";

export default function Composer() {
  const { isOpen, options, openComposer, closeComposer } = useComposerContext();

  const toggleComposer = () => {
    if (isOpen) closeComposer();
    else openComposer({});
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleComposer} modal={false}>
      <Dialog.Portal>
        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
        >
          <Editor onCancel={() => closeComposer()} options={options} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
