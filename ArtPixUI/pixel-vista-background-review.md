# PixelVistaBackground — awaiting review

## Plan and implementation

Procedural pixel-art scenery inspired by the supplied meadow and desert references, not the flattened reference images used as textures. The sky cycles from blue daylight to night; a pixel sun and moon orbit opposite each other, with timing scaled by movement speed. Plains, hills, desert and ocean each have distinct palettes and silhouettes. Four cached terrain strips move right to left at 25%, 45%, 70% and 100% of foreground speed; clouds move at 14%.

At the default rate, new scenery is selected after a randomized 15–20 seconds of active playback. The scene clock advances in proportion to effective movement speed divided by 720: 2× gives 7.5–10 seconds, 0.5× gives 30–40 seconds. Rate changes preserve progress toward the next boundary. There is no preset playlist. Immediate repeats are excluded so each change is visible; later returns (desert → plains → desert, for example) are allowed. Each return gets a new procedural terrain seed. Scenery now enters from the right as a world-space terrain transition, not a screen-wide fade. A smooth interpolation blends the old/new height profiles and RGB palettes across a fixed world-space strip equivalent to three seconds of travel at the new default speed. Hills flatten gradually into plains. Already-visible columns stay unchanged and travel left at their original layer speed.

Each layer has its own biome boundaries and bounded cache of 64-pixel world chunks. Several biomes can coexist on screen as the view travels past them; the entire viewport is not replaced every 15–20 seconds. At the default foreground speed, crossing the full 640-pixel view takes about 0.9 seconds; distant layers take longer. Changing speed changes travel time without moving existing biome boundaries. Pausing freezes both travel and the generation schedule. Old chunks and obsolete biome history are pruned.

This is a stylized code-rendered interpretation, not a pixel-for-pixel recreation of the much more detailed references. Ocean has separate scrolling water/crest bands interleaved with terrain. Back-to-front order: rear water, terrain layers 1 and 2, middle water, closest water, terrain layers 3 and 4. Both near-water bands now sit behind the front two terrain layers; the closest wave has moved back one additional layer. At an ocean boundary, the land height slopes down to 40 logical pixels below the viewport; land colors are retained, not mixed with blue. Terrain and vegetation below the viewport are omitted so waves show through. Ocean-to-land reverses the height transition. Pure-ocean terrain chunks remain transparent. Land-to-land color/shape interpolation and all original parallax rates are unchanged. There are no animated characters.

## API

```tsx
<PixelVistaBackground initialScenery="desert" style={{ minHeight: 440 }}>
  <h1>Your foreground content</h1>
</PixelVistaBackground>
```

- Native div props, className/style and children are supported. Foreground content remains interactive and independent of the decorative canvas.
- `initialScenery`: plains (default), hills, desert or ocean. Changing it rebuilds the world.
- `seed?`: reproducible geometry and sequence; omitted means a fresh random seed per mount.
- `speed=720`: logical foreground pixels per second (3× the previous 240 default), clamped to 0–3600. Zero freezes motion and scenery changes.
- `movementRate=1`: decimal multiplier applied to the total movement speed, including every terrain layer and the clouds. 0 stops, 0.5 halves, 2 doubles; clamped to 0–100, nonfinite values use 1. Effective foreground speed is the normalized `speed × movementRate`. Updating it preserves the current world/position instead of restarting. The scenery clock scales with effective speed relative to 720; the 120-second celestial cycle scales the same way. The preview has a labeled decimal number box; incomplete/invalid edits retain the last valid value and reset on blur.
- `paused=false`: external pause; built-in Pause/Resume also pauses the scenery clock, terrain movement and celestial cycle.
- `showControls=true`: visible pause control. If hiding it while animating, supply an accessible external pause control.
- Reduced-motion preferences force a static scene. Hidden/offscreen views suspend rendering and the active-time schedule. Unmount releases RAF, observers and listeners. Long stalled frames are capped to prevent visual jumps.
- Low-resolution canvas with CSS pixelated scaling; logical height adapts to the container (160–960). Extremely tall/narrow containers can stretch the pixels. No image requests, image assets or additional packages.
- Canvas is decorative and hidden from assistive technology. If the environment cannot create a 2D context, the sky-colored CSS surface and foreground content remain. Use an opaque/translucent foreground panel for reliable text contrast.

Ocean/speed review update: removed the rear water band and its distant fill. The remaining three ocean bands start at 78%, 83.5% and 88.5% of the viewport height, bringing the middle two into a closely spaced group, shifted downward together by 6% of viewport height. Their relative movement rates remain 45%, 70% and 100% of foreground speed. Default movement is now 720 logical pixels/second; the preview multiplier remains 1. The default selection interval is 15–20 seconds and scales inversely with movement speed.

## Day/night cycle

One complete sun → moon → sun revolution lasts 120 seconds at default speed of active animation time, with the moon 180° opposite the sun on an elliptical path. The oval is centered at 50% width and 80% height, just below the ocean line at 78%; its horizontal radius is 31% of width and vertical radius is 69% of height, placing its apex at 11% height. Bodies pass below the ocean horizon; moon craters, night colors and stars distinguish nighttime. The rectangular night tint has been removed to eliminate its hard horizontal boundary; terrain retains its original palette. Movement speed scales the celestial clock relative to the default: 2× completes a cycle in 60 seconds, 0.5× in 240 seconds; zero freezes it. Paused, zero-speed, hidden/offscreen and reduced-motion states freeze both clocks; resuming continues the same phase. Changing seed/initialScenery restarts at daytime. The existing capped-frame active-time policy prevents large jumps after stalls.

## Playground integration

The `playground-intro` section uses a separate default PixelVistaBackground with no controls. Its text remains on parchment panels for contrast. The dedicated demo remains, with both explanatory paragraphs removed and library SortSelect, Button, Checkbox, Label and numeric TextInput controls. The demo uses its external pause checkbox instead of the built-in button. TextInput now accepts `type="number"`; decimal validation and last-valid-value behavior are retained.

## Verification

Latest review revision: removed the translucent night rectangle. Following the layering adjustment, the middle wave now sits behind the front two land layers and the closest wave also behind the front two land layers, using canvas draw order (not CSS z-index). Wave heights, spacing and speeds remain unchanged. Regression checks cover individual band selection, interleaved renderer stacking order and absence of the night-tint rectangle.

Review update: the playground now includes a **Show text box** checkbox for the foreground message card; hiding it leaves the background and movement controls running. Fixed terrain-strip opacity leakage by restoring full opacity for each base column. Fixed world restarts in resized/tall canvases by synchronizing the renderer height before its first draw, preventing stale horizontal bands. Regression checks cover opaque terrain bottoms/edges at multiple heights and restarted, already-resized canvases at 10× speed and while paused.

`node scripts/check-pixel-vista.mjs` validates deterministic PRNG/scene choices, timing bounds, height/color interpolation endpoints and midpoints for every biome pair/layer, immutable already-visible samples, finite paint geometry, unchanged layer speeds, SSR semantics, and an isolated renderer fixture covering leftward movement, an elliptical sun/moon cycle, absence of frame-opacity fading, pause, reduced motion and frame cleanup.

Browser access to the localhost preview was blocked by the browser tool's URL policy. Live appearance, pixel density, seams, responsiveness, control interaction and motion comfort remain **pending user review**. No screenshot or live-browser pass is claimed.

[Preview](http://127.0.0.1:5173/#pixel-vista-background-demo). This component remains `[-]`; the user requested committing the final component set and pushing all local commits. Review approval remains pending.
