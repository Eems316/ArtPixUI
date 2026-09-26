import type { ComponentPropsWithRef, ReactNode } from "react";
import "./Footer.css";

export type FooterProps = ComponentPropsWithRef<"footer"> & {
  brand?: ReactNode;
  navigation?: ReactNode;
  navigationLabel?: string;
};

/** Native footer semantics; children supply the supporting-content row. */
export function Footer({ brand, navigation, navigationLabel = "Footer navigation", children, className, ...props }: FooterProps) {
  return <footer {...props} className={["art-pix-footer", className].filter(Boolean).join(" ")}>
    {brand != null && <div className="art-pix-footer__brand">{brand}</div>}
    {navigation != null && <nav className="art-pix-footer__navigation" aria-label={navigationLabel}>{navigation}</nav>}
    {children != null && <div className="art-pix-footer__content">{children}</div>}
  </footer>;
}
