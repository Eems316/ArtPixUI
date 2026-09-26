import type { ComponentPropsWithRef } from "react";
import "../ProgressBar/ProgressBar.css";
import "./IndeterminateProgressBar.css";

export type IndeterminateProgressBarProps = Omit<ComponentPropsWithRef<"div">, "children" | "role" | "aria-valuemin" | "aria-valuemax" | "aria-valuenow" | "aria-valuetext"> & {
  label?: string;
};

/** Unknown completion progress; the application controls when it is shown. */
export function IndeterminateProgressBar({ label = "Loading…", className, "aria-label": ariaLabel, ...props }: IndeterminateProgressBarProps) {
  return <div {...props} role="progressbar" aria-label={ariaLabel ?? label}
    aria-valuemin={undefined} aria-valuemax={undefined} aria-valuenow={undefined} aria-valuetext={undefined}
    className={["art-pix-progress-bar", "art-pix-indeterminate-progress-bar", className].filter(Boolean).join(" ")}>
    <div className="art-pix-progress-bar__heading" aria-hidden="true"><span>{label}</span></div>
    <div className="art-pix-progress-bar__track" aria-hidden="true">
      <div className="art-pix-progress-bar__fill art-pix-indeterminate-progress-bar__segment" />
    </div>
  </div>;
}
