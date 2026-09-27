import { Button } from "../../buttons-actions/Button/Button.js";
import "../_shared/search.css";
export type SearchHistoryProps = { queries: string[]; onSelect: (query: string) => void; onRemove?: (query: string) => void; onClear?: () => void; label?: string; disabled?: boolean };
export function SearchHistory({ queries, onSelect, onRemove, onClear, label = "Recent searches", disabled }: SearchHistoryProps) {
 const unique = [...new Set(queries)];
 return <section aria-label={label} className="art-pix-search-stack"><strong>{label}</strong>{unique.length ? <ul className="art-pix-search-list">{unique.map(query => <li key={query} className="art-pix-search-row"><button type="button" className="art-pix-search-list-item" disabled={disabled} onClick={() => onSelect(query)}>{query}</button>{onRemove && <button type="button" className="art-pix-filter-chip" disabled={disabled} aria-label={`Remove search: ${query}`} onClick={() => onRemove(query)}>×</button>}</li>)}</ul> : <p className="art-pix-search-muted">No recent searches.</p>}{onClear && <Button variant="secondary" disabled={disabled || !unique.length} onClick={onClear}>Clear history</Button>}</section>;
}
