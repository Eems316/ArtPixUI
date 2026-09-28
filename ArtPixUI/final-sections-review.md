# Final sections review: date/time, charts and decorative effects

Status: all **49 final components are implemented and awaiting review**, not user-approved. No dependencies were added. Sections 10 and 11 are committed locally at the user's request; section 12 is included in the user-requested final component commit and repository push. Section 11 also has a standalone [date/time review guide](date-time-review.md).

## Implementation order and visual plan

1. Strict private date-only/instant parsing and time formatting; display primitives, native inputs, calendar header/grid.
2. Calendar compositions, popup, ranges, date filter; clock-based countdown, monotonic stopwatch, controlled scheduler.
3. Chart domain/scale/tick helpers, responsive container/context, title, Axis, Grid, Legend, DataLabel, inspection strip and states.
4. Range indicators, Cartesian charts, pie/donut geometry and RadarChart using radial Axis/Grid extensions.
5. Static layered backgrounds and stripes.

The shared look is parchment with dark rounded outlines, monospaced details, green selection/marks and restrained amber/muted series colors. Calendars and plot frames have the established tactile base. No chart or calendar animation is introduced; overlays inherit existing behavior. Timers change numbers without repeatedly announcing every tick.

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

## Chart API and data rules

All ten charts require a `title`; optional `description` explains units/context. They share `loading`, explicit empty states and a full unrounded numeric table behind **View chart data**. Each mark is keyboard-focusable with its own label and inspection text. Data inspection is in a fixed parchment strip below the plot, not a floating pointer-only popup. Native SVG focus behavior still needs live assistive-technology review.

- BarChart / HorizontalBarChart: `data: { label, value }[]`, optional `color`, `showLabels`. Finite values only, signed/zero values, explicit zero baseline.
- StackedBarChart / LineChart / AreaChart: `labels: string[]`, `series: { id, label, color?, values: number[] }[]`. Unique stable series IDs are required. Values align by label index; excess values are ignored. Nonfinite/missing line/area values create gaps; missing stack segments are omitted. Positive and negative stacks accumulate separately; overflowed sums are omitted. Legend buttons own local visibility without mutating source data; the data table retains all original series.
- ScatterPlot / BubbleChart: `data: { label, x, y, size? }[]`, optional color/showLabels. Finite x/y required. Bubble size must be positive and finite; radius follows square-root relative size with a minimum visible radius.
- PieChart / DonutChart: `data: { label, value }[]`; only positive finite values become slices. Normalized sums avoid numeric overflow. A single positive datum renders a full circle. Optional showLabels displays numeric labels; DonutChart also accepts `centerLabel`. The palette/legend distinguishes slices; negative/zero values are excluded, not made into misleading sectors.
- RadarChart: the shared labels/series contract, at least three categories, complete nonnegative series. Uses a shared 0-to-maximum scale (minimum scale maximum 1), radial Grid/Axis, legend visibility, focusable vertices and full table. Invalid/incomplete series are not plotted.
- `showLabels` is intended for compact datasets; the table is the full-text/full-value fallback when marks or labels overlap. No aggregation, downsampling, time/log scales, stacked-area semantics or streaming backend is implied.
- Charts use a responsive 640×340 SVG viewBox. They do not observe container resize in JavaScript or import a charting library. Very dense datasets can overlap and should be summarized by the consumer.
- ChartContainer exposes width/height (minimum 320×200), xDomain/yDomain, linked title/description and footer; margin/scale context is private. Axis/Grid consume the context. Standalone primitives should be placed inside a ChartContainer (ChartTitle inside a figure).
- Axis accepts orientation, labels, label and numeric formatter; radial mode accepts center/radius and labels. Grid supports horizontal/vertical lines or radial center/radius/category count. DataLabel accepts x/y/value, anchor and formatter.
- Legend is static unless given `onToggle(id)`; controlled item `hidden` drives aria-pressed. ChartTooltip is a persistent inspection region. ChartEmptyState composes EmptyState; ChartLoadingState composes static SkeletonLoader with loading semantics.
- Meter/Gauge validate finite increasing min/max, clamp the visual range and retain original numeric text. TrendIndicator describes direction independently of favorable/unfavorable colors. Temperature explicitly labels C/F/K; it never converts units automatically.
- LayeredBackground accepts CSS background-image strings front-to-back, an optional scrim and native div props; decorations are hidden from accessibility and cannot intercept input. Stripes composes it with configurable color/background/stripeWidth/angle. DottedBackground provides the ContactCard-stage radial-dot treatment with configurable background, dot color, dot size and spacing. Consumers remain responsible for contrast with custom effects.

```tsx
<LineChart
  title="Trail distance"
  description="Distance in kilometres, by season"
  labels={["Spring", "Summer", "Autumn"]}
  series={[{ id: "forest", label: "Forest", values: [12, 24, 18] }]}
  showLabels
/>
<DonutChart title="Discoveries" centerLabel="100 total"
  data={[{ label: "Forest", value: 42 }, { label: "Coast", value: 58 }]} />
```

## Verification and remaining review

Automated verification:
- Typecheck/library production build and declaration generation.
- Playground production build; lint.
- `node scripts/check-final-sections.mjs`: all 50 export/SSR cases; strict parsing/leap/boundary dates, range errors, native semantics, calendar cells/tab stop, numeric domains/extreme scales, chart geometry output, data tables, loading/empty states and static interval-cleanup checks.
- Existing offline `scripts/check-*.mjs` regression suite.

SSR/source checks do **not** establish browser interaction correctness. Live review remains pending for calendar keyboard/focus navigation across disabled/boundary dates; native date/week/time pickers and touch; popup/dialog dismissal and focus return; real timer pause/resume/unmount and callback behavior; chart pointer/focus inspection and legend toggles; screen-reader output; and responsive visual fit. Browser tool access to this localhost preview was blocked earlier; no bypass or screenshots are claimed.

Local previews: [Date/time](http://127.0.0.1:5173/#timestamp-demo), [Chart foundations](http://127.0.0.1:5173/#chart-container-demo), [Charts](http://127.0.0.1:5173/#bar-chart-demo), [Decorations](http://127.0.0.1:5173/#layered-background-demo). Each component has its own anchor in task-list.md.

The catalog now has no unimplemented entries. All implementations and the prior TextBox removal still await user review. The previously requested TextInput → TextBox rename remains an explicit pending review change and was not folded into this batch.
