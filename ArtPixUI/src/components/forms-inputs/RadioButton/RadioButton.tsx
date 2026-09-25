import type { ComponentPropsWithRef } from "react";
import "./RadioButton.css";

export type RadioButtonProps = Omit<ComponentPropsWithRef<"input">, "type" | "children">;

/** Share a name across options; the browser manages grouping and keyboard navigation. */
export function RadioButton({ className, ...props }: RadioButtonProps) {
  return <input {...props} type="radio" className={["art-pix-radio-button", className].filter(Boolean).join(" ")} />;
}
