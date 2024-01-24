import { abbreviateNumber } from "@/lib/utils/number";
import Link from "next/link";

interface Props {
  handle: string;
  followsCount: number;
  followersCount: number;
}

export default function FollowInfo(props: Props) {
  const { handle, followsCount, followersCount } = props;

  return (
    <div className="flex flex-gap items-center gap-3">
      <Link
        href={`/dashboard/user/${handle}/following`}
        className="flex gap-1 font-semibold text-neutral-700 hover:brightness-110"
      >
        {abbreviateNumber(followsCount)}
        <span className="font-medium text-neutral-400">Following</span>
      </Link>

      <Link
        href={`/dashboard/user/${handle}/followers`}
        className="flex gap-1 font-semibold text-neutral-700 hover:brightness-110"
      >
        {abbreviateNumber(followersCount)}
        <span className="font-medium text-neutral-400">Followers</span>
      </Link>
    </div>
  );
}
