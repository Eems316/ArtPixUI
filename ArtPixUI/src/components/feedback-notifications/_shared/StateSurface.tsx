import type { ComponentPropsWithRef, ReactNode } from "react";
import { BasicCard } from "../../cards-content/BasicCard/BasicCard.js";
import { Icon } from "../../media/Icon/Icon.js";
import { feedbackSymbols, feedbackAnnouncementProps, type FeedbackAnnouncement } from "./feedback.js";
import "./StateSurface.css";

export type StateSurfaceProps = Omit<ComponentPropsWithRef<"div">, "title" | "role" | "aria-live" | "aria-atomic"> & {
  title?: ReactNode;
  action?: ReactNode;
  announcement?: FeedbackAnnouncement;
};
export function StateSurface({ kind, title, children, action, announcement = "off", className, ...props }: StateSurfaceProps & { kind: "empty" | "error" | "success" }) {
  const defaults = { empty: "Nothing here yet", error: "Something went wrong", success: "All done" };
  return <BasicCard {...props} {...feedbackAnnouncementProps(announcement)}
    className={["art-pix-state-surface", `art-pix-state-surface--${kind}`, className].filter(Boolean).join(" ")}>
    <Icon size="large" className="art-pix-state-surface__icon">
      <path fillRule="evenodd" d={kind === "empty" ? "M1 4h14v10H1z M3 6v6h10V6z M4 1h8v2H4z" : feedbackSymbols[kind]} />
    </Icon>
    <div className="art-pix-state-surface__title">{title ?? defaults[kind]}</div>
    {children != null && <div className="art-pix-state-surface__content">{children}</div>}
    {action != null && <div className="art-pix-state-surface__actions">{action}</div>}
  </BasicCard>;
}
