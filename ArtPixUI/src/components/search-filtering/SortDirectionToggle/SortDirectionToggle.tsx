import { Button } from "../../buttons-actions/Button/Button.js";
export type SortDirectionToggleProps = { value: "asc" | "desc"; onChange: (value: "asc" | "desc") => void; disabled?: boolean; label?: string };
export function SortDirectionToggle({ value, onChange, disabled, label = "Descending order" }: SortDirectionToggleProps) {
 return <Button variant="secondary" disabled={disabled} aria-label={label} aria-pressed={value === "desc"} onClick={() => onChange(value === "asc" ? "desc" : "asc")}><span aria-hidden="true">{value === "asc" ? "↑" : "↓"}</span> {value === "asc" ? "Ascending" : "Descending"}</Button>;
}
