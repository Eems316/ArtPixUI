import { useEffect, useRef, useState, type ReactNode, type SyntheticEvent } from "react";
import { MediaControls } from "../MediaControls/MediaControls.js";
import "./advanced.css";
export type MediaTrack = { src: string; kind: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata"; label: string; srcLang?: string; default?: boolean };
export type PlayerProps = { src: string; label: string; preload?: "none" | "metadata" | "auto"; nativeControls?: boolean; loop?: boolean; transcript?: ReactNode; onPlaybackError?: (message: string) => void };
export type VideoProps = PlayerProps & { poster?: string; tracks?: MediaTrack[] };
export function Player({ kind, src, label, preload = "none", nativeControls = false, loop = false, transcript, poster, tracks = [], onPlaybackError }: VideoProps & { kind: "audio" | "video" }) {
 const element = useRef<HTMLMediaElement | null>(null); const root = useRef<HTMLDivElement>(null);
 const [state, setState] = useState({ playing: false, time: 0, duration: 0, volume: 1, muted: false });
 const [buffering, setBuffering] = useState(false); const [error, setError] = useState("");
 useEffect(() => { const media = element.current; return () => { media?.pause(); }; }, []);
 const sync = (event: SyntheticEvent<HTMLMediaElement>) => { const media = event.currentTarget; setState({ playing: !media.paused && !media.ended, time: media.currentTime, duration: media.duration, volume: media.volume, muted: media.muted }); };
 const fail = (message: string) => { setError(message); setBuffering(false); onPlaybackError?.(message); };
 const playPause = async () => { const media = element.current; if (!media) return; setError(""); if (!media.paused) { media.pause(); return; } try { await media.play(); } catch { if (element.current === media) fail("Playback could not start. Check the media source or try again."); } };
 const events = { onLoadedMetadata: sync, onDurationChange: sync, onTimeUpdate: sync, onVolumeChange: sync, onPlay: sync, onPause: (event: SyntheticEvent<HTMLMediaElement>) => { sync(event); setBuffering(false); }, onEnded: sync, onPlaying: (event: SyntheticEvent<HTMLMediaElement>) => { sync(event); setBuffering(false); }, onWaiting: () => setBuffering(true), onCanPlay: () => setBuffering(false), onSeeked: () => setBuffering(false), onError: () => fail("This media could not be loaded. Check the source and supported format.") };
 return <div ref={root} className="art-pix-media-surface art-pix-media-stack art-pix-media-player" role="group" aria-label={label}>
 <strong>{label}</strong>
 {kind === "video" ? <video ref={node => { element.current = node; }} src={src || undefined} aria-label={label} poster={poster} controls={nativeControls} playsInline preload={preload} loop={loop} {...events}>{tracks.map(track => <track key={`${track.kind}-${track.src}`} {...track} />)}Your browser does not support video playback.</video> : <audio ref={node => { element.current = node; }} src={src || undefined} aria-label={label} controls={nativeControls} preload={preload} loop={loop} {...events}>Your browser does not support audio playback.</audio>}
 {!nativeControls && <MediaControls {...state} currentTime={state.time} buffering={buffering} disabled={!src.trim()} onPlayPause={() => { void playPause(); }} onSeek={seconds => { if (element.current && Number.isFinite(element.current.duration)) { try { element.current.currentTime = seconds; } catch { fail("Seeking is unavailable for this media."); } } }} onVolumeChange={volume => { if (element.current) element.current.volume = volume; }} onMuteToggle={() => { if (element.current) element.current.muted = !element.current.muted; }} onFullscreen={kind === "video" ? () => { const node = root.current; if (!node?.requestFullscreen) { fail("Fullscreen is unavailable in this browser."); return; } void node.requestFullscreen().catch(() => fail("Fullscreen could not be opened.")); } : undefined} />}
 {nativeControls && buffering && <p role="status">Buffering…</p>}
 {!src.trim() && <p>No media source supplied.</p>}{error && <p role="alert">{error}</p>}{transcript != null && <details><summary>Transcript</summary><div>{transcript}</div></details>}
 </div>;
}
