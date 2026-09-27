import { NotificationSurface, type NotificationSurfaceProps } from "../_shared/NotificationSurface.js";
import "./NotificationBanner.css";
export type NotificationBannerProps = NotificationSurfaceProps & { open?: boolean };
export function NotificationBanner({ open = true, className, ...props }: NotificationBannerProps) {
  if (!open) return null;
  return <NotificationSurface {...props} className={["art-pix-notification-banner", className].filter(Boolean).join(" ")} />;
}
