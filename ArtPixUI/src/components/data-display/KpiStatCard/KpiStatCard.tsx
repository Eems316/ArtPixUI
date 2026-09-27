import { CardFrame, type CardContentProps } from "../../cards-content/_shared/CardFrame.js";
import type { ReactNode } from "react";
export type KpiStatCardProps = CardContentProps & { value: ReactNode; unit?: ReactNode; trend?: ReactNode; description?: ReactNode };
export function KpiStatCard({ value, unit, trend, description, children, className = "", ...props }: KpiStatCardProps) {
  return <CardFrame {...props} className={`art-pix-kpi-stat-card ${className}`}><div className="art-pix-special-card__price-row"><span className="art-pix-special-card__metric">{value}</span>{unit != null && <span className="art-pix-special-card__muted">{unit}</span>}</div>{trend != null && <div>{trend}</div>}{description != null && <div className="art-pix-special-card__muted">{description}</div>}{children}</CardFrame>;
}
