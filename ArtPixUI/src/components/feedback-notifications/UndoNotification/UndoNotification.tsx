import { useRef, useState } from "react";
import { Toast, type ToastProps, type ToastDismissReason } from "../Toast/Toast.js";
import { Button } from "../../buttons-actions/Button/Button.js";
import "./UndoNotification.css";
export type UndoNotificationProps = Omit<ToastProps, "action" | "onDismiss"> & {
  onUndo: () => void;
  onExpire?: () => void;
  onDismiss: (reason: ToastDismissReason | "undo") => void;
  undoLabel?: string;
};
export function UndoNotification({ open, ...props }: UndoNotificationProps) {
  return open ? <UndoSession {...props} /> : null;
}
function UndoSession({ onUndo, onExpire, onDismiss, undoLabel = "Undo", duration = 10000, className, ...props }: Omit<UndoNotificationProps, "open">) {
  const consumed = useRef(false);
  const [unavailable, setUnavailable] = useState(false);
  return <Toast {...props} open duration={duration} className={["art-pix-undo-notification", className].filter(Boolean).join(" ")}
    onDismiss={reason => {
      if (consumed.current) return;
      consumed.current = true; setUnavailable(true);
      if (reason === "timeout") onExpire?.();
      onDismiss(reason);
    }}
    action={<Button disabled={unavailable} onClick={() => {
      if (consumed.current) return;
      consumed.current = true; setUnavailable(true);
      onUndo();
      onDismiss("undo");
    }}>{undoLabel}</Button>} />;
}
