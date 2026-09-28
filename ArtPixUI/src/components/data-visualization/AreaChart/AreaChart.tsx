import { Cartesian, type SeriesChartProps } from "../_shared/Charts.js";
export type AreaChartProps = SeriesChartProps;
export function AreaChart(props: AreaChartProps) { return <Cartesian {...props} kind="area"/>; }
