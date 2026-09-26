import type { ComponentPropsWithRef, ReactNode } from "react";
import "./Timeline.css";

export type TimelineItem = {
  id: string;
  title: ReactNode;
  timestamp?: string;
  /** Valid machine-readable date/time for an optional time element. */
  dateTime?: string;
  content?: ReactNode;
};

export type TimelineProps = Omit<ComponentPropsWithRef<"ol">, "children" | "start" | "reversed" | "type"> & {
  items: readonly TimelineItem[];
};

/** Events retain supplied order; timestamps are never parsed or reformatted. */
export function Timeline({ items, className, role = "list", ...props }: TimelineProps) {
  return <ol {...props} role={role} className={["art-pix-timeline", className].filter(Boolean).join(" ")}>
    {items.map(({ id, title, timestamp, dateTime, content }) => <li key={id} className="art-pix-timeline__item">
      <strong className="art-pix-timeline__title">{title}</strong>
      {timestamp != null && (dateTime
        ? <time className="art-pix-timeline__timestamp" dateTime={dateTime}>{timestamp}</time>
        : <span className="art-pix-timeline__timestamp">{timestamp}</span>)}
      {content != null && <div className="art-pix-timeline__content">{content}</div>}
    </li>)}
  </ol>;
}
