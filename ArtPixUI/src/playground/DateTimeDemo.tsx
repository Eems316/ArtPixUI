import { useState, type ReactNode } from "react";
import { Timestamp, DateBadge, DateInput, TimeInput, DurationInput, TimezoneSelector, CalendarHeader, CalendarGrid, Calendar, InlineCalendar, MonthPicker, YearPicker, WeekPicker, TimePicker, DatePicker, DatePickerPopup, CalendarRange, DateRangePicker, TimeRangePicker, DateTimePicker, DateFilter, Countdown, Timer, Scheduler, Button, type DateTimeValue, type ScheduleEvent } from "../index.js";
function Exhibit({ id, name, number, children }: {
    id: string;
    name: string;
    number: number;
    children: ReactNode;
}) { return <section className="playground-exhibit" id={`${id}-demo`} aria-labelledby={`${id}-heading`}><div className="playground-exhibit-heading"><span className="playground-number">{number}</span><h2 id={`${id}-heading`}>{name}</h2><span className="playground-kind">AWAITING REVIEW</span></div><div style={{ display: "grid", gap: 24, padding: 28, minWidth: 0 }}>{children}</div></section>; }
export function DateTimeDemo() {
    const [date, setDate] = useState("2026-09-27"), [time, setTime] = useState("09:30"), [duration, setDuration] = useState(1800), [zone, setZone] = useState("UTC"), [month, setMonth] = useState("2026-09"), [year, setYear] = useState(2026), [week, setWeek] = useState("2026-W39");
    const [range, setRange] = useState({ start: "2026-09-24", end: "2026-09-28" }), [timeRange, setTimeRange] = useState({ start: "09:00", end: "17:00" }), [dateTime, setDateTime] = useState<DateTimeValue>({ date: "2026-09-27", time: "09:30", timeZone: "UTC" });
    const [events, setEvents] = useState<ScheduleEvent[]>([{ id: "welcome", title: "Plan the trail", date: "2026-09-27", time: "09:30", timeZone: "UTC" }]);
    const [target, setTarget] = useState<number | null>(null);
    const [finished, setFinished] = useState(false);
    return <>
 <Exhibit id="timestamp" name="An exact moment" number={137}><Timestamp value="2026-09-27T13:30:00Z"/><Timestamp value="2026-09-27T13:30:00Z" timeZone="America/New_York"/><Timestamp value="invalid"/><p>Instants require an explicit offset. Default display timezone is UTC.</p></Exhibit>
 <Exhibit id="date-badge" name="A date worth remembering" number={138}><DateBadge value={date}/></Exhibit>
 <Exhibit id="date-input" name="Write the date" number={139}><DateInput label="Visit date" value={date} onChange={setDate}/><DateInput label="Unavailable date field" value="" onChange={() => { }} disabled/></Exhibit>
 <Exhibit id="time-input" name="Choose the time" number={140}><TimeInput label="Departure time" value={time} onChange={setTime}/></Exhibit>
 <Exhibit id="duration-input" name="How long?" number={141}><DurationInput value={duration} onChange={setDuration}/><output>{duration} seconds</output></Exhibit>
 <Exhibit id="timezone-selector" name="A place in time" number={142}><TimezoneSelector value={zone} onChange={setZone}/></Exhibit>
 <Exhibit id="calendar-header" name="Month by month" number={143}><CalendarHeader month={month} onMonthChange={setMonth}/></Exhibit>
 <Exhibit id="calendar-grid" name="Days on the map" number={144}><div className="art-pix-calendar"><CalendarGrid month={month} onMonthChange={setMonth} value={date} onChange={setDate} isDateDisabled={day => day.endsWith("-13")}/></div><p>Arrow keys move between dates; Home/End move within a week; Page Up/Down change month. The 13th is unavailable.</p></Exhibit>
 <Exhibit id="calendar" name="Plan your month" number={145}><Calendar value={date} onChange={setDate}/></Exhibit>
 <Exhibit id="inline-calendar" name="Always within reach" number={146}><InlineCalendar value={date} onChange={setDate} weekStartsOn={0}/></Exhibit>
 <Exhibit id="month-picker" name="Pick a month" number={147}><MonthPicker value={month} onChange={setMonth}/></Exhibit>
 <Exhibit id="year-picker" name="A year ahead" number={148}><YearPicker value={year} onChange={setYear}/></Exhibit>
 <Exhibit id="week-picker" name="One week at a time" number={149}><WeekPicker value={week} onChange={setWeek}/></Exhibit>
 <Exhibit id="time-picker" name="Set your departure" number={150}><TimePicker label="Departure" value={time} onChange={setTime}/></Exhibit>
 <Exhibit id="date-picker" name="A date for adventure" number={151}><DatePicker value={date} onChange={setDate}/></Exhibit>
 <Exhibit id="date-picker-popup" name="A calendar when needed" number={152}><DatePickerPopup value={date} onChange={setDate}/></Exhibit>
 <Exhibit id="calendar-range" name="From here to there" number={153}><CalendarRange value={range} onChange={setRange}/></Exhibit>
 <Exhibit id="date-range-picker" name="Start and finish" number={154}><DateRangePicker value={range} onChange={setRange}/></Exhibit>
 <Exhibit id="time-range-picker" name="Hours on the trail" number={155}><TimeRangePicker value={timeRange} onChange={setTimeRange}/></Exhibit>
 <Exhibit id="date-time-picker" name="When and where" number={156}><DateTimePicker value={dateTime} onChange={setDateTime}/></Exhibit>
 <Exhibit id="date-filter" name="Narrow the dates" number={157}><DateFilter value={range} onChange={setRange}/><p>Controlled filter: {range.start || "Any start"} – {range.end || "Any end"}</p></Exhibit>
 <Exhibit id="countdown" name="A moment approaching" number={158}><Button onClick={() => { setFinished(false); setTarget(Date.now() + 10000); }}>Start a ten-second countdown</Button>{target !== null && <Countdown target={target} onComplete={() => setFinished(true)}/>}<p role="status">{finished ? "Countdown complete." : "Start when ready."}</p></Exhibit>
 <Exhibit id="timer" name="Time on the trail" number={159}><Timer /></Exhibit>
 <Exhibit id="scheduler" name="Your next adventures" number={160}><Scheduler events={events} initialDate="2026-09-27" onCreate={event => setEvents(list => [...list, { ...event, id: crypto.randomUUID() }])} onRemove={id => setEvents(list => list.filter(event => event.id !== id))}/><p>Local demo only; reload resets events. Dates remain in each event’s named timezone, not converted to one viewer timezone.</p></Exhibit>
 </>;
}
