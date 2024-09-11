import { memo } from "react";
import { MediaPlayer, MediaProvider, Poster } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface Props {
  aspectRatio: string;
  playlist: string;
  thumbnail?: string;
  alt?: string;
}

const VideoEmbed = memo(function VideoEmbed(props: Props) {
  const { aspectRatio, playlist, thumbnail, alt } = props;

  return (
    <MediaPlayer
      crossOrigin
      playsInline
      viewType="video"
      className="mt-2 hover:brightness-90 hover:cursor-pointer"
      src={playlist}
      poster={thumbnail ?? ""}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaProvider>
        {alt && (
          <Poster
            src={thumbnail}
            alt={alt}
            className="absolute inset-0 block bg-black opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:w-full [&>img]:object-contain"
          />
        )}
      </MediaProvider>
      <DefaultVideoLayout thumbnails={thumbnail} icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
});

export default VideoEmbed;
