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
          className={`border-skin-base bg-skin-base relative rounded-xl border p-3 ${replyStyle}`}
        >
          <div className="flex gap-2">
            <PiWarningCircleFill className="text-skin-icon-base text-2xl" />
            <span className="text-skin-base">This post is unavailable</span>
          </div>
          {isReply && <Threadline />}
        </div>
      )}
    </>
  );
}
