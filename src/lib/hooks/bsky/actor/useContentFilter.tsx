import { Preferences } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import usePreferences from "./usePreferences";
import { contentFilterOptions } from "@/lib/consts/modertaion";
import { AppBskyActorDefs } from "@atproto/api";
import { ContentFilter } from "../../../../../types/feed";

export default function useContentFilter() {
  const { preferences } = usePreferences();

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

      if (isContentPref) {
        const label = pref.label;
        const filter = contentFilterOptions.find(
          (f) => !f.adult && f.type === label
        );
        if (filter) {
          filter.visiblity = pref.visibility ?? filter?.visiblity;
          contentFilters.push(filter);
        }
      }

      if (isAdultContentPref && !isAdultContentEnabled) {
        isAdultContentHidden = true;
      }

      if (!isAdultContentPref && isAdultContentEnabled && isContentPref) {
        const label = pref.label;
        const filter = contentFilterOptions.find(
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
    preferences: filters,
  };
}
