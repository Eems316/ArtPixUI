import { NotificationSurface, type NotificationSurfaceProps } from "../_shared/NotificationSurface.js";
import { ProgressBar } from "../../loading-progress/ProgressBar/ProgressBar.js";
import { IndeterminateProgressBar } from "../../loading-progress/IndeterminateProgressBar/IndeterminateProgressBar.js";
import "./ProgressNotification.css";
export type ProgressNotificationProps = NotificationSurfaceProps & {
  open?: boolean;
  value?: number;
  max?: number;
  progressLabel?: string;
};
export function ProgressNotification({ open = true, value, max = 100, progressLabel = "Progress", children, announcement = "off", className, ...props }: ProgressNotificationProps) {
  if (!open) return null;
  return <div className={["art-pix-progress-notification", className].filter(Boolean).join(" ")}>
    <NotificationSurface {...props} announcement={announcement}>{children}</NotificationSurface>
    {value === undefined ? <IndeterminateProgressBar label={progressLabel} /> : <ProgressBar label={progressLabel} value={value} max={max} showPercentage />}
  </div>;
}
