import { AppBskyFeedDefs } from "@atproto/api";
import { ContentFilterResult } from "../../../types/feed";
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
        <div key={j}>
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
              <button
                onClick={() => setShowMore(true)}
                className="text-skin-secondary bg-skin-muted hover:bg-skin-muted/90 inline-block rounded-full px-2.5 py-2 m-3 text-sm font-medium"
              >
                Show More
              </button>
            )}

          {AppBskyFeedDefs.isThreadViewPost(reply) &&
            j >= MAX_REPLIES &&
            showMore && (
              <FeedPost
                post={reply}
                filter={contentFilter}
                isParent={j < replies.length - 1}
              />
            )}
        </div>
      ))}
    </>
  );
}
