import { Circular, type ValueChartProps } from "../_shared/Charts.js";
export type DonutChartProps = Omit<ValueChartProps, "color"> & {
    centerLabel?: string;
};
export function DonutChart(props: DonutChartProps) { return <Circular {...props} donut/>; }
