import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { getUserReplyPosts } from "@/lib/api/bsky/feed";

interface Props {
  params: {
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { handle } = props.params;
  const posts = await getUserReplyPosts(handle);

  return (
    <>
      {posts.data.feed &&
        posts.data.feed
          .filter((post) => post.reply)
          .map((post, i) => <FeedPost key={post.post.uri} post={post} />)}
    </>
  );
}
