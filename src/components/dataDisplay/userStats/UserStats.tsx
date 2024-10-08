import { abbreviateNumber } from "@/lib/utils/number";
import Link from "next/link";

interface Props {
  handle: string;
  followCount: number;
  followerCount: number;
  postsCount: number;
}

export default function UserStats(props: Props) {
  const { handle, followCount, followerCount, postsCount } = props;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <Link
        href={`/dashboard/user/${handle}/following`}
        className="text-skin-base flex gap-1 font-semibold hover:brightness-110"
      >
        {abbreviateNumber(followCount)}
        <span className="text-skin-tertiary font-medium">Following</span>
      </Link>

      <Link
        href={`/dashboard/user/${handle}/followers`}
        className="text-skin-base flex gap-1 font-semibold hover:brightness-110"
      >
        {abbreviateNumber(followerCount)}
        <span className="text-skin-tertiary font-medium">Followers</span>
      </Link>
      <div className=" flex gap-1">
        <span className="text-skin-base font-semibold">
          {abbreviateNumber(postsCount)}
        </span>
        <span className="text-skin-tertiary font-medium">Posts</span>
      </div>
    </div>
  );
}
