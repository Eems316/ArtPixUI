import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import vm from "node:vm";
import React, { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";
import * as ui from "../dist/art-pix-ui.js";

const render = (name, props, children) => renderToStaticMarkup(createElement(ui[name], props, children));
const noop = () => {};
const names = ["MediaControls", "ZoomableImage", "ImageGrid", "Carousel", "ImageSlider", "ImageViewer", "Lightbox", "ImageGallery", "BeforeAfterImage", "VideoThumbnail", "AudioPlayer", "VideoPlayer", "MediaPreview", "QrCodeDisplay"];
for (const name of names) assert.equal(typeof ui[name], "function", name);
const images = [{ id: "one", src: "one.svg", alt: "First landscape", caption: "Morning" }, { id: "two", src: "two.svg", alt: "Second landscape", caption: "Evening" }];
const controlProps = { playing: false, currentTime: 10, duration: 120, volume: .5, muted: false, onPlayPause: noop, onSeek: noop, onVolumeChange: noop, onMuteToggle: noop };
const controls = render("MediaControls", controlProps);
assert.match(controls, /Playback controls/); assert.match(controls, /0:10 \/ 2:00/); assert.match(controls, /50 percent/); assert.equal((controls.match(/type="range"/g) ?? []).length, 2);
assert.match(render("MediaControls", { ...controlProps, duration: Infinity, buffering: true }), /Buffering/);
assert.match(render("ZoomableImage", { src: "one.svg", alt: "Landscape" }), /Use arrow keys to pan/);
assert.match(render("ImageGrid", { images }), /First landscape/);
assert.match(render("ImageGrid", { images, onSelect: noop }), /aria-label="View First landscape"/);
assert.match(render("ImageGrid", { images: [] }), /No images/);
let selected;
const grid = ui.ImageGrid({ images, onSelect: index => { selected = index; } });
grid.props.children[1].props.children.props.children[0].props.onClick(); assert.equal(selected, 1);
const slides = images.map(image => ({ id: image.id, label: image.alt, content: image.caption }));
const carousel = render("Carousel", { label: "Scenes", slides, index: 99 });
assert.match(carousel, /aria-roledescription="carousel"/); assert.match(carousel, /2 of 2/); assert.match(carousel, /Evening/); assert(!carousel.includes(">Morning<"));
assert.match(render("Carousel", { label: "Empty", slides: [] }), /No slides/);
assert.match(render("ImageSlider", { label: "Scenes", images }), /alt="First landscape"/);
assert.match(render("ImageViewer", { images }), /Zoom in/);
assert(!render("Lightbox", { open: false, onOpenChange: noop, images }).includes("Zoom in"));
assert.match(render("Lightbox", { open: true, onOpenChange: noop, images }), /aria-labelledby=/);
assert.match(render("ImageGallery", { images }), /View First landscape/);
const comparison = render("BeforeAfterImage", { before: images[0], after: images[1], value: 200 });
assert.match(comparison, /100% Before, 0% After/); assert.match(comparison, /clip-path:inset\(0 0% 0 0\)/);
let played = 0;
ui.VideoThumbnail({ label: "Film", onPlay: () => played++ }).props.onClick(); assert.equal(played, 1);
assert.match(render("VideoThumbnail", { label: "Film", onPlay: noop, disabled: true }), /disabled=""/);
for (const name of ["AudioPlayer", "VideoPlayer"]) {
 const html = render(name, { src: "demo.file", label: "Sample", transcript: "Spoken words" });
 assert(!html.includes("autoPlay")); assert.match(html, /preload="none"/); assert.match(html, /Transcript/); assert.match(html, /Playback controls/);
 assert(!render(name, { src: "demo.file", label: "Native", nativeControls: true }).includes("Playback controls"));
 assert.match(render(name, { src: "", label: "Empty" }), /No media source supplied/);
}
assert.match(render("VideoPlayer", { src: "movie.mp4", label: "Film", tracks: [{ src: "captions.vtt", kind: "captions", label: "English", srcLang: "en", default: true }] }), /<track[^>]*kind="captions"/);
assert.match(render("MediaPreview", { type: "image", src: "one.svg", alt: "Still" }), /alt="Still"/);
assert.match(render("MediaPreview", { type: "audio", src: "tone.wav", label: "Sound" }), /<audio/);
assert.match(render("MediaPreview", { type: "video", src: "film.mp4", label: "Film" }), /<video/);

const compile = source => ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } }).outputText;
const load = source => import(`data:text/javascript;base64,${Buffer.from(compile(source)).toString("base64")}`);
const model = await load(readFileSync(new URL("../src/components/media/_shared/media.ts", import.meta.url), "utf8"));
assert.equal(model.slideIndex(NaN, 2), 0); assert.equal(model.slideIndex(99, 2), 1); assert.equal(model.slideIndex(-2, 0), 0);
assert.equal(model.formatTime(3601), "60:01"); assert.equal(model.formatTime(Infinity), "0:00");
const { encodeQr } = await load(readFileSync(new URL("../src/components/media/_shared/qr.ts", import.meta.url), "utf8"));
// Independent golden matrices generated by Project Nayuki's MIT reference encoder:
// UTF-8 ECI 26 + byte segment, L, versions 1–5, mask 0, no ECC boosting.
const fixtures = [
 ["", "d89c19683ba870ca56bb00870cd45e93fd4af373416932f746fa87c38a0e2f1b"],
 ["ArtPixUI", "15fc794ce4b7c4df1993d4c8842c65ff1d5524b0b86d004284ffcf90d33e829a"],
 ["https://example.com", "c58c5aa73cbe8c47d8258cb6ec45f0f20f7574f09589051cf96e05b102f89aee"],
 ["Hello 🌲", "5ef4209018f4599f969af7017c14cf2d475e514d31ab97aa22c603150ef4b1b4"],
 ["x".repeat(16), "2e94e199e08a6665fbcb9c5fc83774a0eb849cc1a69af042ae77ae54146db16d"],
 ["x".repeat(17), "6544b67de665fa0acf5b6ed062ff993a3f373a7be079d4d0b185326449c30121"],
 ["x".repeat(31), "48e2915bd048da80f1eee43e8513dc622fb54f8bec7271d90e082ef55f96a8d5"],
 ["x".repeat(32), "ab95587a52b277e6f6b08993965c1272c28eb1297133cb7c4f5a0d3a180d71e3"],
 ["x".repeat(52), "1b0f872fd7116305b9143a64bf0dcb5cc6f045a4aba7973450eaca7c459ffd7d"],
 ["x".repeat(53), "27f7e94053eae529b1a4d45a808d2c318b0f504e965d48fbd972d88400ab8509"],
 ["x".repeat(77), "178d6d79b5d200fc83676b2b381de5c9a0d644e33416835f8f30360a7730bb1d"],
 ["x".repeat(78), "6f002adee552022ecaa9c7704aab840b7e33d68d569694c8ba236c541c82c91c"],
 ["x".repeat(105), "75f689665db90b68b62d0c2abce1c992f71995fdee2c06aadb23e56d98eae131"],
];
for (const [value, hash] of fixtures) assert.equal(createHash("sha256").update(JSON.stringify(encodeQr(value))).digest("hex"), hash);
assert.throws(() => encodeQr("x".repeat(106)), RangeError); assert.throws(() => encodeQr("🌲".repeat(27)), RangeError);
const qr = render("QrCodeDisplay", { value: "ArtPixUI" }); assert.match(qr, /viewBox="0 0 29 29"/); assert.match(qr, /<desc[^>]*>ArtPixUI/); assert.match(qr, /fill="#fff"/);
assert(!render("QrCodeDisplay", { value: "x".repeat(106) }).includes("<svg"));

// Exercise actual Player event handlers with deterministic hook/native-media fixtures.
// This is not a browser playback test; no codecs/network/autoplay policy are simulated.
const source = readFileSync(new URL("../src/components/media/_shared/Player.tsx", import.meta.url), "utf8").replace(/^import .*;\r?\n/gm, "").replace(/export /g, "");
const output = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.React, target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.None } }).outputText;
const updates = []; const refs = [];
const effects = [];
const context = { React, MediaControls: function Controls() {}, useEffect(effect) { effects.push(effect); }, useRef(value) { const ref = { current: value }; refs.push(ref); return ref; }, useState(value) { return [value, next => updates.push(next)]; } };
vm.createContext(context); vm.runInContext(output, context);
const tree = context.Player({ kind: "video", src: "sample.mp4", label: "Test", onPlaybackError: message => updates.push(message) });
const mediaNode = tree.props.children[1], controlNode = tree.props.children[2];
const media = { paused: true, ended: false, currentTime: 5, duration: 20, volume: .8, muted: false, async play() { this.paused = false; }, pause() { this.paused = true; } };
mediaNode.props.ref(media);
const cleanup = effects[0]();
controlNode.props.onPlayPause(); await Promise.resolve(); assert.equal(media.paused, false);
controlNode.props.onPlayPause(); assert.equal(media.paused, true);
controlNode.props.onSeek(9); assert.equal(media.currentTime, 9);
controlNode.props.onVolumeChange(.2); assert.equal(media.volume, .2);
controlNode.props.onMuteToggle(); assert.equal(media.muted, true);
mediaNode.props.onTimeUpdate({ currentTarget: media }); assert.equal(updates.at(-1).time, 9);
mediaNode.props.onWaiting(); assert.equal(updates.at(-1), true);
mediaNode.props.onPlaying({ currentTarget: media }); assert.equal(updates.at(-1), false);
media.play = async () => { throw Error("Rejected"); };
controlNode.props.onPlayPause(); await new Promise(resolve => setImmediate(resolve)); assert(updates.some(value => typeof value === "string" && value.includes("Playback could not start")));
media.paused = false; cleanup(); assert.equal(media.paused, true);
console.log("14 advanced media exports, SSR semantics, callbacks/native-event fixtures, slide/time boundaries, 13 independent QR matrices and oversized UTF-8 rejection passed. Live playback, pointer/focus, scanning and AT review remain manual.");
