"use client";

import AltTag from "@/components/feedback/altTag/AltTag";
import type { AppBskyEmbedImages } from "@atproto/api";
import Image from "next/image";
import { useState } from "react";
import Gallery from "../gallery/Gallery";

interface Props {
  content: AppBskyEmbedImages.View;
  depth: number;
}

export default function ImageEmbed(props: Props) {
  const { content, depth } = props;
  const imageCount = content.images.length;
  const [showImage, setShowImage] = useState<number | undefined>(undefined);

  const generateImageLayout = (
    count: number,
    images: AppBskyEmbedImages.ViewImage[],
  ) => {
    // adjust image grid layout based on number of images
    switch (count) {
      case 2:
        return (
          <div className="flex flex-nowrap aspect-video gap-1 z-50">
            {images.map((image, i) => (
              <div key={i} className="relative">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={500}
                  height={250}
                  priority
                  className="rounded-md h-full max-h-62 object-cover cursor-pointer hover:brightness-90 border border-skin-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImage(i);
                  }}
                />
                {image.alt && <AltTag text={image.alt} />}
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
                    priority
                    className="rounded-md object-cover h-full cursor-pointer hover:brightness-90 border border-skin-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowImage(0);
                    }}
                  />
                  {images[2].alt && <AltTag text={images[2].alt} />}
                </div>
              </div>
              <div className="flex grow basis-0 flex-col gap-1">
                <div className="relative min-h-0 grow basis-0">
                  <Image
                    key={1}
                    src={images[1].thumb}
                    alt={images[1].alt}
                    width={images[1].aspectRatio?.width ?? 450}
                    height={images[1].aspectRatio?.height ?? 450}
                    priority
                    className="rounded-md object-cover w-full h-full cursor-pointer hover:brightness-90 border border-skin-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowImage(1);
                    }}
                  />
                  {images[1].alt && <AltTag text={images[1].alt} />}
                </div>
                <div className="relative min-h-0 grow basis-0">
                  <Image
                    key={2}
                    src={images[2].thumb}
                    alt={images[2].alt}
                    width={images[2].aspectRatio?.width ?? 450}
                    height={images[2].aspectRatio?.height ?? 450}
                    priority
                    className="rounded-md object-cover w-full h-full cursor-pointer hover:brightness-90 border border-skin-base"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowImage(2);
                    }}
                  />
                  {images[2].alt && <AltTag text={images[2].alt} />}
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-1 ">
            {images.map((image, i) => (
              <div key={i} className="relative">
                <Image
                  src={image.thumb}
                  alt={image.alt}
                  width={images[i].aspectRatio?.width ?? 450}
                  height={images[i].aspectRatio?.height ?? 450}
                  priority
                  className="object-cover aspect-square rounded-md h-full max-h-64 cursor-pointer hover:brightness-90 border border-skin-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImage(i);
                  }}
                />
                {images[i].alt && <AltTag text={images[i].alt} />}
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div className="relative">
            {images[0] && (
              <>
                <Image
                  src={images[0].thumb}
                  alt={images[0].alt}
                  width={images[0].aspectRatio?.width ?? 900}
                  height={images[0].aspectRatio?.height ?? 900}
                  priority
                  className="rounded-md max-h-96 w-full object-cover cursor-pointer hover:brightness-90 border border-skin-base"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowImage(0);
                  }}
                />
                {images[0].alt && <AltTag text={images[0].alt} />}
              </>
            )}
          </div>
        );
    }
  };

  return (
    <>
      {showImage !== undefined && (
        <Gallery
          images={content.images}
          startingIndex={showImage}
          onClose={() => setShowImage(undefined)}
        />
      )}
      {depth < 2 && (
        <article className="mt-2">
          {generateImageLayout(imageCount, content.images)}
        </article>
      )}
    </>
  );
}
