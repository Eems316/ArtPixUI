import { useId, type ReactNode } from "react";
import { ChartContext, defaultChart, type Domain } from "../_shared/chart.js";
import { ChartTitle } from "../ChartTitle/ChartTitle.js";
import "../_shared/chart.css";
export type ChartContainerProps = {
    title: string;
    description?: string;
    children: ReactNode;
    width?: number;
    height?: number;
    xDomain?: Domain;
    yDomain?: Domain;
    footer?: ReactNode;
};
export function ChartContainer({ title, description, children, width = 640, height = 340, xDomain = [0, 1], yDomain = [0, 1], footer }: ChartContainerProps) {
    const id = useId();
    const safe = (range: Domain): Domain => range.every(Number.isFinite) && range[1] > range[0] ? range : [0, 1];
    const context = { ...defaultChart, width: Number.isFinite(width) ? Math.max(320, width) : 640, height: Number.isFinite(height) ? Math.max(200, height) : 340, xDomain: safe(xDomain), yDomain: safe(yDomain) };
    return <figure className="art-pix-chart"><ChartTitle id={id} description={description}>{title}</ChartTitle><ChartContext.Provider value={context}><svg viewBox={`0 0 ${context.width} ${context.height}`} role="group" aria-labelledby={id} aria-describedby={description ? `${id}-description` : undefined}>{children}</svg></ChartContext.Provider>{footer}</figure>;
}
