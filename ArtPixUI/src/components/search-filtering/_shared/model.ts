export type FilterOption = { id: string; label: string; count?: number; disabled?: boolean };
export type FilterValues = Record<string, string[]>;
export type SearchConfiguration = { query: string; filters: FilterValues; ranges?: Record<string, [number, number]>; sort?: string; direction?: "asc" | "desc" };
export function safeCount(value: number) { return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0; }
export function toggleChoice(values: string[], id: string, checked: boolean) { return checked ? [...new Set([...values, id])] : values.filter(value => value !== id); }
export function matchesQuery(label: string, query: string, keywords: string[] = []) { return [label, ...keywords].join(" ").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()); }
export function rangeBounds(min: number, max: number, step: number) {
 const low = Number.isFinite(min) ? min : 0;
 return { min: low, max: Number.isFinite(max) && max > low ? max : low + 100, step: Number.isFinite(step) && step > 0 ? step : 1 };
}
export function clampRangeValue(value: number, min: number, max: number, step: number) {
 const finite = Number.isFinite(value) ? value : min;
 const ticks = Math.min(Math.floor((max - min) / step + 1e-10), Math.round((Math.min(max, Math.max(min, finite)) - min) / step));
 const snapped = min + Math.max(0, ticks) * step;
 return Number(Math.min(max, Math.max(min, snapped)).toFixed(10));
}
export function normalizeRange(value: readonly [number, number], min: number, max: number, step: number): [number, number] {
 const a = clampRangeValue(value[0], min, max, step), b = clampRangeValue(value[1], min, max, step);
 return a <= b ? [a, b] : [b, a];
}
export function cloneConfiguration(value: SearchConfiguration): SearchConfiguration {
 return { ...value, filters: Object.fromEntries(Object.entries(value.filters).map(([key, values]) => [key, [...values]])), ...(value.ranges ? { ranges: Object.fromEntries(Object.entries(value.ranges).map(([key, range]) => [key, [...range] as [number, number]])) } : {}) };
}
