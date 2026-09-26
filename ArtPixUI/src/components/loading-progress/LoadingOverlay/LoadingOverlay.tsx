import type { ComponentPropsWithRef } from "react";
import { SpinnerStatus } from "../SpinnerStatus/SpinnerStatus.js";
import "./LoadingOverlay.css";

export type LoadingOverlayProps = ComponentPropsWithRef<"div"> & {
  loading?: boolean;
  label?: string;
};

/** Local loading region. Children remain mounted but are inert while busy. */
export function LoadingOverlay({ loading = false, label = "Loading…", children, className, ...props }: LoadingOverlayProps) {
  return <div {...props} className={["art-pix-loading-overlay", className].filter(Boolean).join(" ")}>
    <div className="art-pix-loading-overlay__content" aria-busy={loading} inert={loading}>
      {children}
    </div>
    <div className="art-pix-loading-overlay__status" role="status" aria-live="polite" aria-atomic="true" data-loading={loading ? "true" : undefined}>
      {loading && <SpinnerStatus label={label} role="presentation" aria-live="off" className="art-pix-loading-overlay__indicator" />}
    </div>
  </div>;
}
