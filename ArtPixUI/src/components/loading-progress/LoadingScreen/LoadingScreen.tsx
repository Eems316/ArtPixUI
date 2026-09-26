import type { ComponentPropsWithRef } from "react";
import { SpinnerStatus } from "../SpinnerStatus/SpinnerStatus.js";
import "./LoadingScreen.css";

export type LoadingScreenProps = ComponentPropsWithRef<"div"> & {
  label?: string;
};

/** In-flow loading view; the caller replaces it with page content when ready. */
export function LoadingScreen({ label = "Loading…", children, className, ...props }: LoadingScreenProps) {
  return <div {...props} className={["art-pix-loading-screen", className].filter(Boolean).join(" ")}>
    <div className="art-pix-loading-screen__body">
      <SpinnerStatus size="large" label={label} className="art-pix-loading-screen__status" />
      {children != null && <div className="art-pix-loading-screen__content">{children}</div>}
    </div>
  </div>;
}
