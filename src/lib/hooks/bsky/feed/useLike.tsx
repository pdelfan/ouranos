import { AppBskyFeedDefs } from "@atproto/api";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { likePost, unlikePost } from "../../../api/bsky/feed";
import toast from "react-hot-toast";
import { useAgent } from "@/app/providers/agent";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export const useLikeKey = (postUri: string) => ["like", postUri];

export default function useLike(props: Props) {
  const { post } = props;
  const agent = useAgent();
  const [liked, setLiked] = useState(!!post.viewer?.like);
  const [likeUri, setLikeUri] = useState(post.viewer?.like);
  const likeCount =
    (liked ? 1 : 0) - (post.viewer?.like ? 1 : 0) + (post.likeCount || 0);

  const toggleLike = useMutation({
    mutationKey: useLikeKey(post.uri),
    mutationFn: async () => {
      if (!likeUri) {
        try {
          setLiked(true);
          const like = await likePost(agent, post.uri, post.cid);
          setLikeUri(like.uri);
        } catch (err) {
          setLiked(false);
        }
      } else {
        try {
          setLiked(false);
          await unlikePost(agent, likeUri);
          setLikeUri(undefined);
        } catch (err) {
          setLiked(true);
        }
      }
    },
    onError: () => {
      toast.error("Could not like post", { id: "Post like error" });
    },
  });

  return {
    liked,
    toggleLike,
    likeCount,
  };
}
