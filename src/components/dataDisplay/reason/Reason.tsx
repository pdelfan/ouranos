import { AppBskyFeedDefs } from "@atproto/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

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
        <Link
          href={`/dashboard/user/${reason.by.handle}`}
          className="max-w-fit"
        >
          <div className="inline-flex flex-wrap items-center gap-1 text-lg text-neutral-700 font-semibold hover:text-neutral-500">
            <Icon icon="bx:repost" />
            <small>{reason.by.displayName ?? reason.by.handle} reposted</small>
          </div>
        </Link>
      )}
    </>
  );
}
