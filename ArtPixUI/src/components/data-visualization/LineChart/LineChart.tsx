import { Cartesian, type SeriesChartProps } from "../_shared/Charts.js";
export type LineChartProps = SeriesChartProps;
export function LineChart(props: LineChartProps) { return <Cartesian {...props} kind="line"/>; }
