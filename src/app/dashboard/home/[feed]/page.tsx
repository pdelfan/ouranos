import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { getFeed } from "@/lib/api/bsky/feed";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: {
    feed: string;
    uri: string;
  };
}

export default async function Feed(props: Props) {
  const { searchParams } = props;
  const feed = await getFeed(searchParams.uri);

  return (
    <div>
      {feed.data.feed &&
        feed.data.feed.map((post) => (
          <FeedPost key={post.post.uri} post={post} />
        ))}
    </div>
  );
}
