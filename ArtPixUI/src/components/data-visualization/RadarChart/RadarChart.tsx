import { Radar, type SeriesChartProps } from "../_shared/Charts.js";
export type RadarChartProps = SeriesChartProps;
export function RadarChart(props: RadarChartProps) { return <Radar {...props}/>; }
