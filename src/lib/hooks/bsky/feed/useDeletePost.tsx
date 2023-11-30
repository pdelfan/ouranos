import { AppBskyFeedDefs } from "@atproto/api";
import useAgent from "../useAgent";
import { useMutation } from "@tanstack/react-query";
import { removePost } from "../../../api/bsky/feed";

interface Props {
  post: AppBskyFeedDefs.PostView;
}

export const useDeletePostKey = (postUri: string) => ["deletePost", postUri];

export default function useDeletePost(props: Props) {
  const { post } = props;
  const agent = useAgent();

  const deletePost = useMutation({
    mutationKey: useDeletePostKey(post.uri),
    mutationFn: async () => {
      try {
        await removePost(agent, post.uri);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    deletePost,
  };
}
