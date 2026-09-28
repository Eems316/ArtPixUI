export const sceneryTypes = ["plains", "hills", "desert", "ocean"] as const;
export type VistaScenery = typeof sceneryTypes[number];
export function randomSource(seed: number) {
    let state = seed >>> 0;
    return () => { state += 0x6d2b79f5; let n = Math.imul(state ^ state >>> 15, 1 | state); n ^= n + Math.imul(n ^ n >>> 7, 61 | n); return ((n ^ n >>> 14) >>> 0) / 4294967296; };
}
export function nextScenery(current: VistaScenery, random: () => number): VistaScenery {
    const choices = sceneryTypes.filter(value => value !== current);
    return choices[Math.min(choices.length - 1, Math.floor(random() * choices.length))];
}
export function sceneDuration(random: () => number) { return 15000 + random() * 5000; }
export function movementSpeed(speed: number, multiplier: number) {
    const base = Number.isFinite(speed) ? Math.max(0, Math.min(3600, speed)) : 720;
    const rate = Number.isFinite(multiplier) ? Math.max(0, Math.min(100, multiplier)) : 1;
    return base * rate;
}
export const defaultMovementSpeed = 720;
export const dayCycleDuration = 120000;
export function celestialState(milliseconds: number, width: number, height: number) {
    const phase = ((milliseconds % dayCycleDuration) + dayCycleDuration) % dayCycleDuration / dayCycleDuration;
    const angle = phase * Math.PI * 2 - Math.PI / 2;
    // Tall oval: center just below the rear ocean line, apex near the sky's top.
    const radiusX = width * .31, radiusY = height * .69, cx = width / 2, cy = height * .8;
    const dx = Math.cos(angle) * radiusX, dy = Math.sin(angle) * radiusY;
    return { sun: { x: cx + dx, y: cy + dy }, moon: { x: cx - dx, y: cy - dy }, center: { x: cx, y: cy }, radiusX, radiusY, horizon: Math.round(height * .78), night: (1 - Math.cos(phase * Math.PI * 2)) / 2 };
}
export function paintSky(ctx: CanvasRenderingContext2D, width: number, height: number, milliseconds: number) {
    const orbit = celestialState(milliseconds, width, height);
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, mixColor("#429aef", "#101a3d", orbit.night));
    sky.addColorStop(.65, mixColor("#b4dcf4", "#344269", orbit.night));
    sky.addColorStop(1, mixColor("#e3efd8", "#77738e", orbit.night));
    ctx.globalAlpha = 1; ctx.fillStyle = sky; ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#eef1da"; ctx.globalAlpha = orbit.night;
    for (let i = 0; i < 24; i++) ctx.fillRect((i * 137 + 41) % width, 12 + (i * 53 % Math.max(1, Math.floor(height * .35))), 1, 1);
    ctx.globalAlpha = 1;
    const body = (point: { x: number; y: number }, moon: boolean) => {
        const x = Math.round(point.x), y = Math.round(point.y);
        const rect = (left: number, top: number, w: number, h: number) => {
            const visible = Math.min(h, orbit.horizon - top);
            if (visible > 0) ctx.fillRect(left, top, w, visible);
        };
        ctx.fillStyle = moon ? "#bfcbe0" : "#f8dc85";
        rect(x - 17, y - 12, 34, 24); rect(x - 12, y - 17, 24, 34);
        ctx.fillStyle = moon ? "#eef1da" : "#fff3c5";
        rect(x - 12, y - 9, 24, 18); rect(x - 9, y - 12, 18, 24);
        if (moon) { ctx.fillStyle = "#bfcbe0"; rect(x - 6, y - 5, 5, 5); rect(x + 4, y + 3, 4, 4); }
    };
    body(orbit.sun, false); body(orbit.moon, true);
    return orbit.night;
}
export const layerSpeeds = [.25, .45, .7, 1] as const;
export type Biome = { start: number; kind: VistaScenery; seed: number; transitionWidth: number };
export function mixColor(a: string, b: string, amount: number) {
    return "#" + [1, 3, 5].map(offset => Math.round(parseInt(a.slice(offset, offset + 2), 16) * (1 - amount) + parseInt(b.slice(offset, offset + 2), 16) * amount).toString(16).padStart(2, "0")).join("");
}
/** World-space interpolation: once a column enters the viewport its geometry never changes. */
export function terrainAt(biomes: Biome[], layer: number, x: number, width: number, height: number) {
    let index = biomes.length - 1;
    while (index > 0 && x < biomes[index].start) index--;
    const next = biomes[index], previous = biomes[Math.max(0, index - 1)];
    const progress = index === 0 ? 1 : Math.max(0, Math.min(1, (x - next.start) / next.transitionWidth));
    const blend = progress * progress * (3 - 2 * progress);
    // Ocean is a reveal behind the land, never a land-to-blue palette blend.
    // Extend the shoreline below the canvas, including room for vegetation.
    if (previous.kind === "ocean" || next.kind === "ocean") {
        const bottom = height + 40;
        const land = next.kind === "ocean" ? previous : next;
        const from = previous.kind === "ocean" ? bottom : surface(previous.kind, layer, x, width, height, previous.seed);
        const to = next.kind === "ocean" ? bottom : surface(next.kind, layer, x, width, height, next.seed);
        return { y: Math.round(from + (to - from) * blend), colors: palettes[land.kind][layer], kind: land.kind, seed: land.seed };
    }
    const from = surface(previous.kind, layer, x, width, height, previous.seed);
    const to = surface(next.kind, layer, x, width, height, next.seed);
    return { y: Math.round(from + (to - from) * blend), colors: palettes[next.kind][layer].map((color, i) => mixColor(palettes[previous.kind][layer][i], color, blend)), kind: blend < .5 ? previous.kind : next.kind, seed: blend < .5 ? previous.seed : next.seed };
}
/** A small cached world chunk; deterministic texture and vegetation also cross chunk boundaries. */
export function paintWorldStrip(ctx: CanvasRenderingContext2D, biomes: Biome[], layer: number, start: number, size: number, height: number, worldWidth: number) {
    ctx.clearRect(0, 0, size, height);
    for (let col = 0; col < size; col++) {
        const x = start + col, sample = terrainAt(biomes, layer, x, worldWidth, height);
        const [base, light, shade] = sample.colors;
        // Texture uses transparency, but every ground column must start opaque.
        // Leaking the preceding column's alpha exposes rear layers and outlines each cached chunk.
        ctx.globalAlpha = 1;
        if (sample.y >= height) continue;
        ctx.fillStyle = base; ctx.fillRect(col, sample.y, 1, height - sample.y);
        ctx.fillStyle = light; ctx.fillRect(col, sample.y, 1, sample.kind === "ocean" ? 1 : 3);
        const random = randomSource(x * 7907 + layer * 817);
        for (let y = sample.y + 5; y < height; y += 7) {
            if (random() > .35) continue;
            ctx.fillStyle = random() > .4 ? light : shade;
            ctx.globalAlpha = .4; ctx.fillRect(col, y + Math.floor(random() * 5), 1, 1);
        }
    }
    ctx.globalAlpha = 1;
    if (layer < 2) return;
    // Include neighboring anchors to avoid cutting trees/cacti at chunk edges.
    for (let cell = Math.floor((start - 24) / 32); cell <= Math.ceil((start + size + 24) / 32); cell++) {
        const random = randomSource(cell * 9781 + layer * 871);
        const x = cell * 32 + Math.floor(random() * 20), sample = terrainAt(biomes, layer, x, worldWidth, height);
        const left = x - start, y = sample.y, h = 5 + Math.floor(random() * 9);
        const [base, light, shade] = sample.colors;
        if (y >= height || sample.kind === "ocean") continue;
        if (sample.kind === "desert") {
            ctx.fillStyle = "#587551"; ctx.fillRect(left, y - h * 2, 3, h * 2);
            ctx.fillRect(left - 4, y - h, 9, 3); ctx.fillRect(left - 4, y - h - 5, 2, 6);
            ctx.fillRect(left + 5, y - h - 3, 2, 6);
            ctx.fillStyle = "#94a166"; ctx.fillRect(left, y - h * 2, 1, h * 2);
        } else {
            ctx.fillStyle = shade; ctx.fillRect(left + 3, y - h, 3, h);
            ctx.fillRect(left - h / 2, y - h * 2, h + 5, h);
            ctx.fillStyle = base; ctx.fillRect(left - h / 2 + 2, y - h * 2 - 3, h, h);
            ctx.fillStyle = light; ctx.fillRect(left, y - h * 2 - 3, 3, 3);
            if (sample.kind === "plains") { ctx.fillStyle = "#fff0be"; ctx.fillRect(left + 12, y + 5, 2, 2); }
        }
    }
}
/** Separate water bands allow the renderer to interleave them with terrain. */
export function paintOcean(ctx: CanvasRenderingContext2D, width: number, height: number, distance: number, pass: "all" | "rear" | "middle" | "front" = "all") {
    ctx.globalAlpha = 1;
    // Three near-water bands; remove the distant water shelf altogether.
    [1, 2, 3].forEach((layer, index) => {
        if (pass !== "all" && layer !== ({ rear: 1, middle: 2, front: 3 } as const)[pass]) return;
        const speed = layerSpeeds[layer];
        const top = Math.round(height * [.78, .835, .885][index]);
        ctx.fillStyle = ["#559faf", "#4694a6", "#37899f", "#2d7f98"][layer];
        ctx.fillRect(0, top, width, height - top);
        ctx.fillStyle = ["#add9d6", "#99cecf", "#85c3c8", "#76b9c3"][layer];
        for (let row = 0; row < 5; row++) {
            const gap = 47 + row * 13;
            const shift = ((distance * speed) % gap + gap) % gap;
            const traveled = Math.floor(distance * speed / gap);
            for (let column = -1; column <= Math.ceil(width / gap); column++) {
                const x = Math.floor(column * gap + row * 17 % gap - shift);
                const y = top + row * 7 + Math.round(Math.sin((column + traveled) * 2 + row) * 2);
                ctx.fillRect(x, y, 9 + row * 3, 1);
                ctx.fillRect(x + 3, y - 1, 4 + row, 1);
            }
        }
    });
}
export function surface(kind: VistaScenery, layer: number, x: number, width: number, height: number, seed: number) {
    const angle = x / width * Math.PI * 2;
    const phase = (seed % 1000) / 100;
    const baseline = height * (.48 + layer * .115);
    if (kind === "ocean") return Math.round(baseline + Math.sin(angle * 3 + phase) * (layer ? 3 : 1));
    const amplitude = height * (kind === "hills" ? .085 : kind === "desert" ? .055 : .03);
    let wave = Math.sin(angle * 2 + phase) * .6 + Math.cos(angle * 3 - phase) * .3 + Math.sin(angle * 5 + phase) * .1;
    if (kind === "desert" && layer < 2) wave = Math.min(.7, Math.max(-.7, wave * 2.8));
    return Math.round(baseline - wave * amplitude * (layer === 0 ? 1.7 : 1));
}
const palettes: Record<VistaScenery, string[][]> = {
    plains: [["#84b9c7","#accfd2","#6aa8b5"],["#6eaa72","#91bf76","#568d6a"],["#659e48","#92ba55","#477e40"],["#41844d","#75aa4d","#2e6848"]],
    hills: [["#719dbc","#94b8ca","#6089af"],["#579b83","#77b095","#3e806f"],["#598f49","#8cb755","#397048"],["#386f45","#73a448","#255c41"]],
    desert: [["#ad9eb8","#c8b1bd","#928caa"],["#c38a68","#dda27a","#a57268"],["#e6a451","#f5c472","#c88945"],["#dfa052","#f7c475","#b77c45"]],
    ocean: [["#589eae","#8dc2c7","#43879d"],["#368ba0","#72bbbd","#307c91"],["#287e94","#66b5b6","#236c86"],["#266e87","#62adb0","#205c78"]],
};
/** Cached low-resolution strip. Height is periodic at both ends, avoiding tile seams. */
export function paintTerrain(ctx: CanvasRenderingContext2D, kind: VistaScenery, layer: number, width: number, height: number, seed: number) {
    const random = randomSource(seed + layer * 817);
    const [base, light, shade] = palettes[kind][layer];
    ctx.clearRect(0, 0, width, height);
    for (let x = 0; x < width; x++) {
        const y = surface(kind, layer, x, width, height, seed);
        ctx.fillStyle = base; ctx.fillRect(x, y, 1, height - y);
        ctx.fillStyle = light; ctx.fillRect(x, y, 1, kind === "ocean" ? 1 : 3);
        if (kind === "desert" && layer < 2 && x % 17 < 3) { ctx.fillStyle = shade; ctx.fillRect(x, y + 4, 1, 15 + random() * 18); }
    }
    // Sparse dither and broken highlight lines give the fields depth without raster assets.
    for (let i = 0; i < width * 2; i++) {
        const x = Math.floor(random() * width), y = Math.floor(random() * height);
        if (y < surface(kind, layer, x, width, height, seed) + 3) continue;
        ctx.fillStyle = i % 3 ? light : shade;
        ctx.globalAlpha = .3 + random() * .25;
        ctx.fillRect(x, y, kind === "ocean" ? 5 + Math.floor(random() * 15) : 1 + Math.floor(random() * 3), 1);
    }
    ctx.globalAlpha = 1;
    if (layer < 2 || kind === "ocean") return;
    for (let i = 0; i < 14; i++) {
        const x = Math.floor(random() * width), y = surface(kind, layer, x, width, height, seed);
        const size = 4 + Math.floor(random() * 8);
        for (const offset of [-width, 0, width]) {
            const left = x + offset;
            if (kind === "desert") {
                ctx.fillStyle = "#587551"; ctx.fillRect(left, y - size * 2, 3, size * 2);
                ctx.fillRect(left - 4, y - size - 3, 4, 3); ctx.fillRect(left - 4, y - size - 7, 2, 6);
                ctx.fillRect(left + 3, y - size, 4, 3); ctx.fillRect(left + 5, y - size - 5, 2, 6);
                ctx.fillStyle = "#94a166"; ctx.fillRect(left, y - size * 2, 1, size * 2);
            } else {
                ctx.fillStyle = shade; ctx.fillRect(left + 3, y - size, 3, size);
                ctx.fillRect(left - size / 2, y - size * 2, size + 5, size);
                ctx.fillStyle = base; ctx.fillRect(left - size / 2 + 2, y - size * 2 - 3, size, size);
                ctx.fillStyle = light; ctx.fillRect(left, y - size * 2 - 3, 3, 3);
                if (kind === "plains") { ctx.fillStyle = "#fff0be"; ctx.fillRect(left + 12, y + 5, 2, 2); ctx.fillRect(left + 15, y + 3, 2, 2); }
            }
        }
    }
}
