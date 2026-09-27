import { StatusMessage, type StatusMessageProps } from "../StatusMessage/StatusMessage.js";
import "./ValidationMessage.css";

export type ValidationMessageProps = Omit<StatusMessageProps, "severity" | "id"> & {
  /** Reference this id in the input's aria-describedby. */
  id: string;
  state?: "error" | "success" | "warning" | "info";
};
export function ValidationMessage({ id, state = "error", announcement = "polite", children, className, ...props }: ValidationMessageProps) {
  return <StatusMessage {...props} id={id} severity={state} announcement={announcement}
    className={["art-pix-validation-message", className].filter(Boolean).join(" ")}>{children}</StatusMessage>;
}
