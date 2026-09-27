import { useId } from "react";
import { TimePicker } from "../TimePicker/TimePicker.js";
import { validTime } from "../_shared/date.js";
export type TimeRangePickerProps = {
    value: {
        start: string;
        end: string;
    };
    onChange: (value: {
        start: string;
        end: string;
    }) => void;
    label?: string;
    disabled?: boolean;
    allowOvernight?: boolean;
};
export function TimeRangePicker({ value, onChange, label = "Time range", disabled, allowOvernight = false }: TimeRangePickerProps) { const id = useId(); const invalid = !!value.start && !!value.end && (!validTime(value.start) || !validTime(value.end) || (!allowOvernight && value.end < value.start)); return <fieldset disabled={disabled} className="art-pix-date-stack"><legend>{label}</legend><TimePicker label="Start time" value={value.start} onChange={start => onChange({ ...value, start })} aria-invalid={invalid} aria-describedby={invalid ? id : undefined}/><TimePicker label="End time" value={value.end} onChange={end => onChange({ ...value, end })} aria-invalid={invalid} aria-describedby={invalid ? id : undefined}/>{invalid && <p id={id} className="art-pix-date-error">Enter valid times with the end on or after the start.</p>}{allowOvernight && <small>An earlier end time means the following day.</small>}</fieldset>; }
