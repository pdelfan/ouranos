import { memo } from "react";
import { AppBskyEmbedVideo } from "@atproto/api";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
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
}

const VideoEmbed = memo(function VideoEmbed(props: Props) {
  const { aspectRatio, thumbnail, playlist } = props;

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
      onError={() => console.log("ERRORORORORORORORROO")}
    >
      <MediaProvider />
      <DefaultVideoLayout thumbnails={thumbnail} icons={defaultLayoutIcons} />
    </MediaPlayer>
  );
});

export default VideoEmbed;
