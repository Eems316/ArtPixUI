import { useEffect, useRef, useState } from "react";
import { addDays, monthDays, moveMonth, parseDate, validMonth, type DateRangeValue } from "../_shared/date.js";
import "../_shared/date.css";
export type CalendarGridProps = {
    month: string;
    onMonthChange: (month: string) => void;
    value?: string;
    onChange: (date: string) => void;
    min?: string;
    max?: string;
    disabled?: boolean;
    isDateDisabled?: (date: string) => boolean;
    weekStartsOn?: 0 | 1;
    range?: DateRangeValue;
};
export function CalendarGrid({ month, onMonthChange, value, onChange, min, max, disabled, isDateDisabled, weekStartsOn = 1, range }: CalendarGridProps) {
    const [active, setActive] = useState(value);
    const root = useRef<HTMLTableElement>(null);
    const pending = useRef<string | null>(null);
    useEffect(() => { if (pending.current) {
        root.current?.querySelector<HTMLButtonElement>(`button[data-date="${pending.current}"]`)?.focus();
        pending.current = null;
    } }, [month, active]);
    const blocked = (day: string) => disabled || !parseDate(day) || (!!min && !!parseDate(min) && day < min) || (!!max && !!parseDate(max) && day > max) || isDateDisabled?.(day);
    const days = monthDays(month, weekStartsOn);
    const tabDay = days.find(day => day === active && !blocked(day)) ?? days.find(day => day === value && !blocked(day)) ?? days.find(day => day.startsWith(month) && !blocked(day)) ?? days.find(day => !blocked(day));
    const go = (day: string) => { if (blocked(day))
        return; pending.current = day; setActive(day); if (!day.startsWith(month))
        onMonthChange(day.slice(0, 7));
    else
        root.current?.querySelector<HTMLButtonElement>(`button[data-date="${day}"]`)?.focus(); };
    if (!validMonth(month))
        return <p>Invalid calendar month.</p>;
    const weekdays = weekStartsOn === 1 ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return <table className="art-pix-calendar-grid" ref={root} aria-label={`Calendar ${month}`} role="grid"><thead><tr>{weekdays.map(day => <th scope="col" key={day}>{day}</th>)}</tr></thead><tbody>{Array.from({ length: 6 }, (_, row) => <tr key={row}>{days.slice(row * 7, row * 7 + 7).map((day, col) => <td key={`${day}-${col}`} role="gridcell" aria-selected={value === day || (!!range?.start && !!range.end && day >= range.start && day <= range.end)}><button type="button" data-date={day} data-outside={!day.startsWith(month)} data-in-range={!!range?.start && !!range.end && day >= range.start && day <= range.end} aria-label={day || "Outside supported date range"} aria-pressed={value === day || range?.start === day || range?.end === day} disabled={blocked(day)} tabIndex={day === tabDay ? 0 : -1} onFocus={() => setActive(day)} onClick={() => { onChange(day); if (!day.startsWith(month))
                onMonthChange(day.slice(0, 7)); }} onKeyDown={event => {
                    let target: string | undefined;
                    const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
                    if (delta !== undefined) {
                        target = addDays(day, delta);
                        for (let n = 0; n < 366 && blocked(target); n++) {
                            const next = addDays(target, delta);
                            if (next === target)
                                break;
                            target = next;
                        }
                    }
                    if (event.key === "Home")
                        target = addDays(day, -col);
                    if (event.key === "End")
                        target = addDays(day, 6 - col);
                    if (event.key === "PageUp" || event.key === "PageDown")
                        target = `${moveMonth(day.slice(0, 7), event.key === "PageUp" ? -1 : 1)}-01`;
                    if (target) {
                        event.preventDefault();
                        go(target);
                    }
                }}>{day ? Number(day.slice(-2)) : ""}</button></td>)}</tr>)}</tbody></table>;
}
