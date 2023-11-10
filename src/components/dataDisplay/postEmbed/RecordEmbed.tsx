import { AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia } from "@atproto/api";
import { PostView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";

interface Props {
  record?: AppBskyEmbedRecord.View["record"];
  media?: AppBskyEmbedRecordWithMedia.View["media"];
}

export default function RecordEmbed(props: Props) {
  const { record, media } = props;

  return <p>{}</p>;
}
