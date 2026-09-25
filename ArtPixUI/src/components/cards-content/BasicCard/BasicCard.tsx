import type { ComponentPropsWithoutRef } from "react";
import "./BasicCard.css";

export type BasicCardProps = ComponentPropsWithoutRef<"div"> & {
  padding?: "small" | "medium" | "large";
};

/** A non-interactive surface; content and semantics belong to the consumer. */
export function BasicCard({ padding = "medium", children, className, ...props }: BasicCardProps) {
  return (
    <div {...props} className={["art-pix-basic-card", `art-pix-basic-card--${padding}`, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
