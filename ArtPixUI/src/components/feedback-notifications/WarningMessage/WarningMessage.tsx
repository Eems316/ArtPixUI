import { StatusMessage, type StatusMessageProps } from "../StatusMessage/StatusMessage.js";
import "./WarningMessage.css";

export type WarningMessageProps = Omit<StatusMessageProps, "severity">;
export function WarningMessage({ className, ...props }: WarningMessageProps) {
  return <StatusMessage {...props} severity="warning" className={["art-pix-warning-message", className].filter(Boolean).join(" ")} />;
}
