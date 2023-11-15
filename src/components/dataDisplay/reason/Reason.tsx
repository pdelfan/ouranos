import { AppBskyFeedDefs } from "@atproto/api";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  reason:
    | AppBskyFeedDefs.ReasonRepost
    | {
        [k: string]: unknown;
        $type: string;
      }
    | undefined;
}

export default function Reason(props: Props) {
  const { reason } = props;
  const isRepost = AppBskyFeedDefs.isReasonRepost(reason);

  return (
    <>
      {isRepost && (
        <div className="flex flex-wrap items-center gap-1 text-lg text-neutral-700 font-semibold">
          <Icon icon="bx:repost" />
          <small>{reason.by.displayName ?? reason.by.handle} reposted</small>
        </div>
      )}
    </>
  );
}
