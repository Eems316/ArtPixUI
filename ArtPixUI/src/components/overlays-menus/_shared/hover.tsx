import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { PopupCore, type PopupPlacement } from "./popup.js";
export type HoverProps = { trigger: string; children: ReactNode; placement?: PopupPlacement; delay?: number; className?: string };
export function HoverCore({ trigger, children, placement, delay = 300, className = "", tooltip = false }: HoverProps & { tooltip?: boolean }) {
 const [open, setOpen] = useState(false);
 const anchor = useRef<HTMLButtonElement>(null);
 const suppressFocusOpen = useRef(false);
 const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
 const id = useId();
 const clear = () => clearTimeout(timer.current);
 const show = () => { clear(); timer.current = setTimeout(() => setOpen(true), Math.max(0, delay)); };
 const hide = () => { clear(); timer.current = setTimeout(() => { if (!anchor.current?.parentElement?.contains(document.activeElement)) setOpen(false); }, 180); };
 useEffect(() => () => clearTimeout(timer.current), []);
 return <span onPointerEnter={show} onPointerLeave={hide} onFocus={() => { clear(); if (!suppressFocusOpen.current) setOpen(true); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { suppressFocusOpen.current = false; hide(); } }}>
   <button type="button" ref={anchor} className="art-pix-overlay-trigger" aria-describedby={tooltip && open ? id : undefined} aria-haspopup={tooltip ? undefined : "dialog"} aria-expanded={tooltip ? undefined : open} aria-controls={!tooltip && open ? id : undefined} onClick={() => { clear(); setOpen(true); }}>{trigger}</button>
   <PopupCore open={open} onOpenChange={value => { clear(); suppressFocusOpen.current = !value; setOpen(value); }} anchorRef={anchor} id={id} label={trigger} placement={placement} focus={false} role={tooltip ? "tooltip" : "dialog"} className={`${tooltip ? "art-pix-tooltip" : ""} ${className}`} onPointerEnter={clear} onPointerLeave={hide}>{children}</PopupCore>
 </span>;
}
