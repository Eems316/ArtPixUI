import type { ReactNode } from "react";
import { Alert, type AlertProps } from "../Alert/Alert.js";
import { Button } from "../../buttons-actions/Button/Button.js";
import "./NotificationSurface.css";

export type NotificationSurfaceProps = Omit<AlertProps, "onDismiss"> & {
  onDismiss?: () => void;
  dismissLabel?: string;
  action?: ReactNode;
};
export function NotificationSurface({ children, onDismiss, dismissLabel = "Dismiss notification", action, ...props }: NotificationSurfaceProps) {
  return <div className="art-pix-notification-surface">
    <Alert {...props}>{children}</Alert>
    {(action != null || onDismiss) && <div className="art-pix-notification-surface__actions">
      {action}
      {onDismiss && <Button variant="secondary" onClick={onDismiss} aria-label={dismissLabel}>Dismiss</Button>}
    </div>}
  </div>;
}
