import { getSessionFromServer } from "@/app/api/auth/[...nextauth]/route";
import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { getUserLikes } from "@/lib/api/bsky/feed";
import { redirect } from "next/navigation";

interface Props {
  params: {
    handle: string;
  };
}

export default async function Page(props: Props) {
  const { handle } = props.params;
  const session = await getSessionFromServer();

  if (session?.user?.handle !== handle) {
    redirect(`/dashboard/user/${handle}`);
  }

  const likes = await getUserLikes(handle);

  return (
    <>
      {likes.data.feed &&
        likes.data.feed.map((post) => (
          <FeedPost key={post.post.uri} post={post} />
        ))}
    </>
  );
}
