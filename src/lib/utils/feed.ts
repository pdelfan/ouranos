import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { FeedFilterResult } from "../../../types/feed";
import {
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyFeedDefs,
} from "@atproto/api";

export function filterFeed(feed: FeedViewPost, feedFilter: FeedFilterResult) {
  const post = feed.post;
  const isEmbed =
    AppBskyEmbedRecord.isView(post.embed) ||
    AppBskyEmbedRecordWithMedia.isView(post.embed);
  const isByUnfollowed = !post.author.viewer?.following;
  const isRepost = AppBskyFeedDefs.isReasonRepost(feed?.reason);
  const isReply =
    feed.reply || (post.record as AppBskyEmbedRecord.View["record"]).reply;

  if (feedFilter.hideReplies && isReply) {
    return false;
  } else if (feedFilter.hideRepliesByUnfollowed && isReply && isByUnfollowed) {
    return false;
  } else if (feedFilter.hideReposts && isRepost) {
    return false;
  } else if (
    feedFilter.hideRepliesByLikeCount &&
    isReply &&
    (post.likeCount || 0) < feedFilter.hideRepliesByLikeCount
  ) {
    return false;
  } else if (feedFilter.hideQuotePosts && isEmbed) {
    return false;
  } else {
    return true;
  }
}
