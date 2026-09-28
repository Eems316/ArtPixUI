import { useEffect, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { nextScenery, paintWorldStrip, paintOcean, paintSky, defaultMovementSpeed, dayCycleDuration, layerSpeeds, movementSpeed, randomSource, sceneDuration, sceneryTypes, type Biome, type VistaScenery } from "./vista.js";
import "./PixelVistaBackground.css";
export type PixelVistaBackgroundProps = ComponentPropsWithoutRef<"div"> & {
    initialScenery?: VistaScenery;
    /** Reproducible terrain and scene sequence. Omit for a fresh scene sequence per mount. */
    seed?: number;
    /** Logical pixels per second; foreground rate. Default 720. */
    speed?: number;
    /** Multiplies all movement, preserving parallax ratios. Default 1; range 0–100. */
    movementRate?: number;
    paused?: boolean;
    showControls?: boolean;
};
export function PixelVistaBackground({ initialScenery = "plains", seed, speed = defaultMovementSpeed, movementRate = 1, paused = false, showControls = true, children, className = "", ...props }: PixelVistaBackgroundProps) {
    const canvas = useRef<HTMLCanvasElement>(null);
    const [localPaused, setLocalPaused] = useState(false);
    const [reduced, setReduced] = useState(false);
    const stopped = paused || localPaused;
    const rate = movementSpeed(speed, movementRate);
    // The renderer reads changes without restarting the landscape or its random schedule.
    const settings = useRef({ stopped, rate });
    useEffect(() => { settings.current = { stopped, rate }; }, [stopped, rate]);
    useEffect(() => {
        const element = canvas.current;
        const context = element?.getContext("2d");
        if (!element || !context) return;
        const random = randomSource(seed === undefined || !Number.isFinite(seed) ? Math.random() * 4294967296 : seed);
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        let reduce = motion.matches, visible = true, frame = 0, last = 0, elapsed = 0, distance = 0;
        let due = sceneDuration(random);
        let skyTime = 0;
        const width = 640, chunkSize = 64;
        let height = 360;
        let currentKind = sceneryTypes.includes(initialScenery) ? initialScenery : "plains";
        const initialSeed = Math.floor(random() * 100000);
        const biomes: Biome[][] = layerSpeeds.map(() => [{ start: 0, kind: currentKind, seed: initialSeed, transitionWidth: 1 }]);
        const caches = layerSpeeds.map(() => new Map<number, HTMLCanvasElement>());
        const clouds = Array.from({ length: 9 }, () => ({ x: random(), y: .08 + random() * .26, size: 12 + Math.floor(random() * 22) }));
        function terrain() {
            layerSpeeds.forEach((speed, layer) => {
                // Both near-water bands sit behind the front two land layers.
                if (layer === 2) paintOcean(context!, width, height, distance, "middle");
                if (layer === 2) paintOcean(context!, width, height, distance, "front");
                const left = Math.floor(distance * speed), first = Math.floor(left / chunkSize), lastChunk = Math.floor((left + width - 1) / chunkSize);
                const cache = caches[layer];
                for (const key of cache.keys()) if (key < first || key > lastChunk) cache.delete(key);
                for (let chunk = first; chunk <= lastChunk; chunk++) {
                    let tile = cache.get(chunk);
                    if (!tile) {
                        tile = document.createElement("canvas"); tile.width = chunkSize; tile.height = height;
                        const ctx = tile.getContext("2d");
                        if (ctx) paintWorldStrip(ctx, biomes[layer], layer, chunk * chunkSize, chunkSize, height, width);
                        cache.set(chunk, tile);
                    }
                    context!.drawImage(tile, chunk * chunkSize - left, 0);
                }
                // Keep the preceding biome until its successor has fully transitioned offscreen.
                while (biomes[layer].length > 2 && biomes[layer][1].start + biomes[layer][1].transitionWidth + 32 < left) biomes[layer].shift();
            });
        }
        function draw() {
            if (!context || !element) return;
            context.imageSmoothingEnabled = false;
            paintSky(context, width, height, skyTime);
            clouds.forEach(cloud => {
                const x = ((cloud.x * width - distance * .14) % width + width) % width;
                const y = Math.floor(cloud.y * height), size = cloud.size;
                for (const offset of [-width, 0, width]) {
                    const left = Math.floor(x + offset);
                    context.fillStyle = "#d4e6e5"; context.fillRect(left, y + 5, size * 2, 5);
                    context.fillStyle = "#fff4d9"; context.fillRect(left + 4, y, size, 7); context.fillRect(left + size / 2, y - 5, size / 2, 7);
                    context.fillRect(left - 8, y + 5, size * 2.5, 2);
                }
            });
            paintOcean(context, width, height, distance, "rear");
            terrain();
        }
        function tick(time: number) {
            const delta = last ? Math.min(100, time - last) : 0; last = time;
            if (!settings.current.stopped && settings.current.rate > 0 && !reduce && visible && !document.hidden) {
                distance += delta / 1000 * settings.current.rate;
                elapsed += delta * settings.current.rate / defaultMovementSpeed;
                skyTime = (skyTime + delta * settings.current.rate / defaultMovementSpeed) % dayCycleDuration;
                while (elapsed >= due) {
                    elapsed -= due;
                    const boundaryDistance = distance - elapsed / 1000 * defaultMovementSpeed;
                    currentKind = nextScenery(currentKind, random);
                    const sceneSeed = Math.floor(random() * 100000);
                    layerSpeeds.forEach((speed, layer) => {
                        const previous = biomes[layer].at(-1)!;
                        const start = Math.max(width + Math.floor(boundaryDistance * speed), previous.start + previous.transitionWidth);
                        biomes[layer].push({ start, kind: currentKind, seed: sceneSeed, transitionWidth: defaultMovementSpeed * speed * 3 });
                        // Repaint only chunks touching future terrain; already visible columns retain their world samples.
                        for (const key of caches[layer].keys()) if ((key + 1) * chunkSize >= start - 32) caches[layer].delete(key);
                    });
                    due = sceneDuration(random);
                }
                draw();
            }
            frame = requestAnimationFrame(tick);
        }
        const resize = () => {
            const bounds = element.getBoundingClientRect();
            if (!bounds.width || !bounds.height) return;
            const nextHeight = Math.max(160, Math.min(960, Math.round(640 * bounds.height / bounds.width)));
            // Effects restart on scenery/seed changes while the canvas retains its resized dimensions.
            // Synchronize the renderer's local height too, or stale lower rows remain on screen.
            if (element.width === width && element.height === nextHeight && height === nextHeight) return;
            height = nextHeight; element.width = width; element.height = height;
            caches.forEach(cache => cache.clear());
            draw();
        };
        const updateMotion = () => { reduce = motion.matches; setReduced(reduce); last = 0; draw(); };
        const visibility = () => { last = 0; };
        resize(); updateMotion();
        motion.addEventListener("change", updateMotion);
        document.addEventListener("visibilitychange", visibility);
        const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
        observer?.observe(element);
        const intersection = typeof IntersectionObserver !== "undefined" ? new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? true; last = 0; }) : null;
        intersection?.observe(element);
        frame = requestAnimationFrame(tick);
        return () => { cancelAnimationFrame(frame); observer?.disconnect(); intersection?.disconnect(); motion.removeEventListener("change", updateMotion); document.removeEventListener("visibilitychange", visibility); };
    }, [initialScenery, seed]);
    return <div {...props} className={`art-pix-pixel-vista ${className}`}>
        <canvas ref={canvas} width={640} height={360} className="art-pix-pixel-vista__canvas" aria-hidden="true" />
        <div className="art-pix-pixel-vista__content">{children}</div>
        {showControls && <button type="button" className="art-pix-pixel-vista__pause" disabled={paused || reduced || rate === 0} aria-pressed={stopped || reduced || rate === 0} onClick={() => setLocalPaused(value => !value)}>{reduced ? "Motion reduced" : paused || rate === 0 ? "Scenery paused" : localPaused ? "Resume scenery" : "Pause scenery"}</button>}
    </div>;
}
