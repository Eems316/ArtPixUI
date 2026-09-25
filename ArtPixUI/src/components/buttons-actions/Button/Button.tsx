import { Action, type ActionProps } from "../_shared/Action.js";
import "./Button.css";

export type ButtonProps = ActionProps & {
  variant?: "primary" | "secondary";
};

/** A tactile action, or a native anchor when `link` is supplied. */
export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <Action
      {...props}
      className={["art-pix-button", `art-pix-button--${variant}`, className].filter(Boolean).join(" ")}
    />
  );
}
