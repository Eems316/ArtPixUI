import { Image } from "../Image/Image.js";
import "../_shared/advanced.css";
export type VideoThumbnailProps = { src?: string; label: string; onPlay: () => void; disabled?: boolean; durationLabel?: string };
export function VideoThumbnail({ src, label, onPlay, disabled, durationLabel }: VideoThumbnailProps) {
 return <button className="art-pix-video-thumbnail" type="button" aria-label={`Play ${label}${durationLabel ? `, ${durationLabel}` : ""}`} disabled={disabled} onClick={onPlay}><Image src={src} alt="" aspectRatio="16 / 9" /><span className="art-pix-video-thumbnail__play" aria-hidden="true"><span>▶ Play{durationLabel ? ` · ${durationLabel}` : ""}</span></span></button>;
}
