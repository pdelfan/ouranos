import ImageEmbed from "./ImageEmbed";
import ExternalEmbed from "./ExternalEmbed";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  type AppBskyFeedDefs,
} from "@atproto/api";
import RecordEmbed from "./RecordEmbed";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

interface Props {
  content: AppBskyFeedDefs.FeedViewPost["post"]["embed"];
}

export default function PostEmbed(props: Props) {
  const { content } = props;

  // function newgetEmbed(embed: any): JSX.Element | null {
  //   if (!embed) return null;

  //   switch (embed.$type) {
  //     case "app.bsky.embed.external#view":
  //       return <ExternalEmbed embed={embed} />;
  //     case "app.bsky.embed.record#view":
  //       return <RecordEmbed embed={embed} />;
  //     case "app.bsky.embed.images#view":
  //       return <ImageEmbed content={embed} />;
  //     // case "app.bsky.embed.images#view":
  //     //   if (post) return <MediaWithThread {...(post as PostView)} />;

  //       // return <Images images={embed.images} />;
  //     // case "app.bsky.embed.recordWithMedia#view":
  //     //   return <RecordWithMedia {...post} />;
  //     // case "app.bsky.richtext.facet#link":
  //     //   if (embed.uri.includes("bsky.app"))
  //     //     return <AsyncEmbedPost uri={embed.uri} />;

  //       // return (
  //       //   <SocialEmbed
  //       //     uri={embed.uri}
  //       //     fallback={<OpenGraph url={embed.uri} />}
  //       //   />
  //       // );
  //     default:
  //       return null;
  //   }
  // }

  const getEmbed = (content: AppBskyFeedDefs.FeedViewPost["post"]["embed"]) => {
    if (AppBskyEmbedImages.isView(content)) {
      return <ImageEmbed content={content} />;
    } else if (AppBskyEmbedExternal.isView(content)) {
      return <ExternalEmbed embed={content} />;
    } else if (AppBskyEmbedRecord.isView(content)) {
      let record: AppBskyEmbedRecord.View["record"] | null = null;
      let media: AppBskyEmbedRecordWithMedia.View["media"] | null = null;

      if (AppBskyEmbedRecord.isView(content)) {
        record = content.record;
      }

      if (AppBskyEmbedRecordWithMedia.isView(content)) {
        record = content.record.record;
        media = content.media;
      }
      
      if (record && !media) {
        return <RecordEmbed record={record} />;
      } else if (record && media) {
        return <RecordEmbed record={record} media={media} />;
      }
    }
  };

  const chosenEmbed = getEmbed(content);

  return <>{chosenEmbed && <div className="mt-2">{chosenEmbed}</div>}</>;
}
