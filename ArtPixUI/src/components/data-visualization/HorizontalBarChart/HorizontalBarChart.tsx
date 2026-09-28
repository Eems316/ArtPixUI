import { Cartesian, type ValueChartProps } from "../_shared/Charts.js";
export type HorizontalBarChartProps = ValueChartProps;
export function HorizontalBarChart(props: HorizontalBarChartProps) { return <Cartesian {...props} kind="horizontal"/>; }
