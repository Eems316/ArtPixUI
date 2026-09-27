import { Calendar, type CalendarProps } from "../Calendar/Calendar.js";
export type InlineCalendarProps = CalendarProps;
export function InlineCalendar(props: InlineCalendarProps) { return <Calendar {...props}/>; }
