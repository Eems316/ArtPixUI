import type { ComponentPropsWithRef } from "react";
import "./ProgressBar.css";

export type ProgressBarProps = Omit<ComponentPropsWithRef<"div">, "children" | "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow"> & {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
};

/** Determinate progress only; the application supplies progress updates. */
export function ProgressBar({ value, max = 100, label = "Progress", showPercentage = false, className, "aria-label": ariaLabel, ...props }: ProgressBarProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isNaN(value) ? 0 : Math.min(safeMax, Math.max(0, value));
  const percentage = (safeValue / safeMax) * 100;

  return <div {...props} role="progressbar" aria-label={ariaLabel ?? label}
    aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={safeValue}
    className={["art-pix-progress-bar", className].filter(Boolean).join(" ")}>
    <div className="art-pix-progress-bar__heading" aria-hidden="true">
      <span>{label}</span>
      {showPercentage && <span className="art-pix-progress-bar__percentage">{Math.round(percentage)}%</span>}
    </div>
    <div className="art-pix-progress-bar__track" aria-hidden="true">
      <div className="art-pix-progress-bar__fill" style={{ width: `${percentage}%` }} />
    </div>
  </div>;
}
