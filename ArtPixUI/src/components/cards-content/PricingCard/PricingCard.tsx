import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import type { ReactNode } from "react";
export type PricingCardProps = CardContentProps & { price: ReactNode; period?: ReactNode; features: ReactNode[]; featured?: boolean; featuredLabel?: ReactNode };
export function PricingCard({ price, period, features, featured = false, featuredLabel = "Recommended", badge, children, className = "", ...props }: PricingCardProps) {
  return <CardFrame {...props} badge={badge ?? (featured ? featuredLabel : undefined)} className={`art-pix-pricing-card ${featured ? "art-pix-pricing-card--featured" : ""} ${className}`}>
    <div className="art-pix-special-card__price-row"><span className="art-pix-special-card__price">{price}</span>{period != null && <span className="art-pix-special-card__muted">{period}</span>}</div>
    {features.length > 0 && <ul className="art-pix-special-card__features">{features.map((feature, index) => <li key={index}><span className="art-pix-special-card__check" aria-hidden="true">✓</span><span>{feature}</span></li>)}</ul>}{children}
  </CardFrame>;
}
