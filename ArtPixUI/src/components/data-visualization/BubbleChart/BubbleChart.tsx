import { Cartesian, type PointChartProps } from "../_shared/Charts.js";
export type BubbleChartProps = PointChartProps;
export function BubbleChart(props: BubbleChartProps) { return <Cartesian {...props} kind="bubble"/>; }
