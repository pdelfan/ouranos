import { useRouter } from "next/navigation";
import Button from "@/components/actions/button/Button";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import { useClipboard } from "use-clipboard-copy";
import type { AppBskyFeedDefs } from "@atproto/api";
import { useCallback } from "react";
import useMuteUser from "@/lib/hooks/bsky/feed/useMuteUser";
import useBlockUser from "@/lib/hooks/bsky/actor/useBlockUser";
import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import toast from "react-hot-toast";
import {
  BiDotsHorizontalRounded,
  BiLink,
  BiSolidBell,
  BiSolidBellOff,
} from "react-icons/bi";
import { BsPersonFill, BsPersonFillSlash } from "react-icons/bs";
import { PiMagnifyingGlassBold } from "react-icons/pi";

interface Props {
  author: AppBskyFeedDefs.PostView["author"];
  viewer: ViewerState;
  viewerHandle: string;
  viewerDID: string;
}

export default function UserActions(props: Props) {
  const { author, viewer, viewerHandle, viewerDID } = props;
  const router = useRouter();
  const { muted, toggleMuteUser } = useMuteUser({ author: author });
  const { toggleBlockUser } = useBlockUser({
    author: author,
    viewer: viewer,
    viewerDID: viewerDID,
  });

  const clipboard = useClipboard({ copiedTimeout: 3500 });

  const handleShare = useCallback(() => {
    const shareUrl = `https://useouranos.app/dashboard/user/${author.handle}`;
    clipboard.copy(shareUrl);
    toast.success("Link to profile copied to clipboard", {
      id: "Copy profile link",
    });
  }, [clipboard, author.handle]);

  const handleSearch = useCallback(() => {
    router.push(`/dashboard/search?query=from:${author.handle}+`);
  }, [router, author.handle]);

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="text-skin-secondary bg-skin-tertiary flex items-center justify-center gap-1 rounded-full p-2 text-sm font-medium hover:brightness-95 disabled:cursor-not-allowed"
        >
          <BiDotsHorizontalRounded className="text-skin-icon-base text-lg" />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.MenuItem
          onSelect={handleShare}
          text="Copy Link to Profile"
          icon={<BiLink />}
        />

        <Dropdown.MenuItem
          onSelect={handleSearch}
          text="Search Posts"
          icon={<PiMagnifyingGlassBold />}
        />

        {viewerHandle !== author.handle && (
          <>
            <Dropdown.MenuItem
              onSelect={() => {
                toggleMuteUser.mutate();
              }}
              text={`${muted ? "Unmute User" : "Mute User"}`}
              icon={muted ? <BiSolidBell /> : <BiSolidBellOff />}
            />
            <Dropdown.MenuItem
              onSelect={() => {
                toggleBlockUser.mutate();
              }}
              text={`${viewer.blocking ? "Unblock User" : "Block User"}`}
              icon={viewer.blocking ? <BsPersonFill /> : <BsPersonFillSlash />}
            />
          </>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
