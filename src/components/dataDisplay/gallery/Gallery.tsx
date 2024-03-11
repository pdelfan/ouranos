import Image from "next/image";
import { AppBskyEmbedImages } from "@atproto/api";
import * as Dialog from "@radix-ui/react-dialog";
import { KeyboardEvent, useState, useEffect, useCallback } from "react";
import Button from "@/components/actions/button/Button";
import { CgClose } from "react-icons/cg";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

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
        default:
          break;
      }
    },
    [handleBackward, handleForward],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard, handleBackward, handleForward, onClose]);

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Overlay className="animate-fade animate-duration-200 bg-skin-overlay-muted fixed inset-0 z-50 h-screen w-screen" />
      <Dialog.Content
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="z-50"
      >
        <Button
          className="text-skin-inverted bg-skin-overlay hover:bg-skin-inverted fixed left-3 top-3 z-[70] rounded-full p-3.5"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <CgClose className="text-xl" />
        </Button>
        {imageCount > 1 && currentIndex > 0 && (
          <Button
            className="text-skin-inverted bg-skin-overlay hover:bg-skin-inverted fixed left-3 top-1/2 z-[70] rounded-full p-3.5"
            onClick={(e) => {
              e.stopPropagation();
              handleBackward();
            }}
          >
            <BiLeftArrowAlt />
          </Button>
        )}
        {imageCount > 1 && currentIndex < imageCount - 1 && (
          <Button
            className="text-skin-inverted bg-skin-overlay hover:bg-skin-inverted fixed right-3 top-1/2 z-[70] rounded-full p-3.5"
            onClick={(e) => {
              e.stopPropagation();
              handleForward();
            }}
          >
            <BiRightArrowAlt />
          </Button>
        )}

        {Array.isArray(images) && (
          <Image
            src={images[currentIndex].fullsize}
            alt={images[currentIndex].alt}
            width={images[currentIndex].aspectRatio?.width ?? 900}
            height={images[currentIndex].aspectRatio?.height ?? 900}
            className="fixed inset-0 z-[60] mx-auto h-full w-fit object-contain"
          />
        )}

        {typeof images === "string" && (
          <Image
            src={images}
            alt={"Image"}
            width={900}
            height={900}
            className="fixed inset-0 z-[60] mx-auto h-full w-fit object-contain"
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
