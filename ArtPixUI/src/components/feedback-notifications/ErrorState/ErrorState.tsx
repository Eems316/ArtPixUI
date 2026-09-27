import { StateSurface, type StateSurfaceProps } from "../_shared/StateSurface.js";
import "./ErrorState.css";
export type ErrorStateProps = StateSurfaceProps;
export function ErrorState({ className, ...props }: ErrorStateProps) {
  return <StateSurface {...props} kind="error" className={["art-pix-error-state", className].filter(Boolean).join(" ")} />;
}
