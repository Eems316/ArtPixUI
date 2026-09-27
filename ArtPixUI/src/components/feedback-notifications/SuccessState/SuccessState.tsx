import { StateSurface, type StateSurfaceProps } from "../_shared/StateSurface.js";
import "./SuccessState.css";
export type SuccessStateProps = StateSurfaceProps;
export function SuccessState({ className, ...props }: SuccessStateProps) {
  return <StateSurface {...props} kind="success" className={["art-pix-success-state", className].filter(Boolean).join(" ")} />;
}
