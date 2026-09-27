import { Checkbox } from "../../forms-inputs/Checkbox/Checkbox.js";
import { safeCount, toggleChoice, type FilterOption } from "../_shared/model.js";
import "../_shared/search.css";
export type CheckboxFilterProps = { label: string; options: FilterOption[]; value: string[]; onChange: (value: string[]) => void; disabled?: boolean; name?: string; className?: string };
export function CheckboxFilter({ label, options, value, onChange, disabled, name, className = "" }: CheckboxFilterProps) {
 return <fieldset disabled={disabled} className={`art-pix-filter-group ${className}`}><legend>{label}</legend>{options.map(option => <label className="art-pix-filter-choice" key={option.id}><Checkbox name={name} value={option.id} checked={value.includes(option.id)} disabled={option.disabled} onChange={event => onChange(toggleChoice(value, option.id, event.target.checked))} /><span>{option.label}</span>{option.count !== undefined && <span className="art-pix-filter-count">{safeCount(option.count)}</span>}</label>)}{!options.length && <p>No options available.</p>}</fieldset>;
}
