import { AppBskyGraphDefs, AtUri } from "@atproto/api";

export const getStarterPackImage = (
  starterPack: AppBskyGraphDefs.StarterPackView
) => {
  const rkey = new AtUri(starterPack.uri).rkey;
  return `https://ogcard.cdn.bsky.app/start/${starterPack.creator.did}/${rkey}`;
};

export const getStarterPackLink = (
  starterPack: AppBskyGraphDefs.StarterPackViewBasic
) => {
  const rkey = new AtUri(starterPack.uri).rkey;
  const handleOrDid = starterPack.creator.handle || starterPack.creator.did;

  // TODO: Add starter pack page
  return `https://bsky.app/starter-pack/${handleOrDid}/${rkey}`;
};
