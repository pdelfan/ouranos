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
    [handleBackward, handleForward]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyboard);

    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [handleKeyboard, handleBackward, handleForward, onClose]);

  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Overlay className="z-50 bg-black/80 fixed inset-0 w-screen h-screen animate-fade animate-duration-200" />
      <Dialog.Content
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="z-50"
      >
        <Button
          className="z-[70] fixed left-3 top-3 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <CgClose className="text-xl" />
        </Button>
        {imageCount > 1 && currentIndex > 0 && (
          <Button
            className="z-[70] fixed left-3 top-1/2 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
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
            className="z-[70] fixed right-3 top-1/2 p-3.5 bg-black/50 text-white rounded-full hover:bg-neutral-500/90"
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
            className="object-contain z-[60] fixed inset-0 h-full w-fit mx-auto"
          />
        )}

        {typeof images === "string" && (
          <Image
            src={images}
            alt={"Image"}
            width={900}
            height={900}
            className="object-contain z-[60] fixed inset-0 h-full w-fit mx-auto"
          />
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
