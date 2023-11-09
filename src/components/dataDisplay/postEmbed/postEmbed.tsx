import ImageEmbed from "./ImageEmbed";
import ExternalEmbed from "./ExternalEmbed";
import {
  AppBskyEmbedExternal,
  AppBskyEmbedImages,
  type AppBskyFeedDefs,
} from "@atproto/api";

interface Props {
  content: AppBskyFeedDefs.FeedViewPost["post"]["embed"];
}

export default function PostEmbed(props: Props) {
  const { content } = props;

  const getEmbed = (content: AppBskyFeedDefs.FeedViewPost["post"]["embed"]) => {
    if (AppBskyEmbedImages.isView(content)) {
      return <ImageEmbed content={content} />;
    } else if (AppBskyEmbedExternal.isView(content)) {
      return <ExternalEmbed embed={content} />;
    }
  };

  const chosenEmbed = getEmbed(content);

  return <div className="mt-2">{chosenEmbed}</div>;
}
