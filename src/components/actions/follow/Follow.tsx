"use client";

import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Button from "../button/Button";
import { UseMutationResult } from "@tanstack/react-query";

interface Props {
  onToggleFollow: UseMutationResult<void, Error, void, unknown>;
  viewer: ViewerState;
}

export default function Follow(props: Props) {
  const { onToggleFollow, viewer } = props;
  const hasBlocked = viewer.blocking ? true : false;
  const isFollowing = viewer.following ? true : false;

  return (
    <>
      {!hasBlocked && (
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

      {hasBlocked && (
        // TODO: Add unblock functionality
        <Button
          onClick={() => {}}
          className="rounded-full px-4 py-2 bg-neutral-100 hover:brightness-95"
        >
          Unblock          
        </Button>
      )}
    </>
  );
}
