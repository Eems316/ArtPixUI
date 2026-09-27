import { TimeInput, type TimeInputProps } from "../TimeInput/TimeInput.js";
export type TimePickerProps = TimeInputProps;
export function TimePicker(props: TimePickerProps) { return <TimeInput {...props}/>; }
