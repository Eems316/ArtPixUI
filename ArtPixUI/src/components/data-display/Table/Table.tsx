import type { ComponentPropsWithRef, CSSProperties, ReactNode } from "react";
import "./Table.css";

export type TableProps = ComponentPropsWithRef<"table"> & {
  caption?: ReactNode;
  /** Accessible name for the keyboard-focusable scrolling region. */
  scrollLabel?: string;
  minWidth?: CSSProperties["minWidth"];
};

/** Compose native thead/tbody/tfoot rows and scoped th/td cells as children. */
export function Table({ caption, scrollLabel = "Scrollable table", minWidth = 480, children, className, style, ...props }: TableProps) {
  return <div className="art-pix-table-frame" role="region" aria-label={scrollLabel} tabIndex={0}>
    <table {...props} className={["art-pix-table", className].filter(Boolean).join(" ")} style={{ minWidth, ...style }}>
      {caption != null && <caption>{caption}</caption>}
      {children}
    </table>
  </div>;
}
