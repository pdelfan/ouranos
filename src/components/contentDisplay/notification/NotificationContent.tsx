import { useQuery } from "@tanstack/react-query";
import { ContentFilterResult } from "../../../../types/feed";
import useAgent from "@/lib/hooks/bsky/useAgent";
import { getPost } from "@/lib/api/bsky/feed";
import PostText from "@/components/dataDisplay/postText/postText";
import { AppBskyFeedDefs } from "@atproto/api";
import PostEmbed from "@/components/dataDisplay/postEmbed/PostEmbed";
import Link from "next/link";
import { getPostId } from "@/lib/utils/link";
import { useRouter } from "next/navigation";

interface Props {
  uri: string;
  filter: ContentFilterResult;
}

export default function NotificationContnet(props: Props) {
  const { uri, filter } = props;
  const agent = useAgent();
  const router = useRouter();

  const { status, data, error, isLoading, isFetching } = useQuery({
    queryKey: ["notificationContent", uri],
    queryFn: () => getPost(agent, uri),
  });

  const post =
    data?.data.thread && (data.data.thread as AppBskyFeedDefs.FeedViewPost);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        router.push(
          `/dashboard/user/${post?.post.author.handle}/post/${getPostId(uri)}`
        );
      }}
      className="cursor-pointer"
    >
      {post && <PostText record={post.post.record} />}
      {post?.post.embed && (
        <div className="max-w-xs">
          <PostEmbed content={post.post.embed} depth={0} />
        </div>
      )}
    </div>
  );
}
