import type { ComponentPropsWithoutRef } from "react";
import "../_shared/overlay.css";
export type BackdropProps = Omit<ComponentPropsWithoutRef<"div">, "children"> & { open?: boolean };
/** Decorative scrim only; use Modal for focus containment and dismissal. */
export function Backdrop({ open = true, className = "", ...props }: BackdropProps) {
  return open ? <div {...props} aria-hidden="true" className={`art-pix-backdrop ${className}`} /> : null;
}
