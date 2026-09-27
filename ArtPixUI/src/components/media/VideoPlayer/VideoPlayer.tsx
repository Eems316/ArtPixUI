import { Player, type VideoProps } from "../_shared/Player.js";
export type VideoPlayerProps = VideoProps;
export function VideoPlayer(props: VideoPlayerProps) { return <Player key={props.src} {...props} kind="video" />; }
