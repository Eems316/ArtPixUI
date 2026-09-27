import { useId } from "react";
import { DateInput } from "../DateInput/DateInput.js";
import { CalendarRange, type CalendarRangeProps } from "../CalendarRange/CalendarRange.js";
import { parseDate } from "../_shared/date.js";
export type DateRangePickerProps = CalendarRangeProps & {
    label?: string;
};
export function DateRangePicker({ label = "Date range", value, onChange, ...props }: DateRangePickerProps) { const id = useId(); const invalid = !!value.start && !!value.end && (!parseDate(value.start) || !parseDate(value.end) || value.start > value.end); return <fieldset className="art-pix-date-stack" disabled={props.disabled}><legend>{label}</legend><DateInput label="Start date" value={value.start} min={props.min} max={[value.end, props.max].filter(v => v && parseDate(v)).sort()[0]} aria-invalid={invalid} aria-describedby={invalid ? id : undefined} onChange={start => onChange({ ...value, start })}/><DateInput label="End date" value={value.end} min={[value.start, props.min].filter(v => v && parseDate(v)).sort().at(-1)} max={props.max} aria-invalid={invalid} aria-describedby={invalid ? id : undefined} onChange={end => onChange({ ...value, end })}/>{invalid && <p id={id} className="art-pix-date-error">End date must be on or after a valid start date.</p>}<CalendarRange {...props} value={value} onChange={onChange}/></fieldset>; }
