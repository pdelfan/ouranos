import { AppBskyFeedDefs } from "@atproto/api";
import { ContentFilterResult, ThreadViewResult } from "../../../types/feed";
import { sortThread } from "@/lib/utils/feed";
import BlockedEmbed from "@/components/dataDisplay/postEmbed/BlockedEmbed";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";
import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { MAX_REPLIES } from "@/lib/consts/thread";
import Link from "next/link";
import { getPostId } from "@/lib/utils/link";
import { useState } from "react";

interface Props {
  replies: AppBskyFeedDefs.ThreadViewPost[][];
  threadPreferences: ThreadViewResult;
  contentFilter: ContentFilterResult;
}

export default function RepliesContainer(props: Props) {
  const { replies, threadPreferences, contentFilter } = props;
  const [expandThread, setExpandThread] = useState(false);

  return (
    <>
      {replies
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

                {AppBskyFeedDefs.isThreadViewPost(reply) && j < MAX_REPLIES && (
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
                      className="inline-block bg-neutral-600/10 py-2 px-2.5 text-neutral-600 text-sm font-medium rounded-full hover:bg-neutral-200"
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
