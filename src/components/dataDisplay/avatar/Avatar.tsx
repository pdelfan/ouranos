import Image from "next/image";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { getAvatarSize } from "@/lib/utils/image";

interface Props {
  size?: AvatarSize;
  src?: string;
  className?: string;
}
export default function Avatar(props: Props) {
  const { size, src, className } = props;
  const [width, height] = getAvatarSize(size);

  return (
    <Image
      src={src ?? FallbackAvatar}
      alt="Avatar"
      width={width}
      height={height}
      priority
      className={`rounded-full ${className}`}
    />
  );
}
