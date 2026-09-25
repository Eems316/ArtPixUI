import type { ComponentPropsWithoutRef } from "react";
import "./IconGroup.css";

export type IconGroupProps = ComponentPropsWithoutRef<"div"> & {
  direction?: "horizontal" | "vertical";
  spacing?: "small" | "medium" | "large";
  /** Wrap when constrained by the parent; vertical wrapping needs a height constraint. */
  wrap?: boolean;
};

/** Layout only: children retain their own semantics and keyboard behavior. */
export function IconGroup({ direction = "horizontal", spacing = "medium", wrap = false, children, className, role, ...props }: IconGroupProps) {
  const labeled = Boolean(props["aria-label"]?.trim() || props["aria-labelledby"]?.trim());

  return (
    <div
      {...props}
      role={role ?? (labeled ? "group" : undefined)}
      className={["art-pix-icon-group", `art-pix-icon-group--${direction}`, `art-pix-icon-group--${spacing}`, wrap && "art-pix-icon-group--wrap", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
