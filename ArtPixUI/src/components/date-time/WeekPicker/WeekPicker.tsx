import { useId } from "react";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type WeekPickerProps = {
    value: string;
    onChange: (week: string) => void;
    label?: string;
    disabled?: boolean;
};
export function WeekPicker({ value, onChange, label = "ISO week", disabled }: WeekPickerProps) { const id = useId(); return <div className="art-pix-date-stack"><label htmlFor={id}>{label} (Monday start)</label><input type="week" className="art-pix-text-input" id={id} disabled={disabled} value={value} onChange={event => onChange(event.target.value)}/></div>; }
