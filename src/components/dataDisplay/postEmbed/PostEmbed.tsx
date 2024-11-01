import ImageEmbed from "./ImageEmbed";
import ExternalEmbed from "./ExternalEmbed";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  AppBskyEmbedRecord,
  AppBskyEmbedRecordWithMedia,
  AppBskyGraphDefs,
  AppBskyFeedDefs,
  AppBskyEmbedVideo,
} from "@atproto/api";
import RecordEmbed from "./RecordEmbed";
import ListEmbed from "./ListEmbed";
import FeedEmbed from "./FeedEmbed";
import VideoEmbed from "./VideoEmbed";
import StarterPackEmbed from "./StarterPackEmbed";

interface Props {
  content: AppBskyFeedDefs.FeedViewPost["post"]["embed"];
  depth: number;
}

export default function PostEmbed(props: Props) {
  const { content, depth = 0 } = props;

  const getEmbed = (content: AppBskyFeedDefs.FeedViewPost["post"]["embed"]) => {
    if (AppBskyEmbedImages.isView(content)) {
      return <ImageEmbed content={content} depth={depth} />;
    } else if (AppBskyGraphDefs.isStarterPackViewBasic(content?.record)) {
      return <StarterPackEmbed embed={content.record} depth={depth} />;
    } else if (AppBskyEmbedExternal.isView(content)) {
      return <ExternalEmbed embed={content} depth={depth} />;
    } else if (
      AppBskyFeedDefs.isGeneratorView(content?.record) &&
      content?.record
    ) {
      return <FeedEmbed feed={content?.record} depth={depth} />;
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
      return <ListEmbed list={content?.record} type={type} depth={depth} />;
    } else if (AppBskyEmbedRecord.isView(content)) {
      return <RecordEmbed record={content.record} depth={depth} />;
    } else if (AppBskyEmbedRecordWithMedia.isView(content)) {
      return (
        <RecordEmbed
          record={content.record.record}
          media={content.media}
          depth={depth}
        />
      );
    } else if (AppBskyEmbedVideo.isView(content)) {
      return (
        <VideoEmbed
          aspectRatio={`${content.aspectRatio?.width}/${content.aspectRatio?.height}`}
          playlist={content.playlist}
          thumbnail={content.thumbnail}
          alt={content.alt}
        />
      );
    }
  };

  const chosenEmbed = getEmbed(content);

  return <>{chosenEmbed && <>{chosenEmbed}</>}</>;
}
