import { AppBskyFeedDefs } from "@atproto/api";
import { ContentFilterResult, ThreadViewResult } from "../../../types/feed";
import BlockedEmbed from "@/components/dataDisplay/postEmbed/BlockedEmbed";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";
import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { MAX_REPLIES } from "@/lib/consts/thread";
import { useState } from "react";

interface Props {
  replies: AppBskyFeedDefs.ThreadViewPost[];
  contentFilter: ContentFilterResult;
}

export default function RepliesContainer(props: Props) {
  const { replies, contentFilter } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {replies.map((reply, j) => (
        <div className={reply.post.uri} key={reply.post.uri}>
          {AppBskyFeedDefs.isBlockedPost(reply) && <BlockedEmbed depth={0} />}
          {AppBskyFeedDefs.isNotFoundPost(reply) && <NotFoundEmbed depth={0} />}
          {AppBskyFeedDefs.isBlockedAuthor(reply) && <BlockedEmbed depth={0} />}

          {AppBskyFeedDefs.isThreadViewPost(reply) && j < MAX_REPLIES && (
            <FeedPost
              post={reply}
              filter={contentFilter}
              isParent={j < replies.length - 1 && j < MAX_REPLIES}
            />
          )}

          {AppBskyFeedDefs.isThreadViewPost(reply) &&
            j === MAX_REPLIES &&
            replies.length > MAX_REPLIES &&
            !showMore && (
              <div className="inline-block bg-neutral-600/10 py-2 px-2.5 text-neutral-600 text-sm font-medium rounded-full hover:bg-neutral-200">
                <button onClick={() => setShowMore(true)}>Show More</button>
              </div>
            )}

          {AppBskyFeedDefs.isThreadViewPost(reply) &&
            j >= MAX_REPLIES &&
            showMore && (
              <FeedPost
                post={reply}
                filter={contentFilter}
                isParent={j <= replies.length - 1}
              />
            )}

          {j == replies.length - 1 && showMore && (
            <div className="inline-block bg-neutral-600/10 py-2 px-2.5 text-neutral-600 text-sm font-medium rounded-full hover:bg-neutral-200">
              <button onClick={() => setShowMore(false)}>Show Less</button>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
