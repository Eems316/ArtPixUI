import type { ReactNode } from "react";
import "../_shared/search.css";
export type SearchSuggestion = { id: string; label: string; description?: string; disabled?: boolean };
export type SearchSuggestionsProps = { label?: string; suggestions: SearchSuggestion[]; onSelect: (suggestion: SearchSuggestion) => void; emptyText?: ReactNode; disabled?: boolean; className?: string };
/** Standalone suggestion actions. Autocomplete owns listbox semantics separately. */
export function SearchSuggestions({ label = "Search suggestions", suggestions, onSelect, emptyText = "No suggestions", disabled, className = "" }: SearchSuggestionsProps) {
 return <div className={`art-pix-search-stack ${className}`}>{suggestions.length ? <ul className="art-pix-search-list" aria-label={label}>{suggestions.map(item => <li key={item.id}><button type="button" className="art-pix-search-list-item" disabled={disabled || item.disabled} onClick={() => onSelect(item)}>{item.label}{item.description && <small style={{ display: "block" }}>{item.description}</small>}</button></li>)}</ul> : <p>{emptyText}</p>}</div>;
}
