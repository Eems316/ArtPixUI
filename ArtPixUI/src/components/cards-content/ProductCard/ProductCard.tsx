import { CardFrame, CardMedia, type CardContentProps, type CardMediaProps } from "../_shared/CardFrame.js";
import type { ReactNode } from "react";
export type ProductCardProps = CardContentProps & CardMediaProps & { price: ReactNode; previousPrice?: ReactNode; availability?: ReactNode };
export function ProductCard({ media, img, imgAlt, price, previousPrice, availability, children, className = "", ...props }: ProductCardProps) {
  return <CardFrame {...props} className={`art-pix-product-card ${className}`} leading={<CardMedia media={media} img={img} imgAlt={imgAlt} />}>
    <div className="art-pix-special-card__price-row"><span className="art-pix-special-card__price">{price}</span>{previousPrice != null && <span className="art-pix-special-card__muted">Was <s>{previousPrice}</s></span>}</div>
    {availability != null && <div className="art-pix-special-card__muted">{availability}</div>}{children}
  </CardFrame>;
}
