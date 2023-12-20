"use client";

import { useComposerContext } from "@/app/providers/composer";
import Editor from "@/components/inputs/editor/Editor";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  author: ProfileViewDetailed | null | undefined;
}

export default function Composer(props: Props) {
  const { author } = props;
  const { isOpen, options, openComposer, closeComposer } = useComposerContext();

  const toggleComposer = () => {
    if (isOpen) closeComposer();
    else openComposer({});
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleComposer}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content
          onEscapeKeyDown={(e) => e.preventDefault()}
          onInteractOutside={(e) => e.preventDefault()}
          id="composer"
        >
          <Editor
            author={author}
            onCancel={() => closeComposer()}
            options={options}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
