import type { ComponentPropsWithoutRef } from "react";
import "./Link.css";

export type LinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

/** Native navigation with safe default rel values for new-tab links. */
export function Link({ children, className, target, rel, ...props }: LinkProps) {
  return (
    <a
      {...props}
      target={target}
      rel={rel ?? (target?.toLowerCase() === "_blank" ? "noopener noreferrer" : undefined)}
      className={["art-pix-link", className].filter(Boolean).join(" ")}
    >
      {children}
    </a>
  );
}
