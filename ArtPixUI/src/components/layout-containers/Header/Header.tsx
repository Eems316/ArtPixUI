import type { ComponentPropsWithRef, ReactNode } from "react";
import "./Header.css";

export type HeaderProps = ComponentPropsWithRef<"header"> & {
  brand?: ReactNode;
  navigation?: ReactNode;
  navigationLabel?: string;
  actions?: ReactNode;
};

/** Native header semantics; the surrounding page determines its landmark role. */
export function Header({ brand, navigation, navigationLabel = "Main navigation", actions, children, className, ...props }: HeaderProps) {
  return <header {...props} className={["art-pix-header", className].filter(Boolean).join(" ")}>
    {brand != null && <div className="art-pix-header__brand">{brand}</div>}
    {navigation != null && <nav className="art-pix-header__navigation" aria-label={navigationLabel}>{navigation}</nav>}
    {actions != null && <div className="art-pix-header__actions">{actions}</div>}
    {children != null && <div className="art-pix-header__content">{children}</div>}
  </header>;
}
