import type { ComponentPropsWithRef, ReactNode } from "react";
import { Icon } from "../../media/Icon/Icon.js";
import { feedbackSymbols, feedbackNames, feedbackAnnouncementProps, type FeedbackSeverity, type FeedbackAnnouncement } from "../_shared/feedback.js";
import "./Alert.css";

export type AlertProps = Omit<ComponentPropsWithRef<"div">, "title" | "role" | "aria-live" | "aria-atomic"> & {
  severity?: FeedbackSeverity;
  title?: ReactNode;
  announcement?: FeedbackAnnouncement;
};

/** Persistent feedback; urgency is chosen independently of severity. */
export function Alert({ severity = "info", title, announcement = "polite", children, className, ...props }: AlertProps) {
  return <div {...props} {...feedbackAnnouncementProps(announcement)}
    className={["art-pix-alert", `art-pix-alert--${severity}`, className].filter(Boolean).join(" ")}>
    <Icon className="art-pix-alert__icon"><path d={feedbackSymbols[severity]} fillRule="evenodd" /></Icon>
    <div className="art-pix-alert__content">
      <span className="art-pix-alert__severity">{feedbackNames[severity]}</span>
      {title != null && <strong className="art-pix-alert__title">{title}</strong>}
      <div className="art-pix-alert__message">{children}</div>
    </div>
  </div>;
}
