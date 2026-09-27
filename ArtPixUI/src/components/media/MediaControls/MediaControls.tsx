import { Button } from "../../buttons-actions/Button/Button.js";
import { Slider } from "../../forms-inputs/Slider/Slider.js";
import { clamp, formatTime } from "../_shared/media.js";
import "../_shared/advanced.css";
export type MediaControlsProps = { playing: boolean; currentTime: number; duration: number; volume: number; muted: boolean; onPlayPause: () => void; onSeek: (seconds: number) => void; onVolumeChange: (volume: number) => void; onMuteToggle: () => void; disabled?: boolean; buffering?: boolean; label?: string; onFullscreen?: () => void };
export function MediaControls({ playing, currentTime, duration, volume, muted, onPlayPause, onSeek, onVolumeChange, onMuteToggle, disabled, buffering, label = "Playback controls", onFullscreen }: MediaControlsProps) {
 const length = Number.isFinite(duration) && duration > 0 ? duration : 0;
 const position = clamp(currentTime, 0, length);
 return <div role="group" aria-label={label} className="art-pix-media-controls"><div className="art-pix-media-row"><Button disabled={disabled} onClick={onPlayPause}>{playing ? "Pause" : "Play"}</Button><Button variant="secondary" disabled={disabled} aria-label="Mute audio" aria-pressed={muted} onClick={onMuteToggle}>{muted ? "Unmute" : "Mute"}</Button>{onFullscreen && <Button variant="secondary" disabled={disabled} onClick={onFullscreen}>Fullscreen</Button>}<span>{formatTime(position)} / {length ? formatTime(length) : "—"}</span></div><label>Seek<Slider min={0} max={length || 1} step={0.1} value={position} aria-valuetext={formatTime(position)} disabled={disabled || !length} onChange={event => onSeek(clamp(event.target.valueAsNumber, 0, length))} /></label><label>Volume<Slider min={0} max={1} step={0.05} value={clamp(volume, 0, 1)} aria-valuetext={`${Math.round(clamp(volume, 0, 1) * 100)} percent`} disabled={disabled} onChange={event => onVolumeChange(clamp(event.target.valueAsNumber, 0, 1))} /></label>{buffering && <span role="status">Buffering…</span>}</div>;
}
