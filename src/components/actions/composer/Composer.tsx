"use client";

import {
  useComposerControls,
  useComposerState,
} from "@/app/providers/composer";
import Editor from "@/components/inputs/editor/Editor";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import * as Dialog from "@radix-ui/react-dialog";

interface Props {
  author: ProfileViewDetailed | null | undefined;
}

export default function Composer(props: Props) {
  const { author } = props;
  const { openComposer, closeComposer } = useComposerControls();
  const { isOpen, options } = useComposerState();

  return (
    <Dialog.Root open={isOpen} onOpenChange={() => openComposer()}>
      <Dialog.Portal>
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
