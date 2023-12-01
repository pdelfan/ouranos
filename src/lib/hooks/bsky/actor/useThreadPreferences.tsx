import { Preferences } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { THREAD_VIEW_PREFS } from "@/lib/consts/settings";
import { AppBskyActorDefs } from "@atproto/api";
import { ThreadViewResult } from "../../../../../types/feed";

export default function useThreadPreferences(
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
