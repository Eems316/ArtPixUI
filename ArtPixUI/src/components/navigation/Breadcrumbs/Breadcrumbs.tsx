import type { ComponentPropsWithRef, ReactNode } from "react";
import { Link } from "../../typography-text/Link/index.js";
import "./Breadcrumbs.css";

export type BreadcrumbsItem = { id: string; label: ReactNode; href?: string };
export type BreadcrumbsProps = Omit<ComponentPropsWithRef<"nav">, "children"> & {
  items: readonly BreadcrumbsItem[];
};

/** The last item is the current page and never renders as a link. */
export function Breadcrumbs({ items, className, "aria-label": label, "aria-labelledby": labelledBy, ...props }: BreadcrumbsProps) {
  return <nav {...props} aria-label={label ?? (labelledBy ? undefined : "Breadcrumbs")} aria-labelledby={labelledBy}
    className={["art-pix-breadcrumbs", className].filter(Boolean).join(" ")}>
    <ol className="art-pix-breadcrumbs__list" role="list">
      {items.map(({ id, label: itemLabel, href }, index) => <li key={id} className="art-pix-breadcrumbs__item">
        {index > 0 && <svg className="art-pix-breadcrumbs__separator" viewBox="0 0 12 16" fill="currentColor" shapeRendering="crispEdges" aria-hidden="true" focusable="false"><path d="M2 2h3v3h3v3h3v2H8v3H5v3H2v-3h3v-3h3V8H5V5H2z" /></svg>}
        {index === items.length - 1
          ? <span className="art-pix-breadcrumbs__label art-pix-breadcrumbs__current" aria-current="page">{itemLabel}</span>
          : href !== undefined ? <Link className="art-pix-breadcrumbs__label" href={href}>{itemLabel}</Link>
          : <span className="art-pix-breadcrumbs__label">{itemLabel}</span>}
      </li>)}
    </ol>
  </nav>;
}
