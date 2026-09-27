export type GalleryImage = { id: string; src: string; alt: string; caption?: string; thumbnail?: string };
export function clamp(value: number, min: number, max: number) { return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min)); }
export function slideIndex(index: number, count: number) { return count > 0 ? Math.floor(clamp(index, 0, count - 1)) : 0; }
export function formatTime(seconds: number) { const n = Math.floor(Math.max(0, Number.isFinite(seconds) ? seconds : 0)); const minutes = Math.floor(n / 60); return `${minutes}:${String(n % 60).padStart(2, "0")}`; }
