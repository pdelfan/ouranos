import Image from "next/image";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { getAvatarSize } from "@/lib/utils/image";
import { ProfileViewDetailed } from "@atproto/api/dist/client/types/app/bsky/actor/defs";

interface Props {
  size?: AvatarSize;
  profile: ProfileViewDetailed | null | undefined;
}
export default function Avatar(props: Props) {
  const { size, profile } = props;
  const [width, height] = getAvatarSize(size);

  return (
    <Image
      src={profile?.avatar ?? FallbackAvatar}
      alt="Avatar"
      width={width}
      height={height}
      className="rounded-full"
    />
  );
}
