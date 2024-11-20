import { AppBskyEmbedExternal } from "@atproto/api";

const parseTenorGif = (
  url: URL
):
  | { success: false }
  | {
      success: true;
      uri: string;
      dimensions: { width: number; height: number };
    } => {
  let [_, id, filename] = url.pathname.split("/");

  if (!id || !filename) {
    return { success: false };
  }

  if (!id.includes("AAAAC")) {
    return { success: false };
  }

  const h = url.searchParams.get("hh");
  const w = url.searchParams.get("ww");

  if (!h || !w) {
    return { success: false };
  }

  const dimensions = {
    width: Number(w),
    height: Number(h),
  };

  id = id.replace("AAAAC", "AAAP3");
  filename = filename.replace(".gif", ".webm");

  return {
    success: true,
    uri: `https://t.gifs.bsky.app/${id}/${filename}`,
    dimensions,
  };
};

export const enum ExternalEmbedType {
  LINK,
  GIF,
  // TODO: add iframe
}

interface LinkEmbed {
  type: ExternalEmbedType.LINK;
  domain: string;
  title?: string;
  description?: string;
  thumb?: string;
}

export interface GifEmbed {
  type: ExternalEmbedType.GIF;
  url: string;
  dimensions: { width: number; height: number };
  alt: string;
}

export type ExternalEmbedContent = LinkEmbed | GifEmbed;

export const detectExternalEmbedType = (
  embed: AppBskyEmbedExternal.ViewExternal
): ExternalEmbedContent => {
  let url;

  try {
    url = new URL(embed.uri);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return {
        type: ExternalEmbedType.LINK,
        domain: embed.uri,
        title: embed.title,
        description: embed.description,
        thumb: embed.thumb,
      };
    }
  } catch {
    return {
      type: ExternalEmbedType.LINK,
      domain: embed.uri,
      title: embed.title,
      description: embed.description,
      thumb: embed.thumb,
    };
  }

  const host = url.host;
  const pathname = url.pathname;
  const params = url.searchParams;
  const domain = host.startsWith("www.") ? host.slice(4) : host;

  // tenor gif
  if (domain === "media.tenor.com") {
    const tenorGif = parseTenorGif(url);

    if (!tenorGif.success) {
      return {
        type: ExternalEmbedType.LINK,
        domain: embed.uri,
        title: embed.title,
        description: embed.description,
        thumb: embed.thumb,
      };
    }

    return {
      type: ExternalEmbedType.GIF,
      url: tenorGif.uri,
      dimensions: tenorGif.dimensions,
      alt: embed.description.replace(/^Alt: /, ""),
    };
  }

  return {
    type: ExternalEmbedType.LINK,
    domain: embed.uri,
    title: embed.title,
    description: embed.description,
    thumb: embed.thumb,
  };
};
