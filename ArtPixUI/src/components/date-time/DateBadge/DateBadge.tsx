import { parseDate } from "../_shared/date.js";
import "../_shared/date.css";
export type DateBadgeProps = {
    value: string;
    locale?: string;
};
export function DateBadge({ value, locale = "en-US" }: DateBadgeProps) { const date = parseDate(value); if (!date)
    return <span>Invalid date</span>; let label; try {
    label = new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" }).format(date);
}
catch {
    label = value;
} return <time className="art-pix-date-badge" dateTime={value} aria-label={label}><span>{value.slice(0, 7)}</span><strong>{date.getUTCDate()}</strong></time>; }
