import type { ComponentPropsWithRef } from "react";
import "./CircularProgress.css";

export type CircularProgressProps = Omit<ComponentPropsWithRef<"div">, "children" | "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow"> & {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: "small" | "medium" | "large";
};

/** Determinate progress, starting at twelve o'clock and filling clockwise. */
export function CircularProgress({ value, max = 100, label = "Progress", showPercentage = false, size = "medium", className, "aria-label": ariaLabel, ...props }: CircularProgressProps) {
  const safeMax = Number.isFinite(max) && max > 0 ? max : 100;
  const safeValue = Number.isNaN(value) ? 0 : Math.min(safeMax, Math.max(0, value));
  const percentage = safeValue / safeMax * 100;

  return <div {...props} role="progressbar" aria-label={ariaLabel ?? label}
    aria-valuemin={0} aria-valuemax={safeMax} aria-valuenow={safeValue}
    className={["art-pix-circular-progress", `art-pix-circular-progress--${size}`, className].filter(Boolean).join(" ")}>
    <div className="art-pix-circular-progress__dial" aria-hidden="true">
      <svg viewBox="0 0 100 100" focusable="false">
        <circle className="art-pix-circular-progress__outline" cx="50" cy="50" r="40" />
        <circle className="art-pix-circular-progress__track" cx="50" cy="50" r="40" />
        <circle className="art-pix-circular-progress__fill" cx="50" cy="50" r="40" pathLength="100"
          strokeDasharray="100 100" strokeDashoffset={100 - percentage} transform="rotate(-90 50 50)" />
      </svg>
      {showPercentage && <span className="art-pix-circular-progress__percentage">{Math.round(percentage)}%</span>}
    </div>
    <span className="art-pix-circular-progress__label" aria-hidden="true">{label}</span>
  </div>;
}
