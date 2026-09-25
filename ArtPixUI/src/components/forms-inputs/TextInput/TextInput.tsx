import type { ComponentPropsWithRef } from "react";
import "./TextInput.css";

export type TextInputProps = Omit<ComponentPropsWithRef<"input">, "type"> & {
  type?: "text" | "email" | "password" | "search" | "tel" | "url";
};

/** Native single-line editing; associate an external Label using id/htmlFor. */
export function TextInput({ type = "text", className, ...props }: TextInputProps) {
  return <input {...props} type={type} className={["art-pix-text-input", className].filter(Boolean).join(" ")} />;
}
