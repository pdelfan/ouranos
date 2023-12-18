import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  depth: number;
  isReply?: boolean;
}

export default function NotFoundEmbed(props: Props) {
  const { depth = 0, isReply = false } = props;
  const replyStyle = isReply && "mb-6";

  return (
    <>
      {depth < 1 && (
        <div
          className={`relative p-3 border rounded-xl bg-white ${replyStyle}`}
        >
          <div className="flex gap-2">
            <Icon icon="ep:warning-filled" className="text-2xl" />
            <span>Deleted post</span>
          </div>
          {isReply && (
            <div className="absolute left-6 top-12  h-full border-l-2" />
          )}
        </div>
      )}
    </>
  );
}
