import {} from "@atproto/api";
import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { Notification } from "@atproto/api/dist/client/types/app/bsky/notification/listNotifications";

export type SavedFeed = GeneratorView & {
  pinned: boolean;
};

export type FeedSearchResult = {
  tid: string;
  cid: string;
  user: {
    did: string;
    handle: string;
  };
  post: {
    createdAt: number;
    text: string;
    user: string; // handle
  };
};

export type FeedAlert =
  | "empty"
  | "doesNotExist"
  | "misconfigured"
  | "badResponse"
  | "offline"
  | "blocked";

export type ContentFilterLabel = "hate" | "spam" | "impersonation";

export type ContentFilter = {
  type: string;
  label: string;
  visibility: string;
  values: string[];
  adult: boolean;
  message: string;
};

export type ContentFilterResult = {
  isAdultContentHidden: boolean;
  contentFilters: ContentFilter[];
  adultContentFilters: ContentFilter[];
};

export type FeedFilterResult = {
  feed: string;
  hideReplies: boolean;
  hideRepliesByLikeCount: number;
  hideRepliesByUnfollowed: boolean;
  hideReposts: boolean;
  hideQuotePosts: boolean;
};

export type ThreadViewResult = {
  sort: string;
  prioritizeFollowedUsers: boolean;
  lab_treeViewEnabled: boolean;
};

export type GroupedNotification = Notification & {
  allAuthors?: ProfileView[];
};

export type PreferencesResult = {
  contentFilter: ContentFilterResult;
  feedFilter: FeedFilterResult;
  threadPreferences: ThreadViewResult;
};
