import { FeedViewPost } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import {
  ContentFilter,
  ContentFilterResult,
  FeedFilterResult,
  ThreadViewResult,
} from "../../../types/feed";
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

import { Preferences } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { AppBskyActorDefs } from "@atproto/api";
import { CONTENT_FILTER_OPTIONS } from "../consts/moderation";
import { THREAD_VIEW_PREFS } from "../consts/settings";

export function getFeedFilter(
  preferences: Preferences | undefined
): FeedFilterResult {
  const getFilters = (prefs?: Preferences) => {
    const defaultFeedViewPref = {
      hideReplies: false,
      hideRepliesByUnfollowed: false,
      hideRepliesByLikeCount: 2,
      hideReposts: false,
      hideQuotePosts: false,
      $type: "app.bsky.actor.defs#feedViewPref",
      feed: "home",
    } as AppBskyActorDefs.FeedViewPref;

    if (!prefs) {
      return defaultFeedViewPref;
    }

    const feedViewPref =
      (prefs.find(
        (x) => AppBskyActorDefs.isFeedViewPref(x) && x.feed === "home"
      ) as AppBskyActorDefs.FeedViewPref | undefined) ?? defaultFeedViewPref;

    return feedViewPref;
  };

  const filters = getFilters(preferences);

  return {
    feed: filters.feed,
    hideReplies: filters.hideReplies ?? false,
    hideRepliesByLikeCount: filters.hideRepliesByLikeCount ?? 0,
    hideRepliesByUnfollowed: filters.hideRepliesByUnfollowed ?? false,
    hideReposts: filters.hideReposts ?? false,
    hideQuotePosts: filters.hideQuotePosts ?? false,
  };
}

export function getContentFilter(
  preferences: Preferences | undefined
): ContentFilterResult {
  const getFilters = (prefs?: Preferences) => {
    const contentFilters: ContentFilter[] = [];
    const adultContentFilters: ContentFilter[] = [];
    let isAdultContentHidden = false;

    if (!prefs) {
      return {
        isAdultContentHidden,
        contentFilters,
        adultContentFilters,
      };
    }

    Object.entries(prefs).map(([_, pref]) => {
      const isContentPref = AppBskyActorDefs.isContentLabelPref(pref);
      const isAdultContentPref = AppBskyActorDefs.isAdultContentPref(pref);

      // general content pref (hate, spam, impersonation)
      if (isContentPref) {
        const label = pref.label;
        const filter = CONTENT_FILTER_OPTIONS.find(
          (f) => !f.adult && f.type === label
        );
        if (filter) {
          filter.visiblity = pref.visibility ?? filter?.visiblity;
          contentFilters.push(filter);
        }
      }

      // adult content is disabled
      if (isAdultContentPref) {
        isAdultContentHidden = !pref.enabled;
      }

      // adult pref
      if (isContentPref) {
        const label = pref.label;
        const filter = CONTENT_FILTER_OPTIONS.find(
          (f) => f.adult && f.type === label
        );

        if (filter) {
          filter.visiblity = pref.visibility ?? filter?.visiblity;
          adultContentFilters.push(filter);
        }
      }
    });

    return {
      isAdultContentHidden,
      contentFilters,
      adultContentFilters,
    };
  };

  const filters = getFilters(preferences);

  return {
    contentFilters: filters.contentFilters,
    isAdultContentHidden: filters.isAdultContentHidden,
    adultContentFilters: filters.adultContentFilters,
  };
}

export default function getThreadPreferences(
  preferences: Preferences | undefined
) {
  const getFilters = (prefs?: Preferences) => {
    const threadViewPrefs: ThreadViewResult = THREAD_VIEW_PREFS;

    if (!prefs) {
      return THREAD_VIEW_PREFS;
    }

    Object.entries(prefs).map(([_, pref]) => {
      const isThreadViewPref = AppBskyActorDefs.isThreadViewPref(pref);

      if (isThreadViewPref) {
        threadViewPrefs.prioritizeFollowedUsers =
          pref.prioritizeFollowedUsers ??
          THREAD_VIEW_PREFS.prioritizeFollowedUsers;
        threadViewPrefs.sort = pref.sort ?? THREAD_VIEW_PREFS.sort;
      }
    });

    return threadViewPrefs;
  };

  const filters = getFilters(preferences);

  return filters;
}
