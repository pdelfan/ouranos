import { AppBskyRichtextFacet, RichText } from "@atproto/api";
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