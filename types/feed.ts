import { AppBskyFeedDefs } from "@atproto/api";
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
  description: string;
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

export type Thread =
  | AppBskyFeedDefs.ThreadViewPost
  | AppBskyFeedDefs.NotFoundPost
  | AppBskyFeedDefs.BlockedPost
  | {
      [k: string]: unknown;
      $type: string;
    }
  | undefined;

export type ThreadgateSetting = "nobody" | "mention" | "following";
// | { type: "list"; list: string };
