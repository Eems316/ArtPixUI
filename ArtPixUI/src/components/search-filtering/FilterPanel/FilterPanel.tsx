import { useId, type ReactNode } from "react";
import "../_shared/search.css";
export type FilterPanelProps = { title?: string; description?: string; children: ReactNode; actions?: ReactNode; className?: string };
export function FilterPanel({ title = "Filters", description, children, actions, className = "" }: FilterPanelProps) {
 const id = useId();
 return <section aria-labelledby={id} className={`art-pix-search-surface art-pix-search-stack ${className}`}><h3 id={id} style={{ margin: 0 }}>{title}</h3>{description && <p style={{ margin: 0 }} className="art-pix-search-muted">{description}</p>}{children}{actions && <div className="art-pix-search-row">{actions}</div>}</section>;
}
