import { AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia } from "@atproto/api";
import PostText from "../postText/postText";
import Avatar from "../avatar/Avatar";
import { getRelativeTime } from "@/lib/utils/time";
import PostEmbed from "./PostEmbed";

interface Props {
  record: AppBskyEmbedRecord.View["record"];
  media?: AppBskyEmbedRecordWithMedia.View["media"];
  depth: number;
}

export default function RecordEmbed(props: Props) {
  const { record, media, depth } = props;
  const isBlocked = AppBskyEmbedRecord.isViewBlocked(record);
  const notFound = AppBskyEmbedRecord.isViewNotFound(record);
  const isViewable = AppBskyEmbedRecord.isViewRecord(record);
  const isViewableWithMedia = AppBskyEmbedRecordWithMedia.isView(media);

  return (
    <>
      {isViewable && depth < 1 && (
        <div className="flex justify-between items-center gap-2 p-3 border rounded-xl bg-white">
          <div className="flex items-start gap-2">
            <Avatar profile={record.author} size="xs" />
            <div className="flex flex-col">
              <div className="flex">
                <span className="flex gap-1">
                  <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis hover:text-neutral-600">
                    {record.author.displayName ?? record.author.handle}{" "}
                  </span>
                  <span className="text-neutral-400 font-medium line-clamp-1 break-all shrink min-w-[10%]">
                    @{record.author.handle}
                  </span>
                </span>
                <span className="text-neutral-400 font-medium whitespace-nowrap">
                  &nbsp;· {getRelativeTime(record.indexedAt)}
                </span>
              </div>
              <div>
                <PostText record={record.value} truncate={true} />
              </div>
              {record.embeds && record.embeds.length > 0 && (
                <PostEmbed content={record.embeds[0]} depth={depth + 1} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
