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
    <div className="aspect-video mt-2 rounded-md hover:brightness-90 hover:cursor-pointer overflow-hidden">
      <MediaPlayer
        crossOrigin
        playsInline
        viewType="video"
        className="w-full h-full object-cover"
        src={playlist}
        poster={thumbnail ?? ""}
        onClick={(e) => e.stopPropagation()}
      >
        <MediaProvider>
          {alt && (
            <Poster
              src={thumbnail}
              alt={alt}
              className="absolute inset-0 block bg-skin-overlay opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:w-full [&>img]:object-contain"
            />
          )}
        </MediaProvider>
        <DefaultVideoLayout thumbnails={thumbnail} icons={defaultLayoutIcons} />
      </MediaPlayer>
    </div>
  );
});

export default VideoEmbed;
