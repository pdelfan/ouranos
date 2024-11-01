import {
  AppBskyGraphDefs,
  AppBskyRichtextFacet,
  AtUri,
  RichText,
  UnicodeString,
} from "@atproto/api";
import { JSONContent } from "@tiptap/react";
import { jsonToText } from "./text";

export function getPostId(uri: string): string {
  if (!uri) return "";

  const s = uri.split("/");
  const [, , , , id] = s; // skip the first four slashes

  return id;
}

export function detectLinksInEditor(json: JSONContent) {
  const richText = new RichText({ text: jsonToText(json).trimEnd() });
  richText.detectFacetsWithoutResolution();
  const set: Set<string> = new Set();
  if (richText.facets) {
    for (const face of richText.facets) {
      for (const feature of face.features) {
        if (AppBskyRichtextFacet.isLink(feature)) {
          set.add(feature.uri);
        }
      }
    }
  }

  return set;
}

function getByteLength(string: string) {
  const Unicode = new UnicodeString(string);
  return Unicode.length;
}

// https://docs.bsky.app/docs/advanced-guides/post-richtext#rich-text-facets
function getFacetFromMark(mark: any, text: string, length: number) {
  if (mark.type !== "link") {
    return undefined;
  }

  const link = mark.attrs.href;
  const byteStart = length;
  const byteEnd = length + getByteLength(text);

  return {
    index: { byteStart, byteEnd },
    features: [
      {
        $type: "app.bsky.richtext.facet#link",
        uri: link,
      },
    ],
  };
}

export function getLinkFacets(json: JSONContent) {
  const content = json.content;
  let length = 0;
  let facets: any[] = [];

  if (!content) return facets;

  content.forEach((p, index) => {
    if (index > 0) {
      length = length + getByteLength("\n");
    }

    if (p.content) {
      p.content.forEach((item) => {
        if (item.marks) {
          item.marks.forEach((mark) => {
            if (!item.text || mark.type !== "link") return;
            facets = [...facets, getFacetFromMark(mark, item.text, length)];
          });
        }

        if (item.type === "hardBreak") {
          length = length + getByteLength("\n");
        }

        if (item.text) {
          length = length + getByteLength(item.text);
        }

        if (item.type === "mention") {
          length = length + getByteLength("@" + item.attrs?.id);
        }
      });
    }
  });

  return facets;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getStarterPackImage(
  starterPack: AppBskyGraphDefs.StarterPackView
) {
  const rkey = new AtUri(starterPack.uri).rkey;
  return `https://ogcard.cdn.bsky.app/start/${starterPack.creator.did}/${rkey}`;
}

export function getStarterPackHref(
  starterPack: AppBskyGraphDefs.StarterPackViewBasic
) {
  const rkey = new AtUri(starterPack.uri).rkey;
  const handleOrDid = starterPack.creator.handle || starterPack.creator.did;
  // TODO: Add starter pack screen to Ouranos
  return `https://bsky.app/starter-pack/${handleOrDid}/${rkey}`;   
}
