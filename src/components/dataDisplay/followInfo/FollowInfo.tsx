import { abbreviateNumber } from "@/lib/utils/number";

interface Props {
  followsCount: number;
  followersCount: number;
}

export default function FollowInfo(props: Props) {
  const { followsCount, followersCount } = props;

  return (
    <div className="flex flex-gap items-center mt-3 gap-3">
      <div className="flex gap-1">
        <span className="font-semibold text-neutral-600">
          {abbreviateNumber(followsCount)}
        </span>
        <span className="font-medium text-neutral-400">Following</span>
      </div>
      <div className="flex gap-1">
        <span className="font-semibold">
          {abbreviateNumber(followersCount)}
        </span>
        <span className="font-medium text-neutral-400">Followers</span>
      </div>
    </div>
  );
}
