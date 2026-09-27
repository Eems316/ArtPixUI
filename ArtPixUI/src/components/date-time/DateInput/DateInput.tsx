import { useId } from "react";
import type { ComponentPropsWithoutRef } from "react";
import "../_shared/date.css";
import "../../forms-inputs/TextInput/TextInput.css";
export type DateInputProps = Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "defaultValue" | "onChange"> & {
    label: string;
    value: string;
    onChange: (value: string) => void;
};
export function DateInput({ label, value, onChange, id, className = "", ...props }: DateInputProps) { const generated = useId(); return <div className="art-pix-date-stack"><label htmlFor={id ?? generated}>{label}</label><input {...props} id={id ?? generated} className={`art-pix-text-input ${className}`} type="date" value={value} onChange={event => onChange(event.target.value)}/></div>; }
