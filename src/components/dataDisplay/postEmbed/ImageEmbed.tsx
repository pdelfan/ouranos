import type { AppBskyEmbedImages } from "@atproto/api";
import Image from "next/image";

interface Props {
  content: AppBskyEmbedImages.View;
}

export default function ImageEmbed(props: Props) {
  const { content } = props;
  const imageCount = content.images.length;

  return (
    <article className="flex flex-wrap gap-1">
      {content.images.map((image, i) => (
        <Image
          key={i}
          src={image.thumb}
          alt={image.alt}
          width={image.aspectRatio?.width ?? 700}
          height={image.aspectRatio?.height ?? 200}
          className={`${
            imageCount > 1 && "w-[49%]"
          } rounded-md object-cover`}
        />
      ))}
    </article>
  );
}
