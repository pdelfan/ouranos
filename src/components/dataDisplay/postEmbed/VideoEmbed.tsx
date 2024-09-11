import { memo } from "react";
import { AppBskyEmbedVideo } from "@atproto/api";
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
      className="mt-2 rounded-md hover:brightness-90 hover:cursor-pointer"
      viewType="video"
      src={playlist}
      poster={thumbnail ?? ""}
      aspectRatio={aspectRatio}
      onClick={(e) => e.stopPropagation()}
    >
      <MediaProvider>
        {alt && (
          <Poster
            src={thumbnail}
            alt={alt}
            className="absolute inset-0 block h-full w-full bg-black rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 [&>img]:h-full [&>img]:w-full [&>img]:object-cover"
          />
        )}
      </MediaProvider>
      <DefaultVideoLayout thumbnails={thumbnail} icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
});

export default VideoEmbed;
