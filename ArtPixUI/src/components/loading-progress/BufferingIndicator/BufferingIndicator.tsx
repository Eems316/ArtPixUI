import { SpinnerStatus, type SpinnerStatusProps } from "../SpinnerStatus/SpinnerStatus.js";
import "./BufferingIndicator.css";

export type BufferingIndicatorProps = SpinnerStatusProps & {
  buffering?: boolean;
};

/** Display-only media status; the caller owns buffering state and playback. */
export function BufferingIndicator({ buffering = true, label = "Buffering…", className, ...props }: BufferingIndicatorProps) {
  if (!buffering) return null;
  return <SpinnerStatus {...props} label={label}
    className={["art-pix-buffering-indicator", className].filter(Boolean).join(" ")} />;
}
