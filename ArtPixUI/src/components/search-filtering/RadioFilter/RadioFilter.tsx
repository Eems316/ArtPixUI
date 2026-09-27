import { useId } from "react";
import { RadioButton } from "../../forms-inputs/RadioButton/RadioButton.js";
import { safeCount, type FilterOption } from "../_shared/model.js";
import "../_shared/search.css";
export type RadioFilterProps = { label: string; options: FilterOption[]; value?: string; onChange: (value: string) => void; disabled?: boolean; name?: string; className?: string };
export function RadioFilter({ label, options, value, onChange, disabled, name, className = "" }: RadioFilterProps) {
 const id = useId();
 return <fieldset disabled={disabled} className={`art-pix-filter-group ${className}`}><legend>{label}</legend>{options.map(option => <label className="art-pix-filter-choice" key={option.id}><RadioButton name={name ?? id} value={option.id} checked={value === option.id} disabled={option.disabled} onChange={() => onChange(option.id)} /><span>{option.label}</span>{option.count !== undefined && <span className="art-pix-filter-count">{safeCount(option.count)}</span>}</label>)}{!options.length && <p>No options available.</p>}</fieldset>;
}
