import Image from "next/image";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { getAvatarSize } from "@/lib/utils/image";

interface Props {
  size?: AvatarSize;
  avatar: string | undefined;
}
export default function Avatar(props: Props) {
  const { size, avatar } = props;  
  const [width, height] = getAvatarSize(size);

  if (!avatar) {
    return (
      <Image
        src={FallbackAvatar}
        alt="Avatar"
        width={width}
        height={height}
        className="rounded-full"
      />
    );
  }

  return (
    <Image
      src={avatar}
      alt="Avatar"
      width={width}
      height={height}      
      className="rounded-full"
    />
  );
}
