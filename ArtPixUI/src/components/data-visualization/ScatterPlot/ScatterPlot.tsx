import { Cartesian, type PointChartProps } from "../_shared/Charts.js";
export type ScatterPlotProps = PointChartProps;
export function ScatterPlot(props: ScatterPlotProps) { return <Cartesian {...props} kind="scatter"/>; }
