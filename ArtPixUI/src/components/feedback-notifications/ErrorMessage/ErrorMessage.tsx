import { StatusMessage, type StatusMessageProps } from "../StatusMessage/StatusMessage.js";
import "./ErrorMessage.css";

export type ErrorMessageProps = Omit<StatusMessageProps, "severity">;
export function ErrorMessage({ className, ...props }: ErrorMessageProps) {
  return <StatusMessage {...props} severity="error" className={["art-pix-error-message", className].filter(Boolean).join(" ")} />;
}
