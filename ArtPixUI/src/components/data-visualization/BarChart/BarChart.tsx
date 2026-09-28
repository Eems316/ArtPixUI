import { Cartesian, type ValueChartProps } from "../_shared/Charts.js";
export type BarChartProps = ValueChartProps;
export function BarChart(props: BarChartProps) { return <Cartesian {...props} kind="bar"/>; }
