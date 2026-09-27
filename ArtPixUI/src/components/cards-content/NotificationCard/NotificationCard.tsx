import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import { NotificationDot } from "../../feedback-notifications/NotificationDot/NotificationDot.js";
import { StatusMessage, type StatusMessageProps } from "../../feedback-notifications/StatusMessage/StatusMessage.js";
import type { ReactNode } from "react";
export type NotificationCardProps = CardContentProps & { unread?: boolean; severity?: StatusMessageProps["severity"]; status?: ReactNode; timestamp?: ReactNode; dateTime?: string };
export function NotificationCard({ unread = false, severity = "info", status, timestamp, dateTime, badge, children, className = "", ...props }: NotificationCardProps) {
  return <CardFrame {...props} badge={<><NotificationDot visible={unread} decorative /><span>{unread ? "Unread" : "Read"}</span>{badge}</>} className={`art-pix-notification-card ${unread ? "art-pix-notification-card--unread" : ""} ${className}`}>
    {status != null && <StatusMessage severity={severity} announcement="off">{status}</StatusMessage>}{children}
    {timestamp != null && <div className="art-pix-special-card__muted">{dateTime ? <time dateTime={dateTime}>{timestamp}</time> : timestamp}</div>}
  </CardFrame>;
}
