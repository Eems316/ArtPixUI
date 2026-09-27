import { useId, useRef, useState, type ComponentPropsWithoutRef } from "react";
import { MenuSurface, type MenuItem } from "../_shared/menu.js";
export type MenuBarProps = { label: string; menus: { id: string; label: string; items: MenuItem[]; disabled?: boolean }[]; className?: string };
export function MenuBar({ label, menus, className = "" }: MenuBarProps) {
 const [active, setActive] = useState(0); const [open, setOpen] = useState<string | null>(null); const refs = useRef<(HTMLButtonElement | null)[]>([]); const id = useId();
 const usable = menus.map((menu, index) => menu.disabled ? -1 : index).filter(index => index >= 0);
 const current = usable.includes(active) ? active : usable[0];
 return <div role="menubar" aria-label={label} className={`art-pix-menu-bar ${className}`} onKeyDown={event => {
   if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) || event.defaultPrevented) return;
   event.preventDefault();
   const i = usable.indexOf(active);
   const next = event.key === "Home" ? usable[0] : event.key === "End" ? usable.at(-1) : usable[(i + (event.key === "ArrowRight" ? 1 : -1) + usable.length) % usable.length];
   if (next !== undefined) { setActive(next); refs.current[next]?.focus(); if (open) setOpen(menus[next].id); }
 }}>
 {menus.map((menu, index) => <MenuBarEntry key={menu.id} id={`${id}-${index}`} menu={menu} open={open === menu.id} onOpenChange={value => setOpen(value ? menu.id : null)} register={node => { refs.current[index] = node; }} buttonProps={{ tabIndex: current === index ? 0 : -1, onFocus: () => setActive(index), onClick: () => setOpen(open === menu.id ? null : menu.id), onKeyDown: event => { if (event.key === "ArrowDown") { event.preventDefault(); setOpen(menu.id); } } }} />)}
 </div>;
}
function MenuBarEntry({ id, menu, open, onOpenChange, register, buttonProps }: { id: string; menu: MenuBarProps["menus"][number]; open: boolean; onOpenChange: (open: boolean) => void; register: (node: HTMLButtonElement | null) => void; buttonProps: ComponentPropsWithoutRef<"button"> }) {
 const anchor = useRef<HTMLButtonElement>(null);
 return <span role="none"><button {...buttonProps} type="button" ref={node => { anchor.current = node; register(node); }} role="menuitem" disabled={menu.disabled} aria-haspopup="menu" aria-expanded={open} aria-controls={open ? id : undefined} className="art-pix-overlay-trigger">{menu.label}</button><MenuSurface id={id} open={open} onOpenChange={onOpenChange} anchorRef={anchor} label={menu.label} items={menu.items} /></span>;
}
