export function parseDate(value: string): Date | null {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
        return null;
    const [year, month, day] = value.split("-").map(Number);
    if (year < 1 || year > 9999)
        return null;
    const date = new Date(0);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCFullYear(year, month - 1, day);
    return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date : null;
}
export function isoDate(date: Date) { return date.toISOString().slice(0, 10); }
export function addDays(value: string, days: number) { const date = parseDate(value); if (!date)
    return value; date.setUTCDate(date.getUTCDate() + days); return date.getUTCFullYear() >= 1 && date.getUTCFullYear() <= 9999 ? isoDate(date) : value; }
export function validMonth(value: string) { return /^\d{4}-\d{2}$/.test(value) && !!parseDate(`${value}-01`); }
export function moveMonth(value: string, amount: number) { const date = parseDate(`${value}-01`); if (!date)
    return value; date.setUTCMonth(date.getUTCMonth() + amount); return date.getUTCFullYear() >= 1 && date.getUTCFullYear() <= 9999 ? isoDate(date).slice(0, 7) : value; }
export function monthDays(month: string, weekStartsOn: 0 | 1 = 1) { const first = parseDate(`${month}-01`); if (!first)
    return []; const offset = (first.getUTCDay() - weekStartsOn + 7) % 7; return Array.from({ length: 42 }, (_, i) => { const day = new Date(first); day.setUTCDate(day.getUTCDate() + i - offset); return day.getUTCFullYear() >= 1 && day.getUTCFullYear() <= 9999 ? isoDate(day) : ""; }); }
export function validTime(value: string) { return /^([01]\d|2[0-3]):[0-5]\d$/.test(value); }
export function validZone(value: string) { try {
    new Intl.DateTimeFormat("en-US", { timeZone: value });
    return !!value;
}
catch {
    return false;
} }
export function instant(value: string | number | Date) { if (typeof value === "string" && (!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d{1,3})?)?(?:Z|[+-](?:[01]\d|2[0-3]):[0-5]\d)$/.test(value) || !parseDate(value.slice(0, 10))))
    return null; const date = new Date(value); return Number.isFinite(date.getTime()) ? date : null; }
export function clockText(seconds: number) { const n = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0)); return `${String(Math.floor(n / 3600)).padStart(2, "0")}:${String(Math.floor(n / 60) % 60).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`; }
export type DateRangeValue = {
    start: string;
    end: string;
};
