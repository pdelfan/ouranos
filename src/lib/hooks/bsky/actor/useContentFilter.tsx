import { Preferences } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { CONTENT_FILTER_OPTIONS } from "@/lib/consts/modertaion";
import { AppBskyActorDefs } from "@atproto/api";
import { ContentFilter, ContentFilterResult } from "../../../../../types/feed";

export default function useContentFilter(
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
      const isAdultContentEnabled = isAdultContentPref && pref.enabled;

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
      if (isAdultContentPref && !isAdultContentEnabled) {
        isAdultContentHidden = true;
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
