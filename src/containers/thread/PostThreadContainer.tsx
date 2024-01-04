"use client";

import useAgent from "@/lib/hooks/bsky/useAgent";
import { getPostThread } from "@/lib/api/bsky/feed";
import { useQuery } from "@tanstack/react-query";
import { AppBskyFeedDefs } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import useOrganizeThread from "@/lib/hooks/bsky/feed/useOrganizeThread";
import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import usePreferences from "@/lib/hooks/bsky/actor/usePreferences";
import ThreadPost from "@/components/contentDisplay/threadPost/ThreadPost";
import BlockedEmbed from "@/components/dataDisplay/postEmbed/BlockedEmbed";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";
import Button from "@/components/actions/button/Button";
import { useRouter } from "next/navigation";
import FeedPostSkeleton from "@/components/contentDisplay/feedPost/FeedPostSkeleton";
import FeedAlert from "@/components/feedback/feedAlert/FeedAlert";
import { sortThread } from "@/lib/utils/feed";
import Link from "next/link";
import { getPostId } from "@/lib/utils/link";

interface Props {
  id: string;
  handle: string;
}

export default function PostThreadContainer(props: Props) {
  const { id, handle } = props;
  const agent = useAgent();
  const router = useRouter();
  const MAX_REPLIES = 4;

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
        <div className="md:border  md:border-x md:rounded-t-2xl">
          <h2 className="text-xl text-center font-semibold px-3 py-2">Post</h2>
        </div>
        <section className="border border-t-0 md:rounded-b-2xl p-3">
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
          <div className="flex justify-center mt-3">
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
      <div className="md:border md:border-b-0 border-b-0 md:border-x md:rounded-t-2xl">
        <h2 className="text-xl text-center font-semibold px-3 py-2">Post</h2>
      </div>

      {(isFetching || isLoading) && <FeedPostSkeleton />}

      {parentChain && parentChain.length > 0 && (
        <div className="flex flex-col justify-between p-3 border border-x-0 md:border-x  first:border-t-0 last:border-b last:rounded-b-2xl even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0">
          {parentChain.map((parent, i) => (
            <div key={i}>
              {AppBskyFeedDefs.isBlockedPost(parent) && (
                <BlockedEmbed depth={0} isReply={i < parentChain.length - 1} />
              )}
              {AppBskyFeedDefs.isNotFoundPost(parent) && (
                <NotFoundEmbed depth={0} isReply={i < parentChain.length - 1} />
              )}
              {AppBskyFeedDefs.isBlockedAuthor(parent) && (
                <BlockedEmbed depth={0} isReply={i < parentChain.length - 1} />
              )}

              {AppBskyFeedDefs.isThreadViewPost(parent) && contentFilter && (
                <FeedPost
                  post={parent}
                  filter={contentFilter}
                  isParent={i < parentChain.length - 1}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {thread && contentFilter && (
        <ThreadPost post={thread?.post as PostView} filter={contentFilter} />
      )}

      {contentFilter &&
        threadPreferences &&
        replyChains &&
        replyChains
          .sort((a, b) => sortThread(a[0], b[0], threadPreferences))
          .map((replyArr, i) => (
            <div
              className="p-3 border border-x-0 md:border-x first:border-t-0 last:border-b md:last:rounded-b-2xl even:[&:not(:last-child)]:border-b-0 odd:[&:not(:last-child)]:border-b-0"
              key={i}
            >
              {replyArr.map((reply, j) => (
                <div className={reply.post.uri} key={reply.post.uri}>
                  {AppBskyFeedDefs.isBlockedPost(reply) && (
                    <BlockedEmbed depth={0} />
                  )}
                  {AppBskyFeedDefs.isNotFoundPost(reply) && (
                    <NotFoundEmbed depth={0} />
                  )}
                  {AppBskyFeedDefs.isBlockedAuthor(reply) && (
                    <BlockedEmbed depth={0} />
                  )}

                  {AppBskyFeedDefs.isThreadViewPost(reply) &&
                    j < MAX_REPLIES && (
                      <FeedPost
                        post={reply}
                        filter={contentFilter}
                        isParent={j < replyArr.length - 1 && j < MAX_REPLIES}
                      />
                    )}

                  {AppBskyFeedDefs.isThreadViewPost(reply) &&
                    j === MAX_REPLIES && (
                      <Link
                        href={`/dashboard/user/${
                          reply.post.author.handle
                        }/post/${getPostId(reply.post.uri)}`}
                        className="inline-block bg-neutral-600/10 py-2 px-2.5 text-neutral-600 text-sm rounded-full hover:bg-neutral-200"
                      >
                        View Thread
                      </Link>
                    )}
                </div>
              ))}
            </div>
          ))}
    </>
  );
}
