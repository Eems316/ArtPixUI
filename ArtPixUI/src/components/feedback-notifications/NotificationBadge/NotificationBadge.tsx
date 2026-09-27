import type { ComponentPropsWithRef } from "react";
import "./NotificationBadge.css";
export type NotificationBadgeProps = Omit<ComponentPropsWithRef<"span">, "children" | "role" | "tabIndex"> & {
  count?: number;
  max?: number;
  showZero?: boolean;
  label?: string;
};
export function NotificationBadge({ count, max = 99, showZero = false, label, className, "aria-label": ariaLabel, ...props }: NotificationBadgeProps) {
  const value = Number.isFinite(count) ? Math.max(0, Math.floor(count!)) : 0;
  const limit = Number.isFinite(max) && max >= 1 ? Math.floor(max) : 99;
  if (count !== undefined && value === 0 && !showZero) return null;
  const text = count === undefined ? label ?? "New" : value > limit ? `${limit}+` : String(value);
  return <span {...props} role="img" tabIndex={undefined} aria-label={ariaLabel ?? (count === undefined ? text : `${value} ${label ?? (value === 1 ? "notification" : "notifications")}`)}
    className={["art-pix-notification-badge", className].filter(Boolean).join(" ")}>{text}</span>;
}
