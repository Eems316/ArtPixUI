import { useId, useRef, useState, type ReactNode } from "react";
import { Popover } from "../../overlays-menus/Popover/Popover.js";
import "../_shared/search.css";
export type FilterDropdownProps = { label: string; children: ReactNode; disabled?: boolean; activeCount?: number };
export function FilterDropdown({ label, children, disabled, activeCount }: FilterDropdownProps) {
 const [open, setOpen] = useState(false); const anchor = useRef<HTMLButtonElement>(null); const id = useId();
 return <><button type="button" ref={anchor} disabled={disabled} className="art-pix-overlay-trigger" aria-haspopup="dialog" aria-expanded={open && !disabled} aria-controls={open && !disabled ? id : undefined} onClick={() => setOpen(value => !value)}>{label}{activeCount !== undefined && Number.isFinite(activeCount) && activeCount > 0 ? ` (${Math.floor(activeCount)})` : ""} <span aria-hidden="true">▾</span></button><Popover id={id} label={label} open={open && !disabled} onOpenChange={setOpen} anchorRef={anchor}><div className="art-pix-search-stack">{children}<button type="button" className="art-pix-overlay-trigger" onClick={() => { setOpen(false); anchor.current?.focus(); }}>Done</button></div></Popover></>;
}
