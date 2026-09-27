import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import { Avatar } from "../../media/Avatar/Avatar.js";
import type { ReactNode } from "react";
export type TestimonialCardProps = Omit<CardContentProps, "title"> & { quote: ReactNode; author: string; attribution?: ReactNode; img?: string; avatar?: ReactNode; cite?: string };
export function TestimonialCard({ quote, author, attribution, img, avatar, cite, children, className = "", ...props }: TestimonialCardProps) {
  return <CardFrame {...props} title={author} className={`art-pix-testimonial-card ${className}`} leading={<blockquote className="art-pix-special-card__quote" cite={cite}>{quote}</blockquote>} identity={avatar ?? (img ? <Avatar name={author} src={img} alt="" /> : undefined)}>{attribution != null && <div className="art-pix-special-card__muted">{attribution}</div>}{children}</CardFrame>;
}
