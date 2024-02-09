import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { ContentFilterResult, Thread } from "../../../types/feed";
import { AppBskyFeedDefs } from "@atproto/api";
import BlockedEmbed from "@/components/dataDisplay/postEmbed/BlockedEmbed";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";
import { MAX_PARENT_REPLIES } from "@/lib/consts/thread";
import { useState } from "react";
import Threadline from "@/components/dataDisplay/threadLine/ThreadLine";

interface Props {
  parentChain: Thread[];
  contentFilter: ContentFilterResult;
}

export default function ParentContainer(props: Props) {
  const { parentChain, contentFilter } = props;
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="flex flex-col justify-between border border-x-0 p-3 first:border-t-0  last:rounded-b-2xl last:border-b md:border-x odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0">
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
            <>
              {/* only show the first and last two replies initially if above
              threshold */}
              {parentChain.length >= MAX_PARENT_REPLIES && (
                <>
                  {i < 2 && (
                    <FeedPost
                      post={parent}
                      filter={contentFilter}
                      isParent={i < parentChain.length - 1}
                    />
                  )}
                  {i == 2 && !showMore && (
                    <button
                      onClick={() => setShowMore(true)}
                      className="relative mb-6 inline-block rounded-full bg-neutral-600/10 px-2.5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-200"
                    >
                      Show More
                      <Threadline className="top-6" />
                    </button>
                  )}
                  {showMore && i >= 2 && i < parentChain.length - 2 && (
                    <FeedPost
                      post={parent}
                      filter={contentFilter}
                      isParent={i < parentChain.length - 1}
                    />
                  )}
                  {i >= parentChain.length - 2 && (
                    <FeedPost
                      post={parent}
                      filter={contentFilter}
                      isParent={i < parentChain.length - 1}
                    />
                  )}
                </>
              )}
              {/* show all replies if below threshold */}
              {parentChain.length < MAX_PARENT_REPLIES && (
                <FeedPost
                  post={parent}
                  filter={contentFilter}
                  isParent={i < parentChain.length - 1}
                />
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
