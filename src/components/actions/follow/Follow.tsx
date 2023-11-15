"use client";

import { ViewerState } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import Button from "../button/Button";
import useAgent from "@/lib/hooks/useAgent";
import { follow, unfollow } from "@/lib/api/bsky/social";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  viewer: ViewerState;
  userDID: string;
  userHandle: string;
}

export default function Follow(props: Props) {
  const { viewer, userDID, userHandle } = props;
  const agent = useAgent();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState<boolean>(
    viewer?.following ? true : false
  );

  const updateFollowCount = (mode: "decrease" | "increase") => {
    queryClient.setQueryData(["profile", userHandle], (oldData: any) => {
      return {
        ...oldData,
        followsCount:
          mode === "increase"
            ? oldData.followsCount + 1
            : oldData.followsCount - 1,
      };
    });
  };

  const handleFollow = async () => {
    setIsFollowing(!isFollowing);

    if (isFollowing && viewer?.following) {
      try {
        updateFollowCount("decrease");
        await unfollow(agent, viewer?.following);
      } catch (error) {
        setIsFollowing(true);
        updateFollowCount("increase");
      }
    } else {
      try {
        updateFollowCount("increase");
        await follow(agent, userDID);
      } catch (error) {
        setIsFollowing(false);
        updateFollowCount("decrease");
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
