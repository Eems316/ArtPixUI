import type { ComponentPropsWithRef } from "react";
import { ProgressBar } from "../ProgressBar/ProgressBar.js";
import { IndeterminateProgressBar } from "../IndeterminateProgressBar/IndeterminateProgressBar.js";
import { formatBytes } from "../_shared/formatBytes.js";
import "./DownloadProgress.css";

export type DownloadProgressProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  fileName: string;
  downloadedBytes: number;
  totalBytes: number;
};

/** Displays caller-supplied counts; never downloads, saves or validates a file. */
export function DownloadProgress({ fileName, downloadedBytes, totalBytes, className, "aria-label": ariaLabel, "aria-labelledby": labelledBy, ...props }: DownloadProgressProps) {
  const total = Number.isFinite(totalBytes) && totalBytes >= 1 ? Math.floor(totalBytes) : 0;
  const downloaded = Number.isFinite(downloadedBytes) ? Math.max(0, Math.floor(downloadedBytes)) : 0;
  const value = total > 0 ? Math.min(downloaded, total) : downloaded;
  const label = fileName || "File download";
  const counts = total > 0 ? `${formatBytes(value)} / ${formatBytes(total)}` : `${formatBytes(value)} downloaded · total unavailable`;
  return <div {...props} className={["art-pix-download-progress", className].filter(Boolean).join(" ")}>
    {total > 0
      ? <ProgressBar label={label} aria-label={ariaLabel ?? `Download ${label}`} aria-labelledby={labelledBy}
          value={value} max={total} showPercentage aria-valuetext={`${Math.round(value / total * 100)}%, ${counts} downloaded`} />
      : <IndeterminateProgressBar label={label} aria-label={ariaLabel ?? `Download ${label}`} aria-labelledby={labelledBy} />}
    <span className="art-pix-download-progress__counts">{counts}</span>
  </div>;
}
