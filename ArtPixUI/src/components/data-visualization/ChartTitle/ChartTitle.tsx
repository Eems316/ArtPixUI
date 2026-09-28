import type { ReactNode } from "react";
export type ChartTitleProps = {
    id?: string;
    children: ReactNode;
    description?: string;
};
export function ChartTitle({ id, children, description }: ChartTitleProps) { return <figcaption><h3 className="art-pix-chart-title" id={id}>{children}</h3>{description && <p id={id ? `${id}-description` : undefined}>{description}</p>}</figcaption>; }
