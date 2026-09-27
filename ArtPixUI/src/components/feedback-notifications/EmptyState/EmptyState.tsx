import { StateSurface, type StateSurfaceProps } from "../_shared/StateSurface.js";
import "./EmptyState.css";
export type EmptyStateProps = StateSurfaceProps;
export function EmptyState({ className, ...props }: EmptyStateProps) {
  return <StateSurface {...props} kind="empty" className={["art-pix-empty-state", className].filter(Boolean).join(" ")} />;
}
