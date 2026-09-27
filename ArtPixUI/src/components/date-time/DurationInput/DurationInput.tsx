import { useId } from "react";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type DurationInputProps = {
    label?: string;
    value: number;
    onChange: (seconds: number) => void;
    unit?: "seconds" | "minutes" | "hours";
    disabled?: boolean;
};
export function DurationInput({ label = "Duration", value, onChange, unit = "minutes", disabled }: DurationInputProps) { const id = useId(); const factor = unit === "hours" ? 3600 : unit === "minutes" ? 60 : 1; return <div className="art-pix-date-stack"><label htmlFor={id}>{label} ({unit})</label><input id={id} className="art-pix-text-input" type="number" min={0} step="any" disabled={disabled} value={Number.isFinite(value) ? Math.max(0, value) / factor : 0} onChange={event => { const n = event.target.valueAsNumber; if (Number.isFinite(n * factor) && n >= 0)
    onChange(n * factor); }}/></div>; }
