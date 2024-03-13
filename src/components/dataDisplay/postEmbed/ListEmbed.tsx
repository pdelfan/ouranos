import { AppBskyGraphDefs } from "@atproto/api";
import { BsFillPeopleFill, BsPersonFillSlash } from "react-icons/bs";
import Link from "next/link";

interface Props {
  list: AppBskyGraphDefs.ListView;
  type: string;
  depth: number;
}

export default function ListEmbed(props: Props) {
  const { list, type, depth } = props;
  const formattedUri = list.uri.split(":")[3].split("/")[2];

  const selectedIcon =
    type === "Moderation List" ? (
      <BsPersonFillSlash className="text-skin-icon-inverted text-xl" />
    ) : (
      <BsFillPeopleFill className="text-skin-icon-inverted text-xl" />
    );

  return (
    <>
      {depth < 1 && (
        <Link
          href={{
            pathname: `/dashboard/user/${
              list.creator.handle
            }/lists/${encodeURIComponent(formattedUri)}`,
            query: { uri: list.uri },
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="border-skin-base bg-skin-base mt-2 block cursor-pointer rounded-xl border p-3 hover:brightness-95"
        >
          <div className="flex items-start gap-2">
            <div className="bg-primary rounded-lg p-2.5">{selectedIcon}</div>
            <div className="flex flex-col">
              <span className="text-skin-base hover:text-skin-secondary line-clamp-1 overflow-ellipsis break-all font-semibold">
                {list.name}
              </span>
              <span className="text-skin-tertiary break-all font-medium">
                {type} by {list.creator.displayName || list.creator.handle}
              </span>
              {list.description && (
                <p className="text-skin-base break-all">{list.description}</p>
              )}
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
