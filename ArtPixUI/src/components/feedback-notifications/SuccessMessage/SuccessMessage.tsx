import { StatusMessage, type StatusMessageProps } from "../StatusMessage/StatusMessage.js";
import "./SuccessMessage.css";

export type SuccessMessageProps = Omit<StatusMessageProps, "severity">;
export function SuccessMessage({ className, ...props }: SuccessMessageProps) {
  return <StatusMessage {...props} severity="success" className={["art-pix-success-message", className].filter(Boolean).join(" ")} />;
}
