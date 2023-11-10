import AltTag from "@/components/feedback/altTag/AltTag";
import type { AppBskyEmbedImages } from "@atproto/api";
import Image from "next/image";

interface Props {
  content: AppBskyEmbedImages.View;
}

export default function ImageEmbed(props: Props) {
  const { content } = props;
  const imageCount = content.images.length;

  const generateImageLayout = (
    count: number,
    images: AppBskyEmbedImages.ViewImage[]
  ) => {
    // adjust image grid layout based on number of images
    switch (count) {
      case 2:
        return (
          <div className="flex flex-nowrap object-cover gap-1">
            {images.map((image, i) => (
              <div key={i} className="relative">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={900}
                  height={900}
                  className="rounded-md h-full max-h-72 object-cover"
                />
                {image.alt && <AltTag />}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="flex gap-1">
            {/* height is 72 + 1gap height (18rem + 0.25rem) */}
            <div className="w-2/3 relative max-h-[calc(18rem+.25rem)]">
              <Image
                key={0}
                src={images[0].thumb}
                alt={images[0].alt}
                width={images[0].aspectRatio?.width ?? 450}
                height={images[0].aspectRatio?.height ?? 450}
                className="rounded-md object-cover h-full"
              />
              {images[0].alt && <AltTag />}
            </div>
            <div className="w-1/3 flex flex-col gap-1 h-72">
              <div className="flex-1 h-1/2 relative">
                <Image
                  key={1}
                  src={images[1].thumb}
                  alt={images[1].alt}
                  width={images[1].aspectRatio?.width ?? 450}
                  height={images[1].aspectRatio?.height ?? 450}
                  className="rounded-md object-cover h-[100%]"
                />
                {images[1].alt && <AltTag />}
              </div>
              <div className="flex-1 h-1/2 relative">
                <Image
                  key={2}
                  src={images[2].thumb}
                  alt={images[2].alt}
                  width={images[2].aspectRatio?.width ?? 450}
                  height={images[2].aspectRatio?.height ?? 450}
                  className=" rounded-md object-cover h-[100%]"
                />
                {images[2].alt && <AltTag />}
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-1">
            {images.map((image, i) => (
              <div key={i} className="relative">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={450}
                  height={450}
                  className="max-h-40 object-cover rounded-md h-full"
                />
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="relative">
            <Image
              src={images[0].thumb}
              alt={images[0].alt}
              width={900}
              height={images[0].aspectRatio?.height ?? 900}
              className="rounded-md object-cover"
            />
            {images[0].alt && <AltTag />}
          </div>
        );
    }
  };

  return <article>{generateImageLayout(imageCount, content.images)}</article>;
}
