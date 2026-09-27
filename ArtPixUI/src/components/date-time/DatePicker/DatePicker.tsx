import { useState } from "react";
import { DateInput } from "../DateInput/DateInput.js";
import { Calendar } from "../Calendar/Calendar.js";
import { parseDate } from "../_shared/date.js";
export type DatePickerProps = {
    value: string;
    onChange: (date: string) => void;
    label?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    defaultMonth?: string;
};
export function DatePicker({ value, onChange, label = "Date", min, max, disabled, defaultMonth = "2026-01" }: DatePickerProps) {
    const [view, setView] = useState({ value, month: parseDate(value) ? value.slice(0, 7) : defaultMonth });
    const month = value !== view.value && parseDate(value) ? value.slice(0, 7) : view.month;
    return <div className="art-pix-date-stack"><DateInput label={label} value={value} min={min} max={max} disabled={disabled} onChange={onChange}/><Calendar value={value} onChange={onChange} month={month} onMonthChange={next => setView({ value, month: next })} min={min} max={max} disabled={disabled}/></div>;
}
