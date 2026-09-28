import { validRange, format, scale } from "../_shared/chart.js";
import type { MeterProps } from "../Meter/Meter.js";
import "../_shared/chart.css";
export type GaugeProps = MeterProps;
export function Gauge({ value, min = 0, max = 100, label, unit = "" }: GaugeProps) { const valid = validRange(min, max, value); const portion = valid ? Math.min(1, Math.max(0, scale(value, [min, max], 0, 1))) : 0; return <div className="art-pix-indicator"><strong>{label}</strong><svg viewBox="0 0 220 125" aria-hidden="true"><path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="#c8b983" strokeWidth="18"/><path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="#247b3b" strokeWidth="18" pathLength="100" strokeDasharray={`${portion * 100} 100`}/><text x="110" y="105" textAnchor="middle" fontFamily="monospace">{valid ? format(value) : "—"}</text></svg><span>{valid ? `${format(value)} ${unit}; range ${format(min)} to ${format(max)}` : "Invalid range or value"}</span></div>; }
