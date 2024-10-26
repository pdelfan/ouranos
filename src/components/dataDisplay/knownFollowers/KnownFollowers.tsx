import useKnownFollowers from "@/lib/hooks/bsky/social/useKnownFollowers";
import Avatar from "../avatar/Avatar";
import Link from "next/link";
import { MAX_KNOWN_FOLLOWERS } from "@/lib/consts/general";
import KnownFollowersSkeleton from "./KnownFollowersSkeleton";

interface Props {
  handle: string;
}

export default function KnownFollowers(props: Props) {
  const { handle } = props;
  const {
    knownFollowers,
    isKnownFollowersEmpty,
    knownFollowersError,
    isLoadingKnownFollowers,
    isFetchingKnownFollowers,
  } = useKnownFollowers({ handle });

  const dataLength = knownFollowers?.pages.reduce(
    (acc, page) => acc + (page?.followers.length ?? 0),
    0,
  );

  const profiles = knownFollowers && knownFollowers.pages[0].followers;

  const names =
    profiles &&
    profiles.map((profile) => profile.displayName ?? profile.handle);

  if (isLoadingKnownFollowers || isFetchingKnownFollowers) {
    return <KnownFollowersSkeleton />;
  }

  if (isKnownFollowersEmpty || dataLength == 0 || !names) return null;

  if (knownFollowersError)
    return (
      <span className="text-skin-secondary">
        Could not show known followers
      </span>
    );

  return (
    <Link
      className="flex items-center gap-2 hover:opacity-80"
      href={`/dashboard/user/${handle}/known-followers`}
    >
      <div className="flex shrink-0 -space-x-4">
        {profiles &&
          profiles.slice(0, MAX_KNOWN_FOLLOWERS).map((follower, i) => (
            <div key={follower.did} style={{ zIndex: MAX_KNOWN_FOLLOWERS - i }}>
              <Avatar
                size="sm"
                src={follower.avatar?.replace("avatar", "avatar_thumbnail")}
                className="border-2 border-transparent bg-skin-base"
              />
            </div>
          ))}
      </div>
      <span className="text-skin-secondary text-sm font-medium line-clamp-2">
        Followed by{" "}
        {names.length <= MAX_KNOWN_FOLLOWERS &&
          new Intl.ListFormat("en-US").format(names)}
        {names.length > MAX_KNOWN_FOLLOWERS &&
          `${names.slice(0, MAX_KNOWN_FOLLOWERS - 1).join(", ")}, and ${names.length - MAX_KNOWN_FOLLOWERS + 1} others`}
      </span>
    </Link>
  );
}
