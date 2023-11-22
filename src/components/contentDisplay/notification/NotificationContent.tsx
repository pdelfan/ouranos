import { useQuery } from "@tanstack/react-query";
import { ContentFilterResult } from "../../../../types/feed";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { getPost } from "@/lib/api/bsky/feed";
import PostText from "@/components/dataDisplay/postText/postText";
import { AppBskyFeedDefs } from "@atproto/api";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";

interface Props {
  uri: string;
  filter: ContentFilterResult;
}

export default function NotificationContnet(props: Props) {
  const { uri, filter } = props;

  const agent = useAgent();

  const { status, data, error, isLoading, isFetching } = useQuery({
    queryKey: ["notificationContent", uri],
    queryFn: () => getPost(agent, uri),
  });

  const post =
    data?.data.thread && (data.data.thread as AppBskyFeedDefs.FeedViewPost);

  return (
    <div>
      {post && <PostText record={post.post.record} />}
      {post?.post.embed && (
        <div className="max-w-xs">
          <PostEmbed content={post.post.embed} depth={0} />
        </div>
      )}
    </div>
  );
}
