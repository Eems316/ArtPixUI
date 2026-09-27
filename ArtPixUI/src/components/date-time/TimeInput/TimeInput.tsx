import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type TimeInputProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "defaultValue" | "onChange" | "step"> & {
    label: string;
    value: string;
    onChange: (value: string) => void;
};
export function TimeInput({ label, value, onChange, id, className = "", ...props }: TimeInputProps) { const generated = useId(); return <div className="art-pix-date-stack"><label htmlFor={id ?? generated}>{label}</label><input {...props} id={id ?? generated} className={`art-pix-text-input ${className}`} type="time" step={60} value={value} onChange={event => onChange(event.target.value)}/></div>; }
