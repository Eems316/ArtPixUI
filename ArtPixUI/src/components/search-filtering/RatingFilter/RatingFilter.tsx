import { RadioFilter } from "../RadioFilter/RadioFilter.js";
export type RatingFilterProps = { label?: string; value: number | null; onChange: (value: number | null) => void; disabled?: boolean; name?: string };
export function RatingFilter({ label = "Minimum rating", value, onChange, disabled, name }: RatingFilterProps) {
 return <RadioFilter label={label} disabled={disabled} name={name} value={value === null ? "any" : String(value)} onChange={next => onChange(next === "any" ? null : Number(next))} options={[{ id: "any", label: "Any rating" }, ...[5, 4, 3, 2, 1].map(rating => ({ id: String(rating), label: `${rating} ${rating === 1 ? "star" : "stars"} & up` }))]} />;
}
