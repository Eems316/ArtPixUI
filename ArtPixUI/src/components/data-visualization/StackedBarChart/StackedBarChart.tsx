import { Cartesian, type SeriesChartProps } from "../_shared/Charts.js";
export type StackedBarChartProps = SeriesChartProps;
export function StackedBarChart(props: StackedBarChartProps) { return <Cartesian {...props} kind="stacked"/>; }
