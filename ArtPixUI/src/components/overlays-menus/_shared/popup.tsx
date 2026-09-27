import { useEffect, useLayoutEffect, useRef, type RefObject, type ReactNode } from "react";
import "./overlay.css";
import { popupPosition } from "./geometry.js";
export type PopupPlacement = "bottom" | "top" | "right" | "left";
export type PopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  anchorRef: RefObject<HTMLElement | null>;
  children: ReactNode;
  label: string;
  id?: string;
  placement?: PopupPlacement;
  className?: string;
  point?: { x: number; y: number };
  role?: "dialog" | "menu" | "tooltip" | "listbox";
  focus?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
  onPointerEnter?: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
};
const stack: HTMLElement[] = [];
export function PopupCore({ open, onOpenChange, anchorRef, children, label, id, placement = "bottom", className = "", point, role = "dialog", focus = true, onKeyDown, onPointerEnter, onPointerLeave }: PopupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const change = useRef(onOpenChange);
  useEffect(() => { change.current = onOpenChange; }, [onOpenChange]);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!open || !node) return;
    const anchor = anchorRef.current;
    node.showPopover();
    stack.push(node);
    const update = () => {
      const a = anchorRef.current?.getBoundingClientRect();
      if (!a && !point) return;
      const w = node.offsetWidth, h = node.offsetHeight;
      const r = a ?? { left: point!.x, right: point!.x, top: point!.y, bottom: point!.y };
      const { x, y } = popupPosition(r, w, h, { width: innerWidth, height: innerHeight }, placement, point);
      node.style.left = `${x}px`;
      node.style.top = `${y}px`;
    };
    update();
    const observer = new ResizeObserver(update); observer.observe(node); if (anchorRef.current) observer.observe(anchorRef.current);
    window.addEventListener("resize", update); window.addEventListener("scroll", update, true);
    if (focus) (node.querySelector<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex="0"]') ?? node).focus();
    return () => { observer.disconnect(); window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true); const index = stack.indexOf(node); if (index >= 0) stack.splice(index, 1); if (node.contains(document.activeElement) && anchor?.isConnected) anchor.focus(); node.hidePopover(); };
  }, [open, anchorRef, placement, point, focus]);
  useEffect(() => {
    if (!open) return;
    const node = ref.current;
    const dismiss = (event: PointerEvent) => {
      if (node?.contains(event.target as Node) || anchorRef.current?.contains(event.target as Node)) return;
      change.current(false);
    };
    const key = (event: KeyboardEvent) => {
      if (!event.defaultPrevented && event.key === "Escape" && stack.at(-1) === node) { event.preventDefault(); event.stopPropagation(); change.current(false); if (focus || node?.contains(document.activeElement)) anchorRef.current?.focus(); }
    };
    const blur = (event: FocusEvent) => { if (!node?.contains(event.target as Node) && !anchorRef.current?.contains(event.target as Node)) change.current(false); };
    document.addEventListener("pointerdown", dismiss); document.addEventListener("keydown", key, true);
    document.addEventListener("focusin", blur);
    return () => { document.removeEventListener("pointerdown", dismiss); document.removeEventListener("keydown", key, true); document.removeEventListener("focusin", blur); };
  }, [open, anchorRef, focus]);
  if (!open) return null;
  return <div ref={ref} popover="manual" id={id} role={role} aria-label={role === "tooltip" ? undefined : label} tabIndex={-1} className={`art-pix-overlay-surface art-pix-popup ${className}`} onKeyDown={onKeyDown} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>{children}</div>;
}
