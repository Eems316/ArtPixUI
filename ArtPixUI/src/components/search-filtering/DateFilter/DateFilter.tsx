import { DateRangePicker, type DateRangePickerProps } from "../../date-time/DateRangePicker/DateRangePicker.js";
import { Button } from "../../buttons-actions/Button/Button.js";
export type DateFilterProps = DateRangePickerProps;
export function DateFilter({ label = "Filter by date", ...props }: DateFilterProps) { return <div className="art-pix-date-stack"><DateRangePicker {...props} label={label}/><Button variant="secondary" disabled={props.disabled || (!props.value.start && !props.value.end)} onClick={() => props.onChange({ start: "", end: "" })}>Clear date filter</Button></div>; }
