import { Preferences } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { AppBskyActorDefs } from "@atproto/api";

export default function useFeedFilter(preferences: Preferences | undefined) {
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
    feedFilter: filters,
  };
}
