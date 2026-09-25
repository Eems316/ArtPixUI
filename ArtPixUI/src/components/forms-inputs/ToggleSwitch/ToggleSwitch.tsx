import type { ComponentPropsWithRef } from "react";
import "./ToggleSwitch.css";

export type ToggleSwitchProps = Omit<ComponentPropsWithRef<"input">, "type" | "role" | "children" | "aria-checked">;

/** Native checkbox behavior with switch semantics; name it using a Label or aria-label. */
export function ToggleSwitch({ className, ...props }: ToggleSwitchProps) {
  return <input {...props} type="checkbox" role="switch" className={["art-pix-toggle-switch", className].filter(Boolean).join(" ")} />;
}
