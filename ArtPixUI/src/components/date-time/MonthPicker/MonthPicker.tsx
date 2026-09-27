import { useId } from "react";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type MonthPickerProps = {
    value: string;
    onChange: (value: string) => void;
    label?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
};
export function MonthPicker({ value, onChange, label = "Month", ...props }: MonthPickerProps) { const id = useId(); return <div className="art-pix-date-stack"><label htmlFor={id}>{label}</label><input {...props} type="month" className="art-pix-text-input" id={id} value={value} onChange={event => onChange(event.target.value)}/></div>; }
