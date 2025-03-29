import type { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import {
  useComposerControls,
  useComposerState,
} from "@/app/providers/composer";
import { Drawer } from "@mantine/core";

interface Props {
  author?: ProfileViewDetailed;
}

export default function Composer(props: Props) {
  const { closeComposer } = useComposerControls();
  const { isOpen, options } = useComposerState();

  return (
    <Drawer opened={isOpen} onClose={closeComposer} position="bottom">
      {props.author?.handle}
    </Drawer>
  );
}
