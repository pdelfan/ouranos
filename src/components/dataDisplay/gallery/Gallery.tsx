"use client";

import Image from "next/image";
import { AppBskyEmbedImages } from "@atproto/api";
import { KeyboardEvent, useState, useEffect } from "react";
import Button from "@/components/actions/button/Button";

interface Props {
  images: AppBskyEmbedImages.ViewImage[];
  startingIndex: number;
  onClose: () => void;
}

export default function Gallery(props: Props) {
  const { images, startingIndex, onClose } = props;
  const imageCount = images.length - 1;
  const [currentIndex, setCurrentIndex] = useState(startingIndex);

  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleForward = () => {
    if (currentIndex < imageCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleKeyboard = (e: Event) => {
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
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleBackward, handleForward, onClose]);

  return (
    <section
      className="z-50 bg-black/80 fixed inset-0 w-screen h-screen"
      tabIndex={0}
      onClick={onClose}
    >
      <Button
        className="z-50 fixed right-3 top-3 p-3.5 bg-black/50 text-white rounded-full hover:bg-white/10"
        icon="ph:x-bold"
        onClick={onClose}
      />
      {currentIndex > 0 && (
        <Button
          className="z-50  fixed left-3 top-1/2 p-3.5 bg-black/50 text-white rounded-full hover:bg-white/10"
          icon="bx:left-arrow-alt"
          onClick={(e) => {
            e.stopPropagation();
            handleBackward();
          }}
        />
      )}
      {currentIndex < imageCount && (
        <Button
          className="z-50 fixed right-3 top-1/2 p-3.5 bg-black/50 text-white rounded-full hover:bg-white/10"
          icon="bx:right-arrow-alt"
          onClick={(e) => {
            e.stopPropagation();
            handleForward();
          }}
        />
      )}

      <Image
        src={images[currentIndex].fullsize}
        alt={images[currentIndex].alt}
        width={images[currentIndex].aspectRatio?.width ?? 900}
        height={images[currentIndex].aspectRatio?.height ?? 900}
        className="object-contain z-40 fixed inset-0 h-full w-fit mx-auto"
      />
    </section>
  );
}
