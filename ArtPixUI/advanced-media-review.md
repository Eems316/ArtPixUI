# Advanced media and viewers — awaiting review

Section 9 was committed as `463fd6c` (`feat: Specialized Cards components`). No push was requested or performed. All 14 section 10 components are implemented and marked `[-]`; none are marked reviewed/approved. Section 10 is committed locally; no push was requested.

## Plan and appearance

Implement controls/zoom first, then grid/carousel/image compositions, then Lightbox/gallery/comparison/thumbnail, then native playback/preview and QR encoding. Reuse existing Image, Button, Slider and Dialog. Keep media, chart and date phases separate.

Parchment surfaces, green controls, amber comparison details, monospaced text and rounded dark outlines match the existing Spritecraft/Plinth direction. Media navigation is manual: no autoplay, timed slides, wheel interception, global shortcuts or decorative motion. Lightbox inherits Dialog's reduced-motion-aware entry. Zoom/pan and comparison update immediately. QR output intentionally stays black on white with a quiet border for scanning.

## Previews

Refresh the running playground. To restart it, run `npm run dev -- --host 127.0.0.1 --port 5173 --strictPort` from `ArtPixUI/`.

| Component | Preview |
| --- | --- |
| MediaControls | [Preview](http://127.0.0.1:5173/#media-controls-demo) |
| ZoomableImage | [Preview](http://127.0.0.1:5173/#zoomable-image-demo) |
| ImageGrid | [Preview](http://127.0.0.1:5173/#image-grid-demo) |
| Carousel | [Preview](http://127.0.0.1:5173/#carousel-demo) |
| ImageSlider | [Preview](http://127.0.0.1:5173/#image-slider-demo) |
| ImageViewer | [Preview](http://127.0.0.1:5173/#image-viewer-demo) |
| Lightbox | [Preview](http://127.0.0.1:5173/#lightbox-demo) |
| ImageGallery | [Preview](http://127.0.0.1:5173/#image-gallery-demo) |
| BeforeAfterImage | [Preview](http://127.0.0.1:5173/#before-after-image-demo) |
| VideoThumbnail | [Preview](http://127.0.0.1:5173/#video-thumbnail-demo) |
| AudioPlayer | [Preview](http://127.0.0.1:5173/#audio-player-demo) |
| VideoPlayer | [Preview](http://127.0.0.1:5173/#video-player-demo) |
| MediaPreview | [Preview](http://127.0.0.1:5173/#media-preview-demo) |
| QrCodeDisplay | [Preview](http://127.0.0.1:5173/#qr-code-display-demo) |

## Public APIs and scope

Import from `art-pix-ui` and include `art-pix-ui/styles.css` once.

- **GalleryImage** is `{ id, src, alt, caption?, thumbnail? }`. Use unique IDs. Supply meaningful alt text or an empty string for intentionally decorative images.
- **MediaControls:** required controlled `playing/currentTime/duration/volume/muted` and `onPlayPause/onSeek/onVolumeChange/onMuteToggle`; optional `disabled/buffering/label/onFullscreen`. Volume is 0–1. Unknown/nonfinite duration disables seeking and shows an unknown endpoint. Time text is not a constantly announcing live region. These controls do not create a media engine themselves.
- **ZoomableImage:** `src/alt`; optional `maxZoom` (default 4, bounded 1–8), `height` (default 320, bounded 120–1200), `label`. Buttons change scale in 0.5 steps. At zoom >1, pointer drag and focused viewport arrow keys pan within bounds; Reset restores 1×. Resizing reclamps pan. Source/zoom-limit/height prop changes reset the view. No pinch-to-zoom, wheel zoom or inertia in this version; zoom buttons provide the touch/keyboard alternative.
- **ImageGrid:** `images`; optional `label/onSelect/minItemWidth/emptyText`. Static semantic list without onSelect; labeled native image buttons when supplied. Thumbnail source falls back to full source. Adaptive columns wrap without a fixed viewport-dependent column count.
- **Carousel:** `slides` (`id/label/content`) and `label`; optional `index/defaultIndex/onIndexChange/loop`. Omit index for internal state; when controlled, update index in onIndexChange. Indices are clamped, single/empty collections are handled, loop defaults false. Only the active slide is mounted; consumers should hoist state that must survive navigation. Navigation uses native buttons rather than trapping arrow keys from arbitrary slide controls.
- **ImageSlider:** Carousel props except slides, plus `images`. Builds semantic figures/captions and contained image previews.
- **ImageViewer:** Carousel-style selection/loop props plus `images/label?/maxZoom?`. Each selected image gets ZoomableImage and its caption. Image navigation resets zoom/pan.
- **Lightbox:** ImageViewer props plus required `open/onOpenChange`, optional `title`. Uses modal Dialog semantics, background inertness, close/Escape behavior and focus return. Viewer unmounts when closed. Keep onOpenChange controlled. Large collections are not virtualized.
- **ImageGallery:** ImageGrid props except onSelect, plus optional `viewerTitle`. Owns the selected image and Lightbox visibility; selecting a grid tile opens the corresponding full image.
- **BeforeAfterImage:** `before/after` objects with src/alt; optional `label/value/defaultValue/onChange/beforeLabel/afterLabel`. Value is percentage 0–100, default 50. The before image is clipped over the after image in a 16:9 viewport; use matching source dimensions for accurate comparison. Native range control supplies keyboard/touch access. Physical reveal runs left to right even in an RTL page. No draggable divider is implied.
- **VideoThumbnail:** `label/onPlay`; optional `src/disabled/durationLabel`. Native button with image/placeholder and play indicator. It requests playback via callback without creating a video element.
- **AudioPlayer:** `src/label`; optional `preload/nativeControls/loop/transcript/onPlaybackError`. Uses native audio with custom MediaControls by default. preload defaults none. No automatic playback is requested. State follows native metadata/play/pause/time/volume/waiting events; play rejection and media/seek errors are reported. Source replacement remounts the engine; cleanup pauses old playback. Empty source disables custom controls and renders a useful message.
- **VideoPlayer:** AudioPlayer props plus `poster/tracks`. Uses native inline video with poster and optional caption/subtitle tracks; custom controls can request fullscreen. Each MediaTrack has `src/kind/label/srcLang?/default?`. Browser codecs, CORS, volume restrictions and fullscreen policy still apply. Native-controls mode delegates playback/caption-selection UI to the browser and omits custom controls. Default tracks can render with custom controls, but there is no custom captions/language selector. Supply captions/transcripts in the consuming app; none are invented.
- **MediaPreview:** discriminated union: `type: image` plus Image props, `type: audio` plus AudioPlayer props, or `type: video` plus VideoPlayer props. It does not infer type from extensions or fetch metadata itself.
- **QrCodeDisplay:** `value`; optional `label/size/showValue`. Encodes locally into an SVG, exposes the original text through an accessible description, and shows readable content by default. The original text is never made an automatic clickable link. size defaults 232 (bounded 116–1200 CSS pixels, responsive max-width); retain sufficient rendered size for scanning.

## QR dependency resolution and validation

No encoding dependency was installed or bundled. The private encoder implements a deliberately bounded subset: QR Model 2 versions 1–5, error correction L, UTF-8 ECI 26 plus byte segment, fixed mask 0, Reed–Solomon parity and standard function/format patterns. Fixed mask is valid but not optimized for minimum visual penalty. Payload limit is **105 UTF-8 bytes**, not 105 arbitrary characters. Oversized input produces explanatory text and no QR image; payloads are never truncated.

Algorithm/independent validation reference: [Project Nayuki QR generator](https://www.nayuki.io/page/qr-code-generator-library), whose reference implementation supports explicit segments, versions, correction levels and masks. The production encoder is local code; no external QR service receives the content.

`scripts/verify-qr-reference.mjs` is an optional online verification, excluded from the normal offline test suite. It fetches the public MIT reference into memory, checks its pinned source SHA-256 before evaluation, and compares every output module. The verified reference source hash is `1dc03fb5a10e0e2318ea162755bbdb9977ca6ce52cff959e9c9b6deafdccda9c`. If upstream changes, the script stops for source review. No reference package is added to dependencies.

All 13 comparison cases matched exactly: empty text, ArtPixUI, URL, Unicode and each size boundary through 105 bytes. Their matrix hashes are recorded as offline regression fixtures. This is encoder agreement, not a claim that physical camera/print scanning was performed. Review real scanning at intended sizes and lighting; keep the four-module quiet zone unobstructed.

## Playground and tests

Exhibits 123–136 use local code-drawn SVG landscapes. Audio uses a generated quiet half-second PCM tone. The VideoPlayer demo starts with no source and lets the reviewer explicitly provide a URL; no external video is fetched automatically. The player defaults to preload none. No content is sent to an upload/server by this demo.

`scripts/check-advanced-media.mjs` covers all 14 exports, rendered accessible names/roles, image selection callbacks, empty/single/out-of-range slide cases, comparison clamping, playback control values, transcript/tracks/native-controls rendering, media type dispatch, QR quiet-zone sizing/oversize errors and 13 reference matrix fixtures. Actual Player event handlers are additionally exercised with mocked native elements for play/pause, seek, mute/volume, state sync, buffering, rejected play promises and cleanup pause.

Those mocks do not test browser codecs or actual sound/video output. Typecheck/library build, production playground build, lint and all existing offline regression scripts are rerun. No dependencies were added.

## Remaining manual review

Live browser control remains unavailable under the earlier browser-tool security restriction; it has not been bypassed. No new screenshots or browser-playback claims are made. Future screenshots belong in workspace-root `samples/`, and should only be embedded for remote users without file access unless requested.

Review keyboard/pointer/touch panning, resize bounds, source failures, native seek/volume behavior, autoplay-policy rejection, media buffering/ended/source replacement, captions/transcripts, fullscreen/exit, Dialog focus return, gallery selection, comparison extremes, forced colors, narrow viewports/zoom, screen-reader names/announcements and physical QR scanning. Modern Dialog/ResizeObserver requirements remain; unsupported fullscreen reports a message.

Section 11 remains untouched. Its first task is Timestamp.
