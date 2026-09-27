import type { ComponentPropsWithRef } from "react";
import { Icon } from "../../media/Icon/Icon.js";
import { feedbackSymbols, feedbackNames, feedbackAnnouncementProps, type FeedbackSeverity, type FeedbackAnnouncement } from "../_shared/feedback.js";
import "./StatusMessage.css";

export type StatusMessageProps = Omit<ComponentPropsWithRef<"div">, "role" | "aria-live" | "aria-atomic"> & {
  severity?: FeedbackSeverity;
  announcement?: FeedbackAnnouncement;
};

/** Compact feedback without a card surface; the caller owns visibility and updates. */
export function StatusMessage({ severity = "info", announcement = "polite", children, className, ...props }: StatusMessageProps) {
  return <div {...props} {...feedbackAnnouncementProps(announcement)}
    className={["art-pix-status-message", `art-pix-status-message--${severity}`, className].filter(Boolean).join(" ")}>
    <Icon size="small" className="art-pix-status-message__icon"><path d={feedbackSymbols[severity]} fillRule="evenodd" /></Icon>
    <div className="art-pix-status-message__body">
      <span className="art-pix-status-message__severity">{feedbackNames[severity]}</span>
      <div className="art-pix-status-message__text">{children}</div>
    </div>
  </div>;
}
