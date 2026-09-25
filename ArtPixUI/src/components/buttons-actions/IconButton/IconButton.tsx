import { Action, type ActionProps } from "../_shared/Action.js";
import "./IconButton.css";

export type IconButtonProps = ActionProps & {
  /** A readable name for the icon's action, required for assistive technology. */
  "aria-label": string;
};

export function IconButton({ className, children, ...props }: IconButtonProps) {
  return (
    <Action {...props} className={["art-pix-icon-button", className].filter(Boolean).join(" ")}>
      <span className="art-pix-icon-button__icon" aria-hidden="true">{children}</span>
    </Action>
  );
}
