"use client";

import { ListView } from "@atproto/api/dist/client/types/app/bsky/graph/defs";
import Image from "next/image";
import Link from "next/link";
import FallbackList from "@/assets/images/fallbackList.png";
import { memo } from "react";

interface Props {
  list: ListView;
  rounded?: boolean;
}

const ListItem = memo(function ListItem(props: Props) {
  const { list, rounded = true } = props;
  const { avatar, name, description, creator, uri, viewer, indexedAt } = list;

  return (
    <Link
      href={{
        pathname: `/dashboard/user/${creator.handle}/lists/${encodeURIComponent(
          uri.split(":")[3].split("/")[2],
        )}`,
        query: { uri: uri },
      }}
      className={`flex flex-col gap-2 border border-x-0 p-3 last:border-b hover:bg-neutral-50 md:border-x ${
        rounded ? "first:border-t md:first:rounded-t-2xl" : "first:border-t-0"
      } md:last:rounded-b-2xl odd:[&:not(:last-child)]:border-b-0 even:[&:not(:last-child)]:border-b-0`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Image
            src={avatar ?? FallbackList}
            alt={name}
            width={40}
            height={40}
            className={`rounded-lg ${!avatar && "border"}`}
          />
          <div className="flex flex-col">
            <h2 className="break-words font-semibold text-neutral-700">
              {list.name}
            </h2>
            <h3 className="break-all text-sm text-neutral-500">
              By @{creator.handle}
            </h3>
          </div>
        </div>
      </div>
      {description && (
        <p className="break-words text-neutral-700">{description}</p>
      )}
    </Link>
  );
});

export default ListItem;
