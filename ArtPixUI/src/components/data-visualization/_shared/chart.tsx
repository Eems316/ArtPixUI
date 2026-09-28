import { createContext, useContext } from "react";
export type Domain = readonly [
    number,
    number
];
export type ChartDatum = {
    label: string;
    value: number;
};
export type ChartPoint = {
    label: string;
    x: number;
    y: number;
    size?: number;
};
export type ChartSeries = {
    id: string;
    label: string;
    color?: string;
    values: number[];
};
export const colors = ["#247b3b", "#a56806", "#476b94", "#9b4d57", "#765194", "#427d7b"];
export function domain(values: number[], zero = false): Domain { const good = values.filter(Number.isFinite); if (!good.length)
    return [0, 1]; let low = good.reduce((a, b) => Math.min(a, b), Infinity), high = good.reduce((a, b) => Math.max(a, b), -Infinity); if (zero) {
    low = Math.min(0, low);
    high = Math.max(0, high);
} if (low === high) {
    const pad = Math.abs(low) * .1 || 1;
    low = Math.max(-Number.MAX_VALUE, low - pad);
    high = Math.min(Number.MAX_VALUE, high + pad);
} return [low, high]; }
export function scale(value: number, range: Domain, start: number, end: number) { const divisor = Math.max(Math.abs(range[0]), Math.abs(range[1]), 1); const lo = range[0] / divisor, hi = range[1] / divisor; return start + ((value / divisor - lo) / (hi - lo || 1)) * (end - start); }
export function ticks(range: Domain, count = 5) { return Array.from({ length: count }, (_, i) => range[0] * (1 - i / (count - 1)) + range[1] * (i / (count - 1))); }
export function format(value: number) { return Number.isFinite(value) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 2, notation: Math.abs(value) >= 10000 ? "compact" : "standard" }).format(value) : "—"; }
export const defaultChart = { width: 640, height: 340, left: 68, right: 24, top: 28, bottom: 66, xDomain: [0, 1] as Domain, yDomain: [0, 1] as Domain };
export const ChartContext = createContext(defaultChart);
export const useChart = () => useContext(ChartContext);
export function validRange(min: number, max: number, value: number) { return [min, max, value].every(Number.isFinite) && max > min; }
