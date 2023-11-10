"use client";

import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Button from "../button/Button";
import useAgent from "@/lib/hooks/useAgent";
import { follow, unfollow } from "@/lib/api/bsky/social";
import { useState } from "react";

interface Props {
  viewer: ViewerState;
  userDID: string;
}

export default function Follow(props: Props) {
  const { viewer, userDID } = props;
  const [isFollowing, setIsFollowing] = useState<boolean>(
    viewer?.following ? true : false
  );
  const agent = useAgent();

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);

    if (isFollowing && viewer?.following) {
      try {
        await unfollow(agent, viewer?.following);
      } catch (error) {
        setIsFollowing(true);
      }
    } else {
      try {
        await follow(agent, userDID);
      } catch (error) {
        setIsFollowing(false);
      }
    }
  };

  return (
    <Button
      onClick={handleFollow}
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
