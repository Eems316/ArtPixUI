import { useId, type ReactNode } from "react";
import { SearchInput } from "../SearchInput/SearchInput.js";
import { Button } from "../../buttons-actions/Button/Button.js";
export type SearchBarProps = { label: string; value: string; onValueChange: (value: string) => void; onSearch: (query: string) => void; placeholder?: string; disabled?: boolean; busy?: boolean; submitLabel?: string; children?: ReactNode; className?: string };
export function SearchBar({ label, value, onValueChange, onSearch, placeholder, disabled, busy, submitLabel = "Search", children, className = "" }: SearchBarProps) {
 const id = useId();
 return <form role="search" aria-label={label} aria-busy={busy || undefined} className={`art-pix-search-stack ${className}`} onSubmit={event => { event.preventDefault(); if (!disabled && !busy) onSearch(value); }}><label htmlFor={id}>{label}</label><div className="art-pix-search-row"><SearchInput id={id} value={value} onChange={event => onValueChange(event.target.value)} placeholder={placeholder} disabled={disabled} /><Button type="submit" disabled={disabled || busy}>{busy ? "Searching…" : submitLabel}</Button></div>{children}</form>;
}
