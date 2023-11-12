import { AppBskyGraphDefs } from "@atproto/api";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  list: AppBskyGraphDefs.ListView;
  type: string;
}

export default function ListEmbed(props: Props) {
  const { list, type } = props;
  console.log(list);
  return (
    <div className="p-3 border rounded-xl bg-white hover:brightness-95">
      <div className="flex items-start gap-2">
        <div className="bg-primary p-2.5 rounded-lg">
          <Icon icon="bi:people-fill" className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-semibold break-all line-clamp-1 overflow-ellipsis hover:text-neutral-600">
            {list.name}
          </span>
          <span className="text-neutral-400 font-medium break-all">
            {type} by {list.creator.displayName ?? list.creator.handle}
          </span>
          <p>{list.description}</p>
        </div>
      </div>
    </div>
  );
}
