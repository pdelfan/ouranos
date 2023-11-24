import { AppBskyFeedDefs } from "@atproto/api";
import useAgent from "../useAgent";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { muteUser, unMuteUser } from "@/lib/api/bsky/actor";

interface Props {
  author: AppBskyFeedDefs.PostView["author"];
}

export const useMuteKey = (did: string) => ["mute", did];

export default function useLike(props: Props) {
  const { author } = props;
  const agent = useAgent();
  const [muted, setMuted] = useState(!!author.viewer?.muted);

  const toggleMuteUser = useMutation({
    mutationKey: useMuteKey(author.did),
    mutationFn: async () => {
      if (!muted) {
        try {
          setMuted(true);
          const result = await muteUser(author.did, agent);
        } catch (err) {
          setMuted(false);
        }
      } else {
        try {
          setMuted(false);
          await unMuteUser(author.did, agent);
        } catch (err) {
          setMuted(true);
        }
      }
    },
  });

  return {
    muted,
    toggleMuteUser,
  };
}
