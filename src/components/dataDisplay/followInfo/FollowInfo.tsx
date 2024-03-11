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
    <div className="flex-gap flex items-center gap-3">
      <Link
        href={`/dashboard/user/${handle}/following`}
        className="text-skin-base flex gap-1 font-semibold hover:brightness-110"
      >
        {abbreviateNumber(followsCount)}
        <span className="text-skin-tertiary font-medium">Following</span>
      </Link>

      <Link
        href={`/dashboard/user/${handle}/followers`}
        className="text-skin-base flex gap-1 font-semibold hover:brightness-110"
      >
        {abbreviateNumber(followersCount)}
        <span className="text-skin-tertiary font-medium">Followers</span>
      </Link>
    </div>
  );
}
