import type { ComponentPropsWithRef } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar.js";
import { IndeterminateProgressBar } from "../IndeterminateProgressBar/IndeterminateProgressBar.js";
import "./UploadProgress.css";
import { formatBytes } from "../_shared/formatBytes.js";

export type UploadProgressProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  fileName: string;
  uploadedBytes: number;
  totalBytes: number;
};

/** Displays caller-supplied byte counts; never uploads files or confirms server success. */
export function UploadProgress({ fileName, uploadedBytes, totalBytes, className, "aria-label": ariaLabel, "aria-labelledby": labelledBy, ...props }: UploadProgressProps) {
  const total = Number.isFinite(totalBytes) && totalBytes >= 1 ? Math.floor(totalBytes) : 0;
  const uploaded = Number.isFinite(uploadedBytes) ? Math.max(0, Math.floor(uploadedBytes)) : 0;
  const value = total > 0 ? Math.min(uploaded, total) : uploaded;
  const label = fileName || "File upload";
  const counts = total > 0 ? `${formatBytes(value)} / ${formatBytes(total)}` : `${formatBytes(value)} uploaded · total unavailable`;
  return <div {...props} className={["art-pix-upload-progress", className].filter(Boolean).join(" ")}>
    {total > 0
      ? <ProgressBar label={label} aria-label={ariaLabel ?? `Upload ${label}`} aria-labelledby={labelledBy}
          value={value} max={total} showPercentage aria-valuetext={`${Math.round(value / total * 100)}%, ${counts} uploaded`} />
      : <IndeterminateProgressBar label={label} aria-label={ariaLabel ?? `Upload ${label}`} aria-labelledby={labelledBy} />}
    <span className="art-pix-upload-progress__counts">{counts}</span>
  </div>;
}
