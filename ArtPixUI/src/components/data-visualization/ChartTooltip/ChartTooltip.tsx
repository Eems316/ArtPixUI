import type { ReactNode } from "react";
import "../_shared/chart.css";
export type ChartTooltipProps = {
    children?: ReactNode;
    id?: string;
};
/** Persistent inspection region below the plot, shared by hover and keyboard focus. */
export function ChartTooltip({ children, id }: ChartTooltipProps) { return <div id={id} className="art-pix-chart-tooltip">{children ?? "Hover or focus a mark to inspect its value. Full values are also in the data table."}</div>; }
