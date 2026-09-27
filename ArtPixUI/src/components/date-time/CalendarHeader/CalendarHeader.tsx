import { Button } from "../../buttons-actions/Button/Button.js";
import { validMonth, moveMonth } from "../_shared/date.js";
import "../_shared/date.css";
export type CalendarHeaderProps = {
    month: string;
    onMonthChange: (month: string) => void;
    disabled?: boolean;
};
export function CalendarHeader({ month, onMonthChange, disabled }: CalendarHeaderProps) { return <div className="art-pix-date-row"><Button variant="secondary" aria-label="Previous month" disabled={disabled || !validMonth(month) || month === "0001-01"} onClick={() => onMonthChange(moveMonth(month, -1))}>‹</Button><strong aria-live="polite">{validMonth(month) ? month : "Invalid month"}</strong><Button variant="secondary" aria-label="Next month" disabled={disabled || !validMonth(month) || month === "9999-12"} onClick={() => onMonthChange(moveMonth(month, 1))}>›</Button></div>; }
