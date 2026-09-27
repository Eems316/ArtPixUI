import { Calendar, type CalendarProps } from "../Calendar/Calendar.js";
import type { DateRangeValue } from "../_shared/date.js";
export type CalendarRangeProps = Omit<CalendarProps, "value" | "onChange" | "range"> & {
    value: DateRangeValue;
    onChange: (value: DateRangeValue) => void;
};
export function CalendarRange({ value, onChange, ...props }: CalendarRangeProps) { return <div className="art-pix-date-stack"><p>Choose a start date, then an end date.</p><Calendar {...props} value={value.end || value.start} range={value} onChange={day => { if (!value.start || value.end)
    onChange({ start: day, end: "" });
else
    onChange(day < value.start ? { start: day, end: value.start } : { start: value.start, end: day }); }}/><span role="status">{value.start || "No start"} — {value.end || "Choose end"}</span></div>; }
