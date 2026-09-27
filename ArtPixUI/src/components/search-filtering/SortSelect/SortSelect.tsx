import { useId } from "react";
import type { FilterOption } from "../_shared/model.js";
import "../_shared/search.css";
export type SortSelectProps = { label?: string; value: string; options: FilterOption[]; onChange: (value: string) => void; disabled?: boolean; name?: string };
export function SortSelect({ label = "Sort by", value, options, onChange, disabled, name }: SortSelectProps) {
 const id = useId();
 return <div className="art-pix-search-stack"><label htmlFor={id}>{label}</label><select className="art-pix-search-select" id={id} name={name} value={options.some(option => option.id === value) ? value : ""} disabled={disabled || !options.length} onChange={event => onChange(event.target.value)}>{!options.some(option => option.id === value) && <option value="" disabled>{options.length ? "Choose sorting" : "No sorting options"}</option>}{options.map(option => <option key={option.id} value={option.id} disabled={option.disabled}>{option.label}</option>)}</select></div>;
}
