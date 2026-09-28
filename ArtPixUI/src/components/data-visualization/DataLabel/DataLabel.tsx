import type { ReactNode } from "react";
import { format } from "../_shared/chart.js";
export type DataLabelProps = {
    x: number;
    y: number;
    value: number;
    formatValue?: (value: number) => ReactNode;
    anchor?: "start" | "middle" | "end";
};
export function DataLabel({ x, y, value, formatValue = format, anchor = "middle" }: DataLabelProps) { return [x, y, value].every(Number.isFinite) ? <text x={x} y={y} textAnchor={anchor} aria-hidden="true">{formatValue(value)}</text> : null; }
