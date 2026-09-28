import { format } from "../_shared/chart.js";
import "../_shared/chart.css";
export type TrendIndicatorProps = {
    value: number;
    label?: string;
    unit?: string;
    positiveIsGood?: boolean;
};
export function TrendIndicator({ value, label = "Change", unit = "%", positiveIsGood = true }: TrendIndicatorProps) { const valid = Number.isFinite(value); const direction = !valid ? "Unavailable" : value > 0 ? "Increase" : value < 0 ? "Decrease" : "Unchanged"; return <span className="art-pix-indicator" style={{ color: !valid || value === 0 ? undefined : (value > 0) === positiveIsGood ? "#247b3b" : "#9b3e27" }}>{label}: {direction} {valid && <><span aria-hidden="true">{value > 0 ? "▲" : value < 0 ? "▼" : "—"}</span>{format(Math.abs(value))}{unit}</>}</span>; }
