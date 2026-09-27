import { instant, validZone } from "../_shared/date.js";
export type TimestampProps = {
    value: string | number | Date;
    locale?: string;
    timeZone?: string;
    options?: Intl.DateTimeFormatOptions;
    fallback?: string;
};
export function Timestamp({ value, locale = "en-US", timeZone = "UTC", options, fallback = "Invalid date/time" }: TimestampProps) {
    const date = instant(value);
    if (!date || !validZone(timeZone))
        return <span>{fallback}</span>;
    let text: string;
    try {
        text = new Intl.DateTimeFormat(locale, { ...(options ?? { dateStyle: "medium", timeStyle: "short" }), timeZone }).format(date);
    }
    catch {
        return <span>{fallback}</span>;
    }
    return <time dateTime={date.toISOString()}>{text}</time>;
}
