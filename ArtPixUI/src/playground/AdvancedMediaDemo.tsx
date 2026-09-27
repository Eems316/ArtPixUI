import { useState, type ReactNode } from "react";
import { MediaControls, ZoomableImage, ImageGrid, Carousel, ImageSlider, ImageViewer, Lightbox, ImageGallery, BeforeAfterImage, VideoThumbnail, AudioPlayer, VideoPlayer, MediaPreview, QrCodeDisplay, Button, TextInput, type GalleryImage } from "../index.js";

function landscape(sky: string, hills: string) { return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360"><path fill="${sky}" d="M0 0h640v360H0z"/><path fill="#f3ad38" d="M480 48h64v64h-64z"/><path fill="${hills}" d="M0 260h80v-60h80v-60h80v60h80v60h80v-60h80v-60h80v60h80v60h80v100H0z"/><path fill="#2c3025" d="M0 320h160v-40h160v40h160v-40h160v80H0z"/></svg>`)}`; }
const images: GalleryImage[] = [{ id: "morning", src: landscape("#f3e8c5", "#247b3b"), alt: "Green pixel hills under an amber sun", caption: "Morning in Mossglen" }, { id: "evening", src: landscape("#d9c4a0", "#426448"), alt: "Dark green pixel hills at dusk", caption: "A quieter evening" }, { id: "winter", src: landscape("#e4eff0", "#809f98"), alt: "Pale pixel hills in winter light", caption: "Winter on the ridge" }];
// Tiny generated PCM WAV: a quiet half-second tone, no external media request.
function demoTone() {
 const samples = 4000; const bytes = new Uint8Array(44 + samples * 2); const view = new DataView(bytes.buffer);
 const text = (offset: number, value: string) => [...value].forEach((char, i) => { bytes[offset + i] = char.charCodeAt(0); });
 text(0, "RIFF"); view.setUint32(4, bytes.length - 8, true); text(8, "WAVEfmt "); view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true); view.setUint32(24, 8000, true); view.setUint32(28, 16000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true); text(36, "data"); view.setUint32(40, samples * 2, true);
 for (let i = 0; i < samples; i++) view.setInt16(44 + i * 2, Math.round(Math.sin(i * 2 * Math.PI * 330 / 8000) * 1800 * Math.sin(Math.PI * i / samples)), true);
 return `data:audio/wav;base64,${btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join(""))}`;
}
const tone = demoTone();
function Exhibit({ id, name, number, children }: { id: string; name: string; number: number; children: ReactNode }) {
 return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}><div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div><div style={{ display: "grid", gap: 24, padding: 28, minWidth: 0 }}>{children}</div></section>;
}
export function AdvancedMediaDemo() {
 const [playing, setPlaying] = useState(false); const [time, setTime] = useState(24); const [volume, setVolume] = useState(.5); const [muted, setMuted] = useState(false);
 const [lightbox, setLightbox] = useState(false); const [selected, setSelected] = useState(0); const [result, setResult] = useState("No thumbnail selected.");
 const [videoUrl, setVideoUrl] = useState(""); const [draftUrl, setDraftUrl] = useState(""); const [qr, setQr] = useState("https://example.com");
 return <>
 <Exhibit id="media-controls" name="Playback in your hands" number={123}><MediaControls playing={playing} currentTime={time} duration={120} volume={volume} muted={muted} onPlayPause={() => setPlaying(value => !value)} onSeek={setTime} onVolumeChange={setVolume} onMuteToggle={() => setMuted(value => !value)} /><p>Control-only demo: values change, but no media plays here.</p></Exhibit>
 <Exhibit id="zoomable-image" name="Look a little closer" number={124}><ZoomableImage src={images[0].src} alt={images[0].alt} /></Exhibit>
 <Exhibit id="image-grid" name="A collection of views" number={125}><ImageGrid images={images} onSelect={index => setResult(images[index].caption!)} /><span role="status">{result}</span></Exhibit>
 <Exhibit id="carousel" name="One story at a time" number={126}><Carousel label="Adventure notes" slides={[{ id: "first", label: "Pack", content: <p>Pack your supplies.</p> }, { id: "second", label: "Explore", content: <p>Choose a trail and explore.</p> }, { id: "third", label: "Remember", content: <p>Keep a note of your discoveries.</p> }]} /></Exhibit>
 <Exhibit id="image-slider" name="Scenes along the way" number={127}><ImageSlider images={images} label="Mossglen seasons" loop /></Exhibit>
 <Exhibit id="image-viewer" name="A focused view" number={128}><ImageViewer images={images} /></Exhibit>
 <Exhibit id="lightbox" name="A moment to look" number={129}><Button onClick={() => setLightbox(true)}>Open image lightbox</Button><Lightbox open={lightbox} onOpenChange={setLightbox} images={images} index={selected} onIndexChange={setSelected} /></Exhibit>
 <Exhibit id="image-gallery" name="Explore the whole collection" number={130}><ImageGallery images={images} /></Exhibit>
 <Exhibit id="before-after-image" name="See what changed" number={131}><BeforeAfterImage before={images[0]} after={images[1]} beforeLabel="Morning" afterLabel="Evening" /></Exhibit>
 <Exhibit id="video-thumbnail" name="An invitation to play" number={132}><VideoThumbnail src={images[0].src} label="Mossglen trail film" durationLabel="1:20" onPlay={() => setResult("Video play requested. This thumbnail does not own playback.")} /><span>{result}</span></Exhibit>
 <Exhibit id="audio-player" name="A small sound" number={133}><AudioPlayer src={tone} label="Quiet demo tone" transcript="A quiet, half-second 330 Hz tone. No speech." /><AudioPlayer src="" label="Missing-source example" /></Exhibit>
 <Exhibit id="video-player" name="Motion on the trail" number={134}><label htmlFor="media-demo-video-url">Optional video URL for playback review</label><TextInput id="media-demo-video-url" value={draftUrl} onChange={event => setDraftUrl(event.target.value)} placeholder="https://…/video.mp4" /><Button variant="secondary" onClick={() => setVideoUrl(draftUrl)}>Use video URL</Button><VideoPlayer src={videoUrl} label="Video playback review" poster={images[0].src} transcript="Supply a video and appropriate captions/transcript in your application." /><p>No video is bundled or fetched automatically. A supplied source is requested by the browser when you press Play.</p></Exhibit>
 <Exhibit id="media-preview" name="The right kind of preview" number={135}><MediaPreview type="image" src={images[2].src} alt={images[2].alt} /><MediaPreview type="audio" src={tone} label="Audio preview" /></Exhibit>
 <Exhibit id="qr-code-display" name="A small square, a useful link" number={136}><label htmlFor="media-demo-qr">QR content (up to 105 UTF-8 bytes)</label><TextInput id="media-demo-qr" value={qr} onChange={event => setQr(event.target.value)} /><QrCodeDisplay value={qr} label="Scan or read this content" /><p>Black-on-white output preserves contrast and the four-module quiet zone.</p></Exhibit>
 </>;
}
