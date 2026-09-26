import type { ComponentPropsWithRef } from "react";
import "./DotsLoader.css";

export type DotsLoaderProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  label?: string;
  size?: "small" | "medium" | "large";
};

/** Indeterminate status; visibility and completion are owned by the caller. */
export function DotsLoader({ label = "Loading…", size = "medium", className, role = "status", "aria-live": live = "polite", "aria-atomic": atomic = true, ...props }: DotsLoaderProps) {
  return <span {...props} role={role} aria-live={live} aria-atomic={atomic}
    className={["art-pix-dots-loader", `art-pix-dots-loader--${size}`, className].filter(Boolean).join(" ")}>
    <span className="art-pix-dots-loader__dots" aria-hidden="true">
      <span className="art-pix-dots-loader__dot" />
      <span className="art-pix-dots-loader__dot" />
      <span className="art-pix-dots-loader__dot" />
    </span>
    <span className="art-pix-dots-loader__label">{label}</span>
  </span>;
}
