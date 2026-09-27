import { useState } from "react";
import { CalendarGrid, type CalendarGridProps } from "../CalendarGrid/CalendarGrid.js";
import { CalendarHeader } from "../CalendarHeader/CalendarHeader.js";
import { validMonth, parseDate } from "../_shared/date.js";
export type CalendarProps = Omit<CalendarGridProps, "month" | "onMonthChange"> & {
    month?: string;
    defaultMonth?: string;
    onMonthChange?: (month: string) => void;
};
export function Calendar({ month, defaultMonth = "2026-01", onMonthChange, ...props }: CalendarProps) {
    const [local, setLocal] = useState({ value: props.value, month: (props.value && parseDate(props.value) ? props.value.slice(0, 7) : defaultMonth) });
    const shown = month ?? (props.value !== local.value && props.value && parseDate(props.value) ? props.value.slice(0, 7) : local.month);
    const change = (next: string) => { if (!validMonth(next))
        return; if (month === undefined)
        setLocal({ value: props.value, month: next }); onMonthChange?.(next); };
    return <div className="art-pix-calendar art-pix-date-stack"><CalendarHeader month={shown} onMonthChange={change} disabled={props.disabled}/><CalendarGrid {...props} month={shown} onMonthChange={change}/></div>;
}
