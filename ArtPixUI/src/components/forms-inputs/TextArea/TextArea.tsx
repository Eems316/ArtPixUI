import type { ComponentPropsWithRef } from "react";
import "./TextArea.css";

export type TextAreaProps = ComponentPropsWithRef<"textarea"> & {
  /** Enable native horizontal and vertical resizing. Defaults to true. */
  resizable?: boolean;
};

export function TextArea({ resizable = true, rows = 4, className, style, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      rows={rows}
      className={["art-pix-text-area", className].filter(Boolean).join(" ")}
      style={{ ...style, resize: resizable ? "both" : "none" }}
    />
  );
}
