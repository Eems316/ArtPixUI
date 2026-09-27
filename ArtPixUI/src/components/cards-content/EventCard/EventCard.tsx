import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import type { ReactNode } from "react";
export type EventCardProps = CardContentProps & { when: ReactNode; dateTime?: string; location?: ReactNode; organizer?: ReactNode };
export function EventCard({ when, dateTime, location, organizer, children, className = "", ...props }: EventCardProps) {
  return <CardFrame {...props} className={`art-pix-event-card ${className}`}><dl className="art-pix-special-card__details"><div><dt>When</dt><dd>{dateTime ? <time dateTime={dateTime}>{when}</time> : when}</dd></div>{location != null && <div><dt>Where</dt><dd>{location}</dd></div>}{organizer != null && <div><dt>Hosted by</dt><dd>{organizer}</dd></div>}</dl>{children}</CardFrame>;
}
