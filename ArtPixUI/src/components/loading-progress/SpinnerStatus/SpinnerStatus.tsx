import type { ComponentPropsWithRef } from "react";
import "./SpinnerStatus.css";

export type SpinnerStatusProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  label?: string;
  size?: "small" | "medium" | "large";
};

/** Indeterminate status only; the caller controls when it is displayed. */
export function SpinnerStatus({ label = "Loading…", size = "medium", className, role = "status", "aria-live": live = "polite", "aria-atomic": atomic = true, ...props }: SpinnerStatusProps) {
  return <span {...props} role={role} aria-live={live} aria-atomic={atomic}
    className={["art-pix-spinner-status", `art-pix-spinner-status--${size}`, className].filter(Boolean).join(" ")}>
    <svg className="art-pix-spinner-status__spinner" viewBox="0 0 16 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <path d="M6 0h4v3H6z" />
      <path d="M11 2h3v3h-3z" opacity=".85" />
      <path d="M13 6h3v4h-3z" opacity=".7" />
      <path d="M11 11h3v3h-3z" opacity=".6" />
      <path d="M6 13h4v3H6z" opacity=".5" />
      <path d="M2 11h3v3H2z" opacity=".4" />
      <path d="M0 6h3v4H0z" opacity=".3" />
      <path d="M2 2h3v3H2z" opacity=".2" />
    </svg>
    <span className="art-pix-spinner-status__label">{label}</span>
  </span>;
}
