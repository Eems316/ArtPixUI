import { Player, type PlayerProps } from "../_shared/Player.js";
export type AudioPlayerProps = PlayerProps;
export function AudioPlayer(props: AudioPlayerProps) { return <Player key={props.src} {...props} kind="audio" />; }
