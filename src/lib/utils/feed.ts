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
import { Preferences } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { AppBskyActorDefs } from "@atproto/api";
import { CONTENT_FILTER_OPTIONS } from "../consts/moderation";
import { THREAD_VIEW_PREFS } from "../consts/settings";
import { ViewRecord } from "@atproto/api/dist/client/types/app/bsky/embed/record";

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

export function getFeedFilter(
  preferences: Preferences | undefined,
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
        (x) => AppBskyActorDefs.isFeedViewPref(x) && x.feed === "home",
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
  preferences: Preferences | undefined,
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
          (f) => !f.adult && f.type === label,
        );
        if (filter) {
          filter.visibility = pref.visibility ?? filter?.visibility;
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
          (f) => f.adult && f.type === label,
        );

        if (filter) {
          filter.visibility = pref.visibility ?? filter?.visibility;
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

  const sortedContentFilters = filters.contentFilters.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  const sortedAdultContentFilters = filters.adultContentFilters.sort((a, b) =>
    a.label.localeCompare(b.label),
  );

  return {
    contentFilters: sortedContentFilters,
    isAdultContentHidden: filters.isAdultContentHidden,
    adultContentFilters: sortedAdultContentFilters,
  };
}

export default function getThreadPreferences(
  preferences: Preferences | undefined,
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

export const sortThread = (
  a: AppBskyFeedDefs.ThreadViewPost,
  b: AppBskyFeedDefs.ThreadViewPost,
  threadPrefs: ThreadViewResult,
) => {
  if (
    !AppBskyFeedDefs.isThreadViewPost(a) ||
    !AppBskyFeedDefs.isThreadViewPost(b)
  ) {
    return 0;
  }

  if (threadPrefs.sort === "oldest") {
    const aDate = new Date(a.post.indexedAt);
    const bDate = new Date(b.post.indexedAt);
    return aDate.getTime() - bDate.getTime();
  } else if (threadPrefs.sort === "newest") {
    const aDate = new Date(a.post.indexedAt);
    const bDate = new Date(b.post.indexedAt);
    return bDate.getTime() - aDate.getTime();
  } else if (threadPrefs.sort === "most-likes") {
    const aLikes = a.post.likeCount ?? 0;
    const bLikes = b.post.likeCount ?? 0;
    return bLikes - aLikes;
  } else if (threadPrefs.sort === "random") {
    return Math.random() - 0.5;
  }

  // this is applied in addition to the sort
  if (threadPrefs.prioritizeFollowedUsers) {
    const aIsFollowed = a.post.author.viewer?.following;
    const bIsFollowed = b.post.author.viewer?.following;
    if (aIsFollowed && !bIsFollowed) return -1;
    if (!aIsFollowed && bIsFollowed) return 1;
    return 0;
  }

  return 0;
};

export const getPostFilter = (
  post: AppBskyFeedDefs.FeedViewPost,
  filter: ContentFilterResult,
) => {
  const { isAdultContentHidden, adultContentFilters, contentFilters } = filter;
  const label = post.post.labels?.map((l) => l.val)[0] ?? ""; // ex. "nsfw", "suggestive"
  const embedRecordLabel = (post?.post?.embed?.record as ViewRecord)
    ?.record as ViewRecord;
  const embedLabel =
    post.post.embed && post.post.embed.record
      ? (post.post.embed.record as ViewRecord)?.labels?.map((l) => l.val)[0] ??
        embedRecordLabel?.labels?.map((l) => l.val)[0] ??
        ""
      : "";

  const message =
    adultContentFilters.find((f) => f.values.includes(label || embedLabel))
      ?.message ||
    contentFilters.find((f) => f.values.includes(label))?.message ||
    "Marked content";

  const visibility = adultContentFilters.find((f) =>
    f.values.includes(label || embedLabel),
  )?.visibility;

  const shouldHide = isAdultContentHidden
    ? true
    : visibility === "hide" || visibility === "warn"
      ? true
      : false;

  const showToggle =
    visibility !== "show" && visibility !== "ignore" && (label || embedLabel)
      ? true
      : false;

  return {
    showToggle,
    shouldHide,
    message,
  };
};

export const getThreadPostFilter = (
  post: AppBskyFeedDefs.PostView,
  filter: ContentFilterResult,
) => {
  const { isAdultContentHidden, adultContentFilters } = filter;

  const label = post.labels?.map((l) => l.val)[0] ?? ""; // ex. "nsfw", "suggestive"
  const embedLabel =
    post.embed && post.embed.record
      ? (post.embed.record as ViewRecord)?.labels?.map((l) => l.val)[0] ?? ""
      : "";

  const message =
    adultContentFilters.find((f) => f.values.includes(label || embedLabel))
      ?.message ?? "Marked content";

  const visibility = adultContentFilters.find((f) =>
    f.values.includes(label || embedLabel),
  )?.visibility;

  const shouldHide = isAdultContentHidden
    ? true
    : visibility === "hide" || visibility === "warn"
      ? true
      : false;

  const showToggle =
    visibility !== "show" && visibility !== "ignore" && (label || embedLabel)
      ? true
      : false;

  return {
    showToggle,
    shouldHide,
    message,
  };
};
