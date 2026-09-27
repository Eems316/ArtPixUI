import { useEffect, useId, useRef, type ReactNode } from "react";
import "./overlay.css";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  children?: ReactNode;
  description?: string;
  closeLabel?: string;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  role?: "dialog" | "alertdialog";
  /** CSS selector within the dialog; otherwise the first control receives focus. */
  initialFocus?: string;
};
let locks = 0;
let oldOverflow = "";
export function DialogCore({ open, onOpenChange, title, children, description, closeLabel = "Close", closeOnBackdrop = true, closeOnEscape = true, className = "", role = "dialog", initialFocus, side, hideClose = false }: DialogProps & { side?: string; hideClose?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  const callback = useRef(onOpenChange);
  useEffect(() => { callback.current = onOpenChange; }, [onOpenChange]);
  const heading = useId();
  const desc = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previous = document.activeElement as HTMLElement | null;
    dialog.showModal();
    if (locks++ === 0) { oldOverflow = document.body.style.overflow; document.body.style.overflow = "hidden"; }
    const target = initialFocus ? dialog.querySelector<HTMLElement>(initialFocus) : null;
    target?.focus();
    return () => {
      dialog.close();
      if (--locks === 0) document.body.style.overflow = oldOverflow;
      if (previous?.isConnected) previous.focus();
    };
  }, [open, initialFocus]);
  return <dialog ref={ref} role={role} aria-labelledby={heading} aria-describedby={description ? desc : undefined} data-side={side}
    className={`art-pix-overlay-surface art-pix-dialog ${className}`}
    onCancel={event => { event.preventDefault(); event.stopPropagation(); if (closeOnEscape) callback.current(false); }}
    onClick={event => { if (!closeOnBackdrop || event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) callback.current(false); }}
    onKeyDown={event => {
      if (event.key !== "Tab") return;
      const nodes = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, a[href], input, select, textarea, [tabindex]')).filter(n => n.tabIndex >= 0 && !n.matches(':disabled') && !n.closest('[hidden], [inert]') && n.getClientRects().length > 0);
      const first = nodes[0], last = nodes.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }}>
    <h2 className="art-pix-dialog-heading" id={heading}>{title}</h2>
    {description && <p id={desc}>{description}</p>}
    {children}
    {!hideClose && <div className="art-pix-overlay-actions"><button type="button" className="art-pix-overlay-trigger" onClick={() => callback.current(false)}>{closeLabel}</button></div>}
  </dialog>;
}
