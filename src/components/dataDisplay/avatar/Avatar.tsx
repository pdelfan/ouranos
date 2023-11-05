"use client";

import Image from "next/image";
import { useState } from "react";
import FallbackAvatar from "@/assets/images/fallbackAvatar.png";
import { getAvatarSize } from "@/lib/utils/image";

interface Props {
  size?: AvatarSize;
  avatar: string;
}
export default function Avatar(props: Props) {
  const { size, avatar } = props;
  const [image, setImage] = useState(avatar);
  const [width, height] = getAvatarSize(size);

  return (
    <>
      <Image
        src={image}
        alt="Avatar"
        width={width}
        height={height}
        onError={() => setImage(FallbackAvatar.src)}
        className="rounded-full"
      />
    </>
  );
}
