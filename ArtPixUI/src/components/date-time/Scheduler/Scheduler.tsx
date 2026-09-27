import { useState } from "react";
import { Calendar } from "../Calendar/Calendar.js";
import { DateTimePicker, type DateTimeValue } from "../DateTimePicker/DateTimePicker.js";
import { Dialog } from "../../overlays-menus/Dialog/Dialog.js";
import { Button } from "../../buttons-actions/Button/Button.js";
import { TextInput } from "../../forms-inputs/TextInput/TextInput.js";
import { parseDate, validTime, validZone } from "../_shared/date.js";
export type ScheduleEvent = DateTimeValue & {
    id: string;
    title: string;
};
export type SchedulerProps = {
    events: ScheduleEvent[];
    onCreate: (event: Omit<ScheduleEvent, "id">) => void;
    onRemove?: (id: string) => void;
    initialDate?: string;
    timeZone?: string;
    label?: string;
};
export function Scheduler({ events, onCreate, onRemove, initialDate = "2026-01-01", timeZone = "UTC", label = "Schedule" }: SchedulerProps) {
    const [date, setDate] = useState(initialDate);
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [draft, setDraft] = useState<DateTimeValue>({ date, time: "09:00", timeZone });
    const valid = !!title.trim() && !!parseDate(draft.date) && validTime(draft.time) && validZone(draft.timeZone);
    const visible = events.filter(event => event.date === date).toSorted((a, b) => a.time.localeCompare(b.time));
    return <section className="art-pix-date-stack" aria-label={label}><Calendar value={date} onChange={setDate}/><Button onClick={() => { setDraft({ date, time: "09:00", timeZone }); setTitle(""); setOpen(true); }}>Add event</Button><h3>Events on {date}</h3>{visible.length ? <ul>{visible.map(event => <li key={event.id}><strong>{event.title}</strong> — {event.time} ({event.timeZone}) {onRemove && <Button variant="secondary" aria-label={`Remove ${event.title}`} onClick={() => onRemove(event.id)}>Remove</Button>}</li>)}</ul> : <p>No events scheduled.</p>}<Dialog open={open} onOpenChange={setOpen} title="New event"><form className="art-pix-date-stack" onSubmit={event => { event.preventDefault(); if (!valid)
        return; onCreate({ ...draft, title: title.trim() }); setOpen(false); }}><label>Event title<TextInput value={title} onChange={event => setTitle(event.target.value)} required/></label><DateTimePicker value={draft} onChange={setDraft}/><Button type="submit" disabled={!valid}>Add to schedule</Button></form></Dialog></section>;
}
