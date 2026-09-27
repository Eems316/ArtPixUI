import { StatusMessage, type StatusMessageProps } from "../StatusMessage/StatusMessage.js";
import "./InfoMessage.css";

export type InfoMessageProps = Omit<StatusMessageProps, "severity">;
export function InfoMessage({ className, ...props }: InfoMessageProps) {
  return <StatusMessage {...props} severity="info" className={["art-pix-info-message", className].filter(Boolean).join(" ")} />;
}
