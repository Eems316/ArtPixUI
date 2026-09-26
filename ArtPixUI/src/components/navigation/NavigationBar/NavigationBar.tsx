import type { ComponentPropsWithRef, ReactNode } from "react";
import { Link } from "../../typography-text/Link/index.js";
import type { LinkProps } from "../../typography-text/Link/index.js";
import "./NavigationBar.css";

export type NavigationBarItem = Omit<LinkProps, "children" | "aria-current"> & {
  id: string;
  label: ReactNode;
  current?: boolean;
};
export type NavigationBarProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  items: readonly NavigationBarItem[];
  brand?: ReactNode;
  actions?: ReactNode;
};

/** Current-page state is supplied by the caller, not inferred from the URL. */
export function NavigationBar({ items, brand, actions, className, "aria-label": label, "aria-labelledby": labelledBy, ...props }: NavigationBarProps) {
  return <nav {...props} aria-label={label ?? (labelledBy ? undefined : "Primary navigation")} aria-labelledby={labelledBy}
    className={["art-pix-navigation-bar", className].filter(Boolean).join(" ")}>
    {brand != null && <div className="art-pix-navigation-bar__brand">{brand}</div>}
    <ul className="art-pix-navigation-bar__items" role="list">
      {items.map(({ id, label: itemLabel, current, className: itemClass, ...linkProps }) => <li key={id} className="art-pix-navigation-bar__item">
        <Link {...linkProps} className={["art-pix-navigation-bar__link", itemClass].filter(Boolean).join(" ")} aria-current={current ? "page" : undefined}>{itemLabel}</Link>
      </li>)}
    </ul>
    {actions != null && <div className="art-pix-navigation-bar__actions">{actions}</div>}
  </nav>;
}
