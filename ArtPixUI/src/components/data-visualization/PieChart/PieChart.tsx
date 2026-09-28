import { Circular, type ValueChartProps } from "../_shared/Charts.js";
export type PieChartProps = Omit<ValueChartProps, "color">;
export function PieChart(props: PieChartProps) { return <Circular {...props}/>; }
