"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { getPostThread } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import { AppBskyFeedDefs } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import useOrganizeThread from "@/lib/hooks/bsky/feed/useOrganizeThread";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import ThreadPost from "@/components/contentDisplay/threadPost/ThreadPost";
import BlockedEmbed from "@/components/dataDisplay/postEmbed/BlockedEmbed";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";
import Button from "@/components/actions/button/Button";
import { useRouter } from "next/navigation";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import RepliesContainer from "./RepliesContainer";
import ParentContainer from "./ParentContainer";
import { sortThread } from "@/lib/utils/feed";
import ComposePrompt from "@/components/actions/composePrompt/ComposePrompt";
import WhoCanReply from "@/components/feedback/WhoCanReply/WhoCanReply";

interface Props {
  id: string;
  handle: string;
  viewerAvatar?: string;
}

export default function PostThreadContainer(props: Props) {
  const { id, handle, viewerAvatar } = props;
  const agent = useAgent();
  const router = useRouter();

  const {
    data: thread,
    error,
    isError,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ["postThread", id],
    queryFn: async () => {
      const { data } = await agent.resolveHandle({ handle });
      if (!data) return;
      const uri = `at://${data.did}/app.bsky.feed.post/${id}`;
      return getPostThread(agent, uri);
    },
  });

  const { replyChains, parentChain } = useOrganizeThread({
    thread: thread,
  });

  const { preferences } = usePreferences();
  const contentFilter = preferences?.contentFilter;
  const threadPreferences = preferences?.threadPreferences;

  if (
    AppBskyFeedDefs.isBlockedPost(thread) ||
    AppBskyFeedDefs.isNotFoundPost(thread) ||
    AppBskyFeedDefs.isBlockedAuthor(thread) ||
    isError
  ) {
    return (
      <>
        <div className="md:rounded-t-2xl  md:border md:border-x">
          <h2 className="px-3 py-2 text-center text-xl font-semibold">Post</h2>
        </div>
        <section className="border border-t-0 p-3 md:rounded-b-2xl">
          {AppBskyFeedDefs.isBlockedPost(thread) && <BlockedEmbed depth={0} />}
          {AppBskyFeedDefs.isNotFoundPost(thread) && (
            <NotFoundEmbed depth={0} />
          )}
          {AppBskyFeedDefs.isBlockedAuthor(thread) && (
            <BlockedEmbed depth={0} />
          )}
          {isError && (
            <FeedAlert
              variant="badResponse"
              message={error.message}
              standalone={true}
            />
          )}
          <div className="mt-3 flex justify-center">
            <Button onClick={() => router.push("/dashboard/home")}>
              Go Home
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="border-b-0 md:rounded-t-2xl md:border md:border-x md:border-b-0">
        <h2 className="px-3 py-2 text-center text-xl font-semibold">Post</h2>
      </div>

      {(isFetching || isLoading) && <FeedPostSkeleton />}

      {parentChain && parentChain.length > 0 && contentFilter && (
        <ParentContainer
          parentChain={parentChain}
          contentFilter={contentFilter}
        />
      )}

      {thread && contentFilter && (
        <>
          <ThreadPost post={thread?.post as PostView} filter={contentFilter} />
          <WhoCanReply post={thread?.post as PostView} />
          <ComposePrompt
            avatar={viewerAvatar}
            post={thread?.post as PostView}
            rounded={replyChains.length === 0}
          />
        </>
      )}

      {contentFilter &&
        threadPreferences &&
        replyChains &&
        replyChains
          // .sort((a, b) => sortThread(a[0], b[0], threadPreferences))
          .map((replyArr, i) => (
            <div
              className="border border-x-0 p-3 first:border-t-0 last:border-b md:border-x md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0"
              key={i}
            >
              <RepliesContainer
                replies={replyArr}
                contentFilter={contentFilter}
              />
            </div>
          ))}
    </>
  );
}
