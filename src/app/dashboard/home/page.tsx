import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { getTimeline } from "@/lib/api/bsky/feed";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const timeline = await getTimeline();  

  return (
    <div>
      {timeline.data.feed &&
        timeline.data.feed.map((post, i) => (
          <FeedPost key={post.post.uri} post={post} />
        ))}
    </div>
  );
}
