import { useEffect, useRef } from "react";
import type { ComponentPropsWithRef, ReactNode } from "react";
import { Link } from "../../typography-text/Link/index.js";
import type { NavigationBarItem } from "../NavigationBar/index.js";
import "./Sidebar.css";

export type SidebarItem = Omit<NavigationBarItem, "label"> & { label: string; icon?: ReactNode };
export type SidebarProps = ComponentPropsWithRef<"aside"> & {
  heading?: ReactNode;
  items?: readonly SidebarItem[];
  navigationLabel?: string;
  collapse?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  drawer?: boolean;
  /** Controlled visibility in drawer mode; ignored inline. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  animated?: boolean;
};

export function Sidebar({ heading, items = [], navigationLabel = "Sidebar navigation", collapse = false, collapsed = false,
  onCollapsedChange, drawer = false, open = false, onOpenChange, animated = true, children, className,
  "aria-label": label = "Sidebar", ...props }: SidebarProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isCollapsed = collapse && collapsed;
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!drawer || !open || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [drawer, open]);

  const panel = <aside {...props} aria-label={label}
    className={["art-pix-sidebar", isCollapsed && "art-pix-sidebar--collapsed", animated && "art-pix-sidebar--animated", className].filter(Boolean).join(" ")}>
    <div className="art-pix-sidebar__controls">
      {collapse && <button type="button" className="art-pix-sidebar__toggle" aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        aria-expanded={!isCollapsed} onClick={() => onCollapsedChange?.(!isCollapsed)}><span aria-hidden="true">{isCollapsed ? "»" : "«"}</span></button>}
      {drawer && <button type="button" className="art-pix-sidebar__toggle" aria-label="Close sidebar" onClick={() => onOpenChange?.(false)}><span aria-hidden="true">×</span></button>}
    </div>
    {heading != null && <div className="art-pix-sidebar__heading" hidden={isCollapsed}>{heading}</div>}
    {items.length > 0 && <nav aria-label={navigationLabel}><ul className="art-pix-sidebar__items" role="list">
      {items.map(({ id, label: itemLabel, icon, current, className: itemClass, ...linkProps }) => <li key={id}>
        <Link {...linkProps} aria-label={linkProps["aria-label"] ?? itemLabel} aria-current={current ? "page" : undefined}
          className={["art-pix-sidebar__link", itemClass].filter(Boolean).join(" ")}>
          <span className="art-pix-sidebar__icon" aria-hidden="true">{icon ?? "▪"}</span>
          <span className="art-pix-sidebar__link-label" aria-hidden="true">{itemLabel}</span>
        </Link>
      </li>)}
    </ul></nav>}
    {children != null && <div className="art-pix-sidebar__content" hidden={isCollapsed}>{children}</div>}
  </aside>;
  if (!drawer) return panel;
  return <dialog ref={dialogRef} className={["art-pix-sidebar-drawer", animated && "art-pix-sidebar-drawer--animated"].filter(Boolean).join(" ")}
    aria-label={label} onCancel={event => { event.preventDefault(); onOpenChange?.(false); }}
    onKeyDown={event => {
      if (event.key !== "Tab" || event.defaultPrevented) return;
      const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea, [tabindex], [contenteditable='true']"))
        .filter(element => element.tabIndex >= 0 && !element.matches(":disabled") && !element.closest("[hidden], [inert]") && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
    onClick={event => { if (event.target === event.currentTarget) onOpenChange?.(false); }}>
    {panel}
  </dialog>;
}
