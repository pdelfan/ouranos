import { AppBskyEmbedRecord, AppBskyEmbedRecordWithMedia } from "@atproto/api";
import PostText from "../postText/postText";
import Avatar from "../avatar/Avatar";
import { getRelativeTime } from "@/lib/utils/time";
import PostEmbed from "./PostEmbed";
import NotFoundEmbed from "./NotFoundEmbed";
import BlockedEmbed from "./BlockedEmbed";
import { getPostId } from "@/lib/utils/link";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <article className="flex flex-col rounded-xl">
      {isBlocked && (
        <div className="mt-2">
          <BlockedEmbed depth={depth} />
        </div>
      )}
      {notFound && (
        <div className="mt-2">
          <NotFoundEmbed depth={depth} />
        </div>
      )}
      {media && <PostEmbed content={media} depth={depth + 1} />}
      {isViewable && depth < 1 && (
        <div
          onClick={(e) => {
            router.push(
              `/dashboard/user/${record.author.handle}/post/${getPostId(
                record.uri
              )}`
            );
            e.stopPropagation();
          }}
          className="p-3 mt-2 border rounded-xl hover:bg-neutral-50 hover:cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="flex">
              <span className="flex items-center gap-1">
                <Avatar src={record.author.avatar} size="xs" />
                <span className="font-semibold break-all max-w-[90%] shrink-0 line-clamp-1 overflow-ellipsis text-neutral-700">
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
            <div className="mt-1">
              <PostText record={record.value} truncate={true} />
            </div>
            {record.embeds && record.embeds.length > 0 && (
              <PostEmbed content={record.embeds[0]} depth={depth + 1} />
            )}
          </div>
        </div>
      )}
    </article>
  );
}
