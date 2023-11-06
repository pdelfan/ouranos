import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

export type SavedFeed = GeneratorView & {
  pinned: boolean;
};
