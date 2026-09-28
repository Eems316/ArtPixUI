import { Meter } from "../Meter/Meter.js";
import { format } from "../_shared/chart.js";
import "../_shared/chart.css";
export type TemperatureProps = {
    value: number;
    unit?: "C" | "F" | "K";
    label?: string;
    min?: number;
    max?: number;
};
export function Temperature({ value, unit = "C", label = "Temperature", min, max }: TemperatureProps) { const suffix = unit === "K" ? "K" : `°${unit}`; return min !== undefined && max !== undefined ? <Meter value={value} min={min} max={max} unit={suffix} label={label}/> : <span className="art-pix-indicator">{label}: {format(value)} {suffix}</span>; }
