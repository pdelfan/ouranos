import FeedPost from "@/components/contentDisplay/feedPost/FeedPost";
import { ContentFilterResult, Thread } from "../../../types/feed";
import { AppBskyFeedDefs } from "@atproto/api";
import BlockedEmbed from "@/components/dataDisplay/postEmbed/BlockedEmbed";
import NotFoundEmbed from "@/components/dataDisplay/postEmbed/NotFoundEmbed";

interface Props {
  parentChain: Thread[];
  contentFilter: ContentFilterResult;
}

export default function ParentContainer(props: Props) {
  const { parentChain, contentFilter } = props;

  return (
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
  );
}
