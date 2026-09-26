import type { ComponentPropsWithRef } from "react";
import "./PulseLoader.css";

export type PulseLoaderProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  label?: string;
  size?: "small" | "medium" | "large";
};

/** Indeterminate status; the caller owns visibility and completion. */
export function PulseLoader({ label = "Loading…", size = "medium", className, role = "status", "aria-live": live = "polite", "aria-atomic": atomic = true, ...props }: PulseLoaderProps) {
  return <span {...props} role={role} aria-live={live} aria-atomic={atomic}
    className={["art-pix-pulse-loader", `art-pix-pulse-loader--${size}`, className].filter(Boolean).join(" ")}>
    <span className="art-pix-pulse-loader__indicator" aria-hidden="true" />
    <span className="art-pix-pulse-loader__label">{label}</span>
  </span>;
}
