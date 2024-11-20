import React, { useRef, useState } from "react";
import Button from "@/components/actions/button/Button";
import { FaPlay } from "react-icons/fa6";
import type { GifEmbed } from "@/lib/utils/embed";
import AltTag from "@/components/feedback/altTag/AltTag";

interface Props {
  embed: GifEmbed;
}

export default function GifEmbed(props: Props) {
  const { embed } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const togglePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };

  const handleOnPlaying = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  return (
    <div
      onClick={togglePlayPause}
      className="w-fit relative cursor-pointer rounded-md group"
    >
      <video
        ref={videoRef}
        src={embed.url}
        width={embed.dimensions.width}
        height={embed.dimensions.height}
        loop
        muted
        playsInline
        preload="auto"
        autoPlay
        onCanPlayThrough={handleCanPlayThrough}
        onPlaying={handleOnPlaying}
        className={`rounded-md group-hover:brightness-90 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      />
      {embed.alt && <AltTag text={embed.alt} />}
      {isLoading && (
        <div
          className="rounded-md bg-skin-muted animate-pulse"
          style={{
            width: embed.dimensions.width,
            height: embed.dimensions.height,
          }}
        />
      )}
      {!isPlaying && !isLoading && (
        <Button className="absolute inset-0 m-auto bg-skin-base text-skin-base border border-skin-base w-fit h-fit p-3 rounded-full ">
          <FaPlay />
        </Button>
      )}
    </div>
  );
}
