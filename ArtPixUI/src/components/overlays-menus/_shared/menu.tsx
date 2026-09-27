import { useId, useRef, useState, type ReactNode, type KeyboardEvent, type RefObject } from "react";
import { PopupCore } from "./popup.js";
import { nextOptionIndex } from "./geometry.js";
export type MenuItem = { id: string; label: string; disabled?: boolean; onSelect?: () => void; checked?: boolean; children?: MenuItem[] };
export type MenuProps = { label: string; items: MenuItem[]; className?: string; disabled?: boolean };
function menuKey(event: KeyboardEvent<HTMLElement>) {
 const root = event.currentTarget;
 const nodes = Array.from(root.querySelectorAll<HTMLButtonElement>(':scope > button:not(:disabled)'));
 const index = nodes.indexOf(document.activeElement as HTMLButtonElement);
 let next: HTMLButtonElement | undefined;
 if (event.key === "ArrowDown") next = nodes[nextOptionIndex(nodes.length, index, "next")];
 else if (event.key === "ArrowUp") next = nodes[nextOptionIndex(nodes.length, index, "previous")];
 else if (event.key === "Home") next = nodes[0];
 else if (event.key === "End") next = nodes.at(-1);
 else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && event.key !== " ") next = [...nodes.slice(index + 1), ...nodes.slice(0, index + 1)].find(n => n.textContent?.trim().toLowerCase().startsWith(event.key.toLowerCase()));
 if (next) { event.preventDefault(); event.stopPropagation(); next.focus(); }
}
export function MenuSurface({ open, onOpenChange, anchorRef, label, items, id, point, nested = false, onExit }: { open: boolean; onOpenChange: (open: boolean) => void; anchorRef: RefObject<HTMLElement | null>; label: string; items: MenuItem[]; id?: string; point?: { x: number; y: number }; nested?: boolean; onExit?: () => void }) {
 const close = () => { onOpenChange(false); anchorRef.current?.focus(); };
 return <PopupCore open={open} onOpenChange={onOpenChange} anchorRef={anchorRef} label={label} id={id} point={point} role="menu" placement={nested ? "right" : "bottom"} className="art-pix-menu" onKeyDown={event => {
   menuKey(event);
   if (event.key === "Tab") { (onExit ?? close)(); }
   if (event.key === "ArrowLeft" && nested) { event.preventDefault(); event.stopPropagation(); close(); }
 }}>
 {items.map(item => item.children ? <NestedItem key={item.id} item={item} onExit={onExit ?? close} /> : <button key={item.id} type="button" role={item.checked === undefined ? "menuitem" : "menuitemcheckbox"} aria-checked={item.checked} disabled={item.disabled} tabIndex={-1} className="art-pix-menu-item" onClick={() => { (onExit ?? close)(); item.onSelect?.(); }}>{item.label}{item.checked !== undefined && <span aria-hidden="true">{item.checked ? "■" : "□"}</span>}</button>)}
 </PopupCore>;
}
export function NestedItem({ item, onExit, tabIndex = -1 }: { item: MenuItem; onExit: () => void; tabIndex?: number }) {
 const [open, setOpen] = useState(false); const ref = useRef<HTMLButtonElement>(null); const id = useId();
 return <><button type="button" ref={ref} role="menuitem" disabled={item.disabled} tabIndex={tabIndex} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined} className="art-pix-menu-item" onClick={() => setOpen(v => !v)} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); event.stopPropagation(); setOpen(true); } }}>{item.label}<span aria-hidden="true">▸</span></button><MenuSurface id={id} open={open} onOpenChange={setOpen} anchorRef={ref} label={item.label} items={item.children ?? []} nested onExit={() => { setOpen(false); ref.current?.focus(); onExit(); }} /></>;
}
export function MenuTrigger({ label, items, className = "", disabled }: MenuProps) {
 const [open, setOpen] = useState(false); const ref = useRef<HTMLButtonElement>(null); const id = useId();
 return <><button ref={ref} type="button" disabled={disabled} aria-haspopup="menu" aria-expanded={open && !disabled} aria-controls={open && !disabled ? id : undefined} className={`art-pix-overlay-trigger ${className}`} onClick={() => setOpen(v => !v)} onKeyDown={event => { if (event.key === "ArrowDown" || event.key === "ArrowUp") { event.preventDefault(); setOpen(true); } }}>{label} <span aria-hidden="true">▾</span></button><MenuSurface id={id} open={open && !disabled} onOpenChange={setOpen} anchorRef={ref} label={label} items={items} /></>;
}
export type ContextMenuProps = MenuProps & { children: ReactNode };
export function ContextMenuCore({ label, items, children, className = "", disabled }: ContextMenuProps) {
 const [open, setOpen] = useState(false); const [point, setPoint] = useState<{ x: number; y: number }>(); const ref = useRef<HTMLDivElement>(null); const id = useId();
 return <div ref={ref} tabIndex={disabled ? -1 : 0} aria-disabled={disabled || undefined} aria-label={label} aria-haspopup="menu" aria-expanded={open && !disabled} aria-controls={open && !disabled ? id : undefined} className={className} onContextMenu={event => { if (disabled) return; event.preventDefault(); setPoint({ x: event.clientX, y: event.clientY }); setOpen(true); }} onKeyDown={event => { if (disabled) return; if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) { event.preventDefault(); setPoint(undefined); setOpen(true); } }}>{children}<MenuSurface id={id} open={open && !disabled} onOpenChange={setOpen} anchorRef={ref} label={label} items={items} point={point} /></div>;
}
