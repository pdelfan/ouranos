import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import { useClipboard } from "use-clipboard-copy";
import type { AppBskyFeedDefs } from "@atproto/api";
import { useCallback } from "react";
import useMuteUser from "@/lib/hooks/bsky/feed/useMuteUser";
import useBlockUser from "@/lib/hooks/bsky/actor/useBlockUser";
import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import toast from "react-hot-toast";

interface Props {
  author: AppBskyFeedDefs.PostView["author"];
  viewer: ViewerState;
  viewerHandle: string;
  viewerDID: string;
}

export default function UserActions(props: Props) {
  const { author, viewer, viewerHandle, viewerDID } = props;
  const { muted, toggleMuteUser } = useMuteUser({ author: author });
  const { toggleBlockUser } = useBlockUser({
    author: author,
    viewer: viewer,
    viewerDID: viewerDID,
  });

  const clipboard = useClipboard({ copiedTimeout: 3500 });

  const handleShare = useCallback(() => {
    const shareUrl = `https://bsky.app/profile/${author.handle}`;
    clipboard.copy(shareUrl);
    toast.success("Link to profile copied to clipboard");
  }, [clipboard, author]);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          icon="bx:dots-horizontal-rounded"
          className="flex items-center justify-center gap-1 font-medium text-sm disabled:cursor-not-allowed rounded-full p-2 bg-neutral-100 text-neutral-500 hover:brightness-95"
        />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.MenuItem
          onSelect={handleShare}
          text="Copy Link to Profile"
          icon="bx:link"
        />

        {viewerHandle !== author.handle && (
          <>
            <Dropdown.MenuItem
              onSelect={() => {
                toggleMuteUser.mutate();
              }}
              text={`${muted ? "Unmute User" : "Mute User"}`}
              icon="bxs:bell-off"
            />
            <Dropdown.MenuItem
              onSelect={() => {
                toggleBlockUser.mutate();
              }}
              text={`${viewer.blocking ? "Unblock User" : "Block User"}`}
              icon="mdi:user-block"
            />
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
