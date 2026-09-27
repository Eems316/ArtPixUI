import { useId } from "react";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type YearPickerProps = {
    value: number;
    onChange: (year: number) => void;
    label?: string;
    min?: number;
    max?: number;
    disabled?: boolean;
};
export function YearPicker({ value, onChange, label = "Year", min = 1, max = 9999, disabled }: YearPickerProps) { const id = useId(); const low = Math.max(1, Math.min(9999, Math.floor(Number.isFinite(min) ? min : 1))); const high = Math.max(low, Math.min(9999, Math.floor(Number.isFinite(max) ? max : 9999))); return <div className="art-pix-date-stack"><label htmlFor={id}>{label}</label><input className="art-pix-text-input" id={id} type="number" min={low} max={high} step={1} value={Number.isFinite(value) ? value : ""} disabled={disabled} onChange={event => { const n = event.target.valueAsNumber; if (Number.isInteger(n) && n >= low && n <= high)
    onChange(n); }}/></div>; }
