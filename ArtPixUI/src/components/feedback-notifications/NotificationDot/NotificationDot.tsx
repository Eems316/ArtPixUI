import type { ComponentPropsWithRef } from "react";
import "./NotificationDot.css";
export type NotificationDotProps = Omit<ComponentPropsWithRef<"span">, "children" | "role" | "aria-hidden" | "tabIndex"> & {
  label?: string;
  decorative?: boolean;
  visible?: boolean;
};
export function NotificationDot({ label = "Unread activity", decorative = false, visible = true, className, "aria-label": ariaLabel, ...props }: NotificationDotProps) {
  if (!visible) return null;
  return <span {...props} role={decorative ? undefined : "img"} aria-label={decorative ? undefined : ariaLabel ?? label} aria-hidden={decorative || undefined}
    tabIndex={undefined} className={["art-pix-notification-dot", className].filter(Boolean).join(" ")} />;
}
