import PostThreadContainer from "@/containers/thread/PostThreadContainer";
import { getSessionFromServer } from "@/lib/api/auth/session";
import { getProfile } from "@/lib/api/bsky/actor";
import { getAgent } from "@/lib/api/bsky/agent";
import { getPostThread } from "@/lib/api/bsky/feed";
import { AppBskyFeedDefs, AppBskyFeedPost } from "@atproto/api";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const agent = await getAgent();
  const { handle, id } = params;
  const { data } = await agent.resolveHandle({ handle });
  const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
  const post = await getPostThread(uri);

  const isThreadViewPost = AppBskyFeedDefs.isThreadViewPost(post) ? true : false;
  const threadPost = isThreadViewPost ? post.post as AppBskyFeedDefs.PostView : null;

  const text =
    threadPost && AppBskyFeedPost.isRecord(threadPost.record)
      ? threadPost.record.text
      : "";

  const title = text !== "" ? `${threadPost?.author.displayName || params.handle}: "${text}"` : `Post by ${params.handle}`;

  return {
    title: title,
    description: "Feed",
  };
}

interface Props {
  params: {
    id: string;
    handle: string;
  };
  searchParams: {
    query?: string;
  };
}

export default async function Page(props: Props) {
  const { id, handle } = props.params;
  const { query } = props.searchParams;
  const session = await getSessionFromServer();
  const profile = await getProfile(session?.user.bskySession.handle);

  return (
    <PostThreadContainer
      id={id}
      handle={handle}
      viewerAvatar={profile?.avatar}
      repliesTextFilter={query ?? ""}
    />
  );
}
