import { useId } from "react";
import { validRange, format } from "../_shared/chart.js";
import "../_shared/chart.css";
export type MeterProps = {
    value: number;
    min?: number;
    max?: number;
    label: string;
    unit?: string;
};
export function Meter({ value, min = 0, max = 100, label, unit = "" }: MeterProps) { const id = useId(); return <div className="art-pix-indicator"><label htmlFor={id}>{label}</label>{validRange(min, max, value) ? <><meter id={id} min={min} max={max} value={Math.min(max, Math.max(min, value))}/> <span>{format(value)} {unit} ({format(min)}–{format(max)})</span></> : <span>Invalid range or value</span>}</div>; }
