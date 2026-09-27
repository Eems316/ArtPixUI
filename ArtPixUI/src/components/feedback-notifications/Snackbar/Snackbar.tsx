import { Toast, type ToastProps } from "../Toast/Toast.js";
import "./Snackbar.css";
export type SnackbarProps = ToastProps;
export function Snackbar({ className, ...props }: SnackbarProps) {
  return <Toast {...props} className={["art-pix-snackbar", className].filter(Boolean).join(" ")} />;
}
