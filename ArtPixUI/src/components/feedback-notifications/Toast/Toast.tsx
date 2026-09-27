import { useEffect, useImperativeHandle, useRef } from "react";
import { NotificationSurface, type NotificationSurfaceProps } from "../_shared/NotificationSurface.js";
import { useDismissTimer } from "../_shared/useDismissTimer.js";
import "./Toast.css";

export type ToastDismissReason = "timeout" | "dismiss" | "escape";
export type ToastProps = Omit<NotificationSurfaceProps, "onDismiss"> & {
  open: boolean;
  onDismiss: (reason: ToastDismissReason) => void;
  /** Milliseconds; defaults to 5000 without an action, 0 (persistent) with one. */
  duration?: number;
};
export function Toast({ open, ...props }: ToastProps) {
  return open ? <ToastSession {...props} /> : null;
}
function ToastSession({ onDismiss, duration, action, className, ref, onMouseEnter, onMouseLeave, onFocus, onBlur, onKeyDown, ...props }: Omit<ToastProps, "open">) {
  const root = useRef<HTMLDivElement>(null);
  const previous = useRef<HTMLElement | null>(null);
  const requested = useRef(false);
  useImperativeHandle(ref, () => root.current!, []);
  useEffect(() => {
    const active = root.current?.ownerDocument.activeElement;
    previous.current = active instanceof HTMLElement && !root.current?.contains(active) ? active : null;
  }, []);
  const dismiss = (reason: ToastDismissReason) => {
    if (requested.current) return;
    requested.current = true;
    if (root.current?.contains(root.current.ownerDocument.activeElement) && previous.current?.isConnected) previous.current.focus();
    onDismiss(reason);
  };
  const timer = useDismissTimer(duration ?? (action != null ? 0 : 5000), () => dismiss("timeout"));
  return <div ref={root} className={["art-pix-toast", className].filter(Boolean).join(" ")}
    onMouseEnter={event => { timer.pause("hover"); onMouseEnter?.(event); }}
    onMouseLeave={event => { timer.resume("hover"); onMouseLeave?.(event); }}
    onFocus={event => { timer.pause("focus"); onFocus?.(event); }}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) timer.resume("focus"); onBlur?.(event); }}
    onKeyDown={event => { onKeyDown?.(event); if (!event.defaultPrevented && event.key === "Escape") { event.stopPropagation(); event.preventDefault(); timer.cancel(); dismiss("escape"); } }}>
    <NotificationSurface {...props} action={action} onDismiss={() => { timer.cancel(); dismiss("dismiss"); }} />
  </div>;
}
