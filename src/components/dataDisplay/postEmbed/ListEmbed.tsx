import { AppBskyGraphDefs } from "@atproto/api";
import { BsFillPeopleFill, BsPersonFillSlash } from "react-icons/bs";

interface Props {
  list: AppBskyGraphDefs.ListView;
  type: string;
  depth: number;
}

export default function ListEmbed(props: Props) {
  const { list, type, depth } = props;
  const selectedIcon =
    type === "Moderation List" ? (
      <BsPersonFillSlash className="text-white text-xl" />
    ) : (
      <BsFillPeopleFill className="text-white text-xl" />
    );

  return (
    <>
      {depth < 1 && (
        <div className="p-3 mt-2 border rounded-xl bg-white hover:brightness-95">
          <div className="flex items-start gap-2">
            <div className="bg-primary p-2.5 rounded-lg">{selectedIcon}</div>
            <div className="flex flex-col">
              <span className="font-semibold break-all line-clamp-1 overflow-ellipsis text-neutral-700 hover:text-neutral-600">
                {list.name}
              </span>
              <span className="text-neutral-400 font-medium break-all">
                {type} by {list.creator.displayName ?? list.creator.handle}
              </span>
              <p className="break-all">{list.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
