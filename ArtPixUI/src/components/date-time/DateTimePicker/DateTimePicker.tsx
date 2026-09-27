import { DatePicker } from "../DatePicker/DatePicker.js";
import { TimePicker } from "../TimePicker/TimePicker.js";
import { TimezoneSelector } from "../TimezoneSelector/TimezoneSelector.js";
export type DateTimeValue = {
    date: string;
    time: string;
    timeZone: string;
};
export type DateTimePickerProps = {
    value: DateTimeValue;
    onChange: (value: DateTimeValue) => void;
    label?: string;
    disabled?: boolean;
};
/** Zoned wall time, not a UTC instant. Consumers resolve DST gaps/overlaps explicitly. */
export function DateTimePicker({ value, onChange, label = "Date and time", disabled }: DateTimePickerProps) { return <fieldset className="art-pix-date-stack" disabled={disabled}><legend>{label}</legend><DatePicker value={value.date} onChange={date => onChange({ ...value, date })} disabled={disabled}/><TimePicker label="Time" value={value.time} onChange={time => onChange({ ...value, time })}/><TimezoneSelector value={value.timeZone} onChange={timeZone => onChange({ ...value, timeZone })}/><small>Timezone changes preserve the entered wall time. Resolve daylight-saving gaps/overlaps before storing an instant.</small></fieldset>; }
