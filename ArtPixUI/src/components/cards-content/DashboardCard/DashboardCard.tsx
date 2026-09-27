import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import { SkeletonLoader } from "../../loading-progress/SkeletonLoader/SkeletonLoader.js";
import type { ReactNode } from "react";
export type DashboardCardProps = CardContentProps & { state?: "ready" | "loading" | "empty"; loadingLabel?: string; loadingContent?: ReactNode; emptyContent?: ReactNode };
export function DashboardCard({ state = "ready", loadingLabel = "Loading data…", loadingContent, emptyContent = "No data to display yet.", children, actions, className = "", ...props }: DashboardCardProps) {
  return <CardFrame {...props} actions={state === "loading" ? undefined : actions} className={`art-pix-dashboard-card ${className}`}>
    <div role="status" aria-live="polite" aria-atomic="true">{state === "loading" ? loadingLabel : null}</div>
    <div aria-busy={state === "loading"}>{state === "loading" ? <div className="art-pix-dashboard-card__placeholder">{loadingContent ?? <><SkeletonLoader shape="text" width="60%" /><SkeletonLoader height={100} /></>}</div> : state === "empty" ? <div className="art-pix-dashboard-card__placeholder">{emptyContent}</div> : children}</div>
  </CardFrame>;
}
