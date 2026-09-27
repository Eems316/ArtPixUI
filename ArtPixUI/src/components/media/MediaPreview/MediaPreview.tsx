import { Image } from "../Image/Image.js";
import { AudioPlayer, type AudioPlayerProps } from "../AudioPlayer/AudioPlayer.js";
import { VideoPlayer, type VideoPlayerProps } from "../VideoPlayer/VideoPlayer.js";
import type { ImageProps } from "../Image/Image.js";
export type MediaPreviewProps = ({ type: "image" } & ImageProps) | ({ type: "audio" } & AudioPlayerProps) | ({ type: "video" } & VideoPlayerProps);
export function MediaPreview(props: MediaPreviewProps) {
 if (props.type === "audio") { const { type: _, ...media } = props; return <AudioPlayer {...media} />; }
 if (props.type === "video") { const { type: _, ...media } = props; return <VideoPlayer {...media} />; }
 const { type: _, ...image } = props; return <Image {...image} />;
}
