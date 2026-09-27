import { CardFrame, type CardContentProps } from "../_shared/CardFrame.js";
import type { ReactNode } from "react";
export type FeatureCardProps = CardContentProps & { icon?: ReactNode; description?: ReactNode };
export function FeatureCard({ icon, description, children, className = "", ...props }: FeatureCardProps) {
  return <CardFrame {...props} className={`art-pix-feature-card ${className}`} identity={icon != null && <div className="art-pix-special-card__icon">{icon}</div>}>{description != null && <div>{description}</div>}{children}</CardFrame>;
}
