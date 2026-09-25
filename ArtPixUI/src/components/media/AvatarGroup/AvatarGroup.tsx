import { Children, cloneElement, isValidElement } from "react";
import type { ComponentPropsWithRef, ReactElement } from "react";
import type { AvatarProps } from "../Avatar/index.js";
import "./AvatarGroup.css";

export type AvatarGroupProps = Omit<ComponentPropsWithRef<"div">, "children"> & {
  /** Direct Avatar children; conditional null children are ignored. */
  children?: ReactElement<AvatarProps> | (ReactElement<AvatarProps> | null | false)[];
  /** Maximum visible portraits (the overflow count is an extra item). */
  max?: number;
  size?: AvatarProps["size"];
};

/** A static group; hidden portraits are represented by an accessible count. */
export function AvatarGroup({ children, max, size = "medium", className, role = "group", ...props }: AvatarGroupProps) {
  const avatars = Children.toArray(children).filter(isValidElement<AvatarProps>);
  const limit = max === undefined || !Number.isFinite(max) ? avatars.length : Math.max(0, Math.floor(max));
  const visible = avatars.slice(0, limit);
  const remaining = avatars.length - visible.length;

  return (
    <div {...props} role={role} className={["art-pix-avatar-group", `art-pix-avatar-group--${size}`, className].filter(Boolean).join(" ")}>
      {visible.map(avatar => <span key={avatar.key} className="art-pix-avatar-group__item">{cloneElement(avatar, { size })}</span>)}
      {remaining > 0 && <span className="art-pix-avatar-group__item art-pix-avatar-group__overflow" role="img" aria-label={`${remaining} more ${remaining === 1 ? "person" : "people"}`}><span dir="ltr" aria-hidden="true">+{remaining}</span></span>}
    </div>
  );
}
