import { AppBskyFeedDefs } from "@atproto/api";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { repost, unRepost } from "../../../api/bsky/feed";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export const useRepostKey = (postUri: string) => ["repost", postUri];

export default function useLike(props: Props) {
  const { post } = props;
  const agent = useAgent();
  const queryClient = useQueryClient();
  const [reposted, setReposted] = useState(!!post.viewer?.repost);
  const [repostUri, setRepostUri] = useState(post.viewer?.repost);
  const repostCount =
    (reposted ? 1 : 0) -
    (post.viewer?.repost ? 1 : 0) +
    (post.repostCount || 0);

  const toggleRepost = useMutation({
    mutationKey: useRepostKey(post.uri),
    mutationFn: async () => {
      if (!repostUri) {
        try {
          setReposted(true);
          const result = await repost(agent, post.uri, post.cid);
          setRepostUri(result.uri);
        } catch (err) {
          setReposted(false);
        }
      } else {
        try {
          setReposted(false);
          await unRepost(agent, repostUri);
          setRepostUri(undefined);
        } catch (err) {
          setReposted(true);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
    },
    onError: () => {
      toast.error("Could not repost", { id: "Repost error" });
    },
  });

  return {
    reposted,
    toggleRepost,
    repostCount,
  };
}
