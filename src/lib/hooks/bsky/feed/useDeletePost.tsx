import { AppBskyFeedDefs } from "@atproto/api";
import useAgent from "../useAgent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removePost } from "../../../api/bsky/feed";
import toast from "react-hot-toast";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export const useDeletePostKey = (postUri: string) => ["deletePost", postUri];

export default function useDeletePost(props: Props) {
  const { post } = props;
  const agent = useAgent();
  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationKey: useDeletePostKey(post.uri),
    mutationFn: async () => {
      try {
        await removePost(agent, post.uri);
      } catch (err) {
        console.error(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
      toast.success("Post deleted");
    },
    onError: () => {
      toast.error("Could not delete post");
    },
  });

  return {
    deletePost,
  };
}
