import AltTag from "@/components/feedback/altTag/AltTag";
import type { AppBskyEmbedImages } from "@atproto/api";
import Image from "next/image";

interface Props {
  content: any;
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
          <div className="flex flex-nowrap aspect-video gap-1">
            {images.map((image, i) => (
              <div key={i} className="relative">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={250}
                  height={250}
                  className="rounded-md h-full max-h-72 object-cover"
                />
                {image.alt && <AltTag />}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div>
            <div className="flex aspect-video gap-1">
              <div className="flex grow basis-0 flex-col gap-1">
                <div className="relative min-h-0 grow basis-0">
                  <Image
                    key={0}
                    src={images[0].thumb}
                    alt={images[0].alt}
                    width={images[0].aspectRatio?.width ?? 450}
                    height={images[0].aspectRatio?.height ?? 450}
                    className="rounded-md object-cover w-full h-full"
                  />
                  {images[0].alt && <AltTag />}
                </div>
                <div className="relative min-h-0 grow basis-0">
                  <Image
                    key={0}
                    src={images[1].thumb}
                    alt={images[1].alt}
                    width={images[1].aspectRatio?.width ?? 450}
                    height={images[1].aspectRatio?.height ?? 450}
                    className="rounded-md object-cover w-full h-full"
                  />
                  {images[1].alt && <AltTag />}
                </div>
              </div>
              <div className="flex grow basis-0 flex-col gap-1">
                <div className="relative min-h-0 grow basis-0">
                  <Image
                    key={0}
                    src={images[2].thumb}
                    alt={images[2].alt}
                    width={images[2].aspectRatio?.width ?? 450}
                    height={images[2].aspectRatio?.height ?? 450}
                    className="rounded-md object-cover w-full h-full"
                  />
                  {images[2].alt && <AltTag />}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-1 aspect-square">
            {images.map((image, i) => (
              <div key={i} className="relative">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={images[i].aspectRatio?.width ?? 450}
                  height={images[i].aspectRatio?.height ?? 450}
                  className="object-cover rounded-md h-full max-h-64"
                />
                {images[i].alt && <AltTag />}
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
              width={images[0].aspectRatio?.width ?? 900}
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
