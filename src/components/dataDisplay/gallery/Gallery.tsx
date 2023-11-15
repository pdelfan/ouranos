import Image from "next/image";
import { AppBskyEmbedImages } from "@atproto/api";
import { KeyboardEvent, useState, useEffect, useCallback } from "react";
import Button from "@/components/actions/button/Button";

interface Props {
  images: AppBskyEmbedImages.ViewImage[] | string;
  startingIndex?: number;
  onClose: () => void;
}

export default function Gallery(props: Props) {
  const { images, startingIndex = 0, onClose } = props;
  const imageCount = Array.isArray(images) ? images.length : 0;
  const [currentIndex, setCurrentIndex] = useState(startingIndex);

  const handleBackward = useCallback(() => {
    if (imageCount > 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex, imageCount]);

  const handleForward = useCallback(() => {
    if (imageCount > 1 && currentIndex < imageCount - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, imageCount]);

  const handleKeyboard = useCallback(
    (e: Event) => {
      const { key } = e as unknown as KeyboardEvent;
      switch (key) {
        case "ArrowRight":
          handleForward();
          break;
        case "ArrowLeft":
          handleBackward();
          break;
        case "Escape":
          onClose();
          break;
        default:
          break;
      }
    },
    [handleBackward, handleForward, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard, handleBackward, handleForward, onClose]);

  return (
    <section
      className="z-50 bg-black/80 fixed inset-0 w-screen h-screen"
      onClick={onClose}
    >
      <Button
        className="z-50 fixed right-3 top-3 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
        icon="ph:x-bold"
        onClick={onClose}
      />
      {imageCount > 1 && currentIndex > 0 && (
        <Button
          className="z-50  fixed left-3 top-1/2 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
          icon="bx:left-arrow-alt"
          onClick={(e) => {
            e.stopPropagation();
            handleBackward();
          }}
        />
      )}
      {imageCount > 1 && currentIndex < imageCount - 1 && (
        <Button
          className="z-50 fixed right-3 top-1/2 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
          icon="bx:right-arrow-alt"
          onClick={(e) => {
            e.stopPropagation();
            handleForward();
          }}
        />
      )}

      {Array.isArray(images) && (
        <Image
          src={images[currentIndex].fullsize}
          alt={images[currentIndex].alt}
          width={images[currentIndex].aspectRatio?.width ?? 900}
          height={images[currentIndex].aspectRatio?.height ?? 900}
          className="object-contain z-40 fixed inset-0 h-full w-fit mx-auto"
        />
      )}

      {typeof images === "string" && (
        <Image
          src={images}
          alt={"Image"}
          width={900}
          height={900}
          className="object-contain z-40 fixed inset-0 h-full w-fit mx-auto"
        />
      )}
    </section>
  );
}
