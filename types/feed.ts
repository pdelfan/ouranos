import {} from "@atproto/api";
import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

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

export type ContentFilter = {
  type: string;
  label: string;
  visiblity: string;
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
