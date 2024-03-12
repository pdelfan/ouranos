import { HiMiniShieldExclamation } from "react-icons/hi2";
import Threadline from "../threadLine/ThreadLine";

interface Props {
  depth: number;
  isReply?: boolean;
}

export default function BlockedEmbed(props: Props) {
  const { depth = 0, isReply = false } = props;
  const replyStyle = isReply && "mb-6";

  return (
    <>
      {depth < 1 && (
        <div
          className={`border-skin-base bg-skin-base relative rounded-xl border p-3 ${replyStyle}`}
        >
          <div className="flex gap-2">
            <HiMiniShieldExclamation className="text-skin-icon-base text-2xl" />
            <span>
              Post is from a blocked user or someone who has blocked you.
            </span>
          </div>
          {isReply && <Threadline />}
        </div>
      )}
    </>
  );
}
