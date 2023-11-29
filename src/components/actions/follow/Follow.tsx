"use client";

import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Button from "../button/Button";
import { UseMutationResult } from "@tanstack/react-query";
import useBlockUser from "@/lib/hooks/bsky/actor/useBlockUser";
import { AppBskyFeedDefs } from "@atproto/api";

interface Props {
  onToggleFollow: UseMutationResult<void, Error, void, unknown>;
  author: AppBskyFeedDefs.PostView["author"];
  viewer: ViewerState;
  viewerDID: string;
}

export default function Follow(props: Props) {
  const { onToggleFollow, author, viewer, viewerDID } = props;
  const isBlocked = viewer.blocking || viewer.blockingByList ? true : false;
  const hasBlockedYou = viewer.blockedBy ? true : false;
  const isFollowing = viewer.following ? true : false;

  const { blocked, toggleBlockUser } = useBlockUser({
    author: author,
    viewer: viewer,
    viewerDID: viewerDID,
  });

  if (author.did === viewerDID) return null;

  return (
    <>
      {!isBlocked && !hasBlockedYou && (
        <Button
          onClick={() => onToggleFollow.mutate()}
          className={`rounded-full px-4 py-2 ${
            isFollowing
              ? "bg-neutral-100 hover:brightness-95"
              : "bg-neutral-700 text-white hover:brightness-90"
          }`}
          icon={isFollowing ? "bx:check" : "bx:plus"}
        >
          {isFollowing ? "Following" : "Follow"}
        </Button>
      )}

      {hasBlockedYou && (
        <Button
          disabled={true}
          className={`rounded-full px-4 py-2 ${
            isFollowing
              ? "bg-neutral-100 hover:brightness-95"
              : "bg-neutral-700 text-white hover:brightness-90"
          }`}
        >
          Blocked
        </Button>
      )}

      {isBlocked && (
        <Button
          onClick={() => {
            toggleBlockUser.mutate();
          }}
          className="rounded-full px-4 py-2 bg-neutral-100 hover:brightness-95"
        >
          Unblock
        </Button>
      )}
    </>
  );
}
