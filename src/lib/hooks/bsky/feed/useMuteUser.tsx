import { AppBskyFeedDefs } from "@atproto/api";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { muteUser, unMuteUser } from "@/lib/api/bsky/actor";
import { profileKey } from "../actor/useProfile";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

interface Props {
  author: AppBskyFeedDefs.PostView["author"];
}

export const useMuteKey = (did: string) => ["mute", did];

export default function useLike(props: Props) {
  const { author } = props;
  const agent = useAgent();
  const [muted, setMuted] = useState(!!author.viewer?.muted);
  const queryClient = useQueryClient();
  const queryKey = profileKey(author.handle);

  const toggleMuteUser = useMutation({
    mutationKey: useMuteKey(author.did),
    mutationFn: async () => {
      if (!muted) {
        try {
          setMuted(true);
          await muteUser(author.did, agent);
          queryClient.invalidateQueries({ queryKey });
        } catch (err) {
          setMuted(false);
        }
      } else {
        try {
          setMuted(false);
          await unMuteUser(author.did, agent);
          queryClient.invalidateQueries({ queryKey });
        } catch (err) {
          setMuted(true);
        }
      }
    },
    onError: () => {
      toast.error("Could not mute user", { id: "Mute user error" });
    },
  });

  return {
    muted,
    toggleMuteUser,
  };
}
