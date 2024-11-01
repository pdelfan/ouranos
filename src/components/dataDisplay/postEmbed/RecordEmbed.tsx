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
      {media && <PostEmbed content={media} depth={depth + 1} />}
      {isViewable && depth < 1 && (
        <div
          onClick={(e) => {
            router.push(
              `/dashboard/user/${record.author.handle}/post/${getPostId(
                record.uri,
              )}`,
            );
            e.stopPropagation();
          }}
          className="border-skin-base bg-skin-base hover:bg-skin-secondary mt-2 rounded-xl border p-3 hover:cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="flex">
              <span className="flex items-center gap-1">
                <Avatar
                  src={record.author.avatar?.replace(
                    "avatar",
                    "avatar_thumbnail",
                  )}
                  size="xs"
                />
                <span className="text-skin-base line-clamp-1 max-w-[90%] shrink-0 overflow-ellipsis break-all font-semibold">
                  {record.author.displayName || record.author.handle}{" "}
                </span>
                <span className="text-skin-tertiary line-clamp-1 min-w-[10%] shrink break-all font-medium">
                  @{record.author.handle}
                </span>
              </span>
              <span className="text-skin-tertiary whitespace-nowrap font-medium">
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
    </article>
  );
}
