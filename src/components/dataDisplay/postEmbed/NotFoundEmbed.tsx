import { PiWarningCircleFill } from "react-icons/pi";
import Threadline from "../threadLine/ThreadLine";

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
          className={`relative rounded-xl border bg-white p-3 ${replyStyle}`}
        >
          <div className="flex gap-2">
            <PiWarningCircleFill className="text-2xl" />
            <span>Deleted post</span>
          </div>
          {isReply && <Threadline />}
        </div>
      )}
    </>
  );
}
