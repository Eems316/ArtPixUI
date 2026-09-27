# Date and time — awaiting review

Section 11 contains 24 implemented components marked `[-]`, with no new dependencies. This section is committed locally; no push was requested. Live review remains pending.

## Date/time API and conventions

- Date-only values are strict Gregorian `YYYY-MM-DD`, years 0001–9999. Private arithmetic uses UTC fields so local timezone/DST does not shift a calendar day. Month values use `YYYY-MM`; weeks use native ISO `YYYY-Www` (Monday-based).
- `DateInput`/`TimeInput` are controlled native inputs with `label`, `value`, `onChange(value)`, plus native input/ARIA attributes. TimeInput/TimePicker use HH:mm and one-minute precision. Native picker appearance and fallback behavior vary by browser. CSS requests the existing steady caret; unsupported browsers keep their native visible caret.
- `Timestamp` requires an offset-qualified ISO instant string, epoch milliseconds, or Date. Defaults: en-US locale and UTC timezone. Invalid input/locale/timezone produces fallback text. Options override formatting defaults rather than mixing incompatible dateStyle and individual fields.
- `DateBadge` accepts date-only `value` and optional locale; its localized accessible name is independent of the compact visual digits.
- `DurationInput` stores nonnegative seconds; `unit="seconds" | "minutes" | "hours"` selects display/edit units. Invalid, blank or nonfinite edits do not emit a new number. YearPicker similarly emits valid bounded integers only.
- `TimezoneSelector` accepts `zones?`; its short default list is intentionally not a complete IANA zone catalog. The current valid zone is included. Validity follows the browser's Intl timezone database.
- CalendarHeader takes `month/onMonthChange`. CalendarGrid adds `value/onChange`, `min/max`, `disabled`, `isDateDisabled(date)`, `weekStartsOn={0|1}` and optional `range`. The grid contains six weeks, muted neighboring-month dates and a single day tab stop. Unsupported boundary cells are blank/disabled.
- Arrow keys move by day/week and skip disabled dates (bounded search); Home/End target the current week's endpoints; Page Up/Down target the neighboring month's first day. Disabled targets are not selected. Month navigation buttons remain a fallback when a keyboard target is unavailable.
- Calendar owns its displayed month unless `month/onMonthChange` are supplied. External selected-value changes reveal that month. Empty initial selection uses deterministic `defaultMonth="2026-01"`, avoiding server/client timezone differences; applications should supply their desired starting month.
- DatePicker combines DateInput and Calendar; DatePickerPopup composes the existing Popover, leaves selection open until Done/dismissal and returns focus to its trigger. InlineCalendar is the non-popup Calendar variant.
- Range values are `{ start, end }`. CalendarRange selects inclusive endpoints, orders a reverse second selection, and starts over on the next click. Disabled-date restrictions apply to endpoints, not every intervening day. DateRangePicker adds editable fields, intersected min/max endpoint bounds and reversed-range feedback. Native input constraints remain the source of browser constraint-validation behavior.
- TimeRangePicker rejects reversed same-day ranges unless `allowOvernight` is true. Equal times mean zero duration, not a full day.
- DateTimePicker uses `{ date, time, timeZone }`: **zoned wall time, not an instant**. Changing timezone preserves entered wall time. The consumer must resolve daylight-saving gaps/overlaps before converting/persisting an instant. This UI does not guess DST offsets.
- DateFilter emits the same inclusive range for application-owned filtering; clearing emits empty bounds. It does not fetch data or apply filtering itself.
- Countdown takes `target`, `label?`, `onComplete?`. It starts after mounting, measures against Date.now rather than subtracting ticks, shows a stable SSR placeholder, fires completion once per target and clears its interval at completion/unmount. Timer starts only on user action, measures elapsed monotonic time and supports pause/resume/reset.
- Scheduler takes controlled `events: ScheduleEvent[]`, `onCreate(eventWithoutId)`, optional `onRemove(id)`, `initialDate` and default `timeZone`. Events have unique IDs, title and DateTimeValue fields. Agenda grouping is by the event's stored wall-date, not conversion into a viewer timezone. The create dialog validates title/date/time/zone. The consumer assigns IDs and persists data; no remote requests, reminders, recurrence, drag scheduling or DST conversion are implied.

```tsx
const [date, setDate] = useState("2026-09-27");
<DatePicker value={date} onChange={setDate} />
<DatePickerPopup value={date} onChange={setDate} label="Visit" />
const [window, setWindow] = useState({ start: "", end: "" });
<DateFilter value={window} onChange={setWindow} />
```

## Verification and review

Run `node scripts/check-date-time.mjs` after the library build. This checks all 24 exports/SSR cases, strict parsing and date boundaries, ranges, native semantics, calendar tab stops, and static timer cleanup. Library and playground builds and lint pass. These checks do not replace live browser testing of native pickers, calendar navigation, popup/dialog focus, timer lifecycle, or assistive technology.

[Preview](http://127.0.0.1:5173/#timestamp-demo). Full per-component design and preview links are in task-list.md.
