import { CardFrame, CardMedia, type CardContentProps, type CardMediaProps } from "../_shared/CardFrame.js";
import type { ReactNode } from "react";
export type MediaCardProps = CardContentProps & CardMediaProps & { caption?: ReactNode; metadata?: ReactNode };
export function MediaCard({ media, img, imgAlt, caption, metadata, children, className = "", ...props }: MediaCardProps) {
  return <CardFrame {...props} className={`art-pix-media-card ${className}`} leading={<figure style={{ margin: 0 }}><CardMedia media={media} img={img} imgAlt={imgAlt} />{caption != null && <figcaption className="art-pix-special-card__muted" style={{ marginTop: 8 }}>{caption}</figcaption>}</figure>}>{metadata != null && <div className="art-pix-special-card__muted">{metadata}</div>}{children}</CardFrame>;
}
