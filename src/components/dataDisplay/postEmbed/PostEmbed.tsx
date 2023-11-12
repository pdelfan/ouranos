import ImageEmbed from "./ImageEmbed";
import ExternalEmbed from "./ExternalEmbed";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyGraphDefs,
  AppBskyFeedDefs,
} from "@atproto/api";
import RecordEmbed from "./RecordEmbed";
import ListEmbed from "./ListEmbed";
import FeedEmbed from "./FeedEmbed";

interface Props {
  content: AppBskyFeedDefs.FeedViewPost["post"]["embed"];
}

export default function PostEmbed(props: Props) {
  const { content } = props;

  // function newgetEmbed(embed: any): JSX.Element | null {
  //   switch (embed.$type) {
  //     //   if (post) return <MediaWithThread {...(post as PostView)} />;

  const getEmbed = (content: AppBskyFeedDefs.FeedViewPost["post"]["embed"]) => {
    if (AppBskyEmbedImages.isView(content)) {
      return <ImageEmbed content={content} />;
    } else if (AppBskyEmbedExternal.isView(content)) {
      return <ExternalEmbed embed={content} />;
    } else if (
      AppBskyFeedDefs.isGeneratorView(content?.record) &&
      content?.record
    ) {
      return <FeedEmbed feed={content?.record} />;
    } else if (
      AppBskyGraphDefs.isListView(content?.record) &&
      content?.record
    ) {
      let type = "List";
      switch (content.record.purpose) {
        case AppBskyGraphDefs.MODLIST:
          type = "Moderation List";
          break;
        case AppBskyGraphDefs.CURATELIST:
          type = "Curation List";
          break;
      }
      return <ListEmbed list={content?.record} type={type} />;
    } else if (AppBskyEmbedRecord.isView(content)) {
      let record: AppBskyEmbedRecord.View["record"] | null = null;
      let media: AppBskyEmbedRecordWithMedia.View["media"] | null = null;
      if (AppBskyEmbedRecord.isView(content)) {
        record = content.record;
      }

      if (AppBskyEmbedRecordWithMedia.isView(content)) {
        record = content.record;
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
