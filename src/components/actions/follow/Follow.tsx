"use client";

import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Button from "../button/Button";

interface Props {
  viewer: ViewerState;
}

export default function Follow(props: Props) {
  const { viewer } = props;
  const isFollowing = viewer?.following;

  return (
    <Button
      className={`rounded-full px-4 py-2 ${
        isFollowing
          ? "bg-neutral-100 hover:brightness-95"
          : "bg-neutral-700 text-white hover:brightness-90"
      }`}
      icon={isFollowing ? "bx:check" : "bx:plus"}
    >
      {isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
