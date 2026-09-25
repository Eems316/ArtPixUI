import type { ComponentPropsWithoutRef } from "react";
import "./Label.css";

export type LabelProps = ComponentPropsWithoutRef<"label"> & {
  /** Shows a visual required marker. Set `required` on the associated input too. */
  required?: boolean;
};

/** Native form label; use htmlFor or nest the associated control. */
export function Label({ children, className, required = false, ...props }: LabelProps) {
  return (
    <label {...props} className={["art-pix-label", className].filter(Boolean).join(" ")}>
      {children}
      {required && <span className="art-pix-label__required" aria-hidden="true">*</span>}
    </label>
  );
}
