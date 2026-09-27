import { CheckboxFilter } from "../CheckboxFilter/CheckboxFilter.js";
import { RadioFilter } from "../RadioFilter/RadioFilter.js";
import { FilterPanel } from "../FilterPanel/FilterPanel.js";
import { ClearFilters } from "../ClearFilters/ClearFilters.js";
import type { FilterOption, FilterValues } from "../_shared/model.js";
export type FilterFacet = { id: string; label: string; options: FilterOption[]; mode?: "single" | "multiple"; disabled?: boolean };
export type FacetedFiltersProps = { title?: string; facets: FilterFacet[]; value: FilterValues; onChange: (value: FilterValues) => void; disabled?: boolean; onClear?: () => void };
export function FacetedFilters({ title = "Refine results", facets, value, onChange, disabled, onClear }: FacetedFiltersProps) {
 const count = Object.values(value).reduce((sum, values) => sum + values.length, 0);
 return <FilterPanel title={title} actions={onClear && <ClearFilters onClear={onClear} activeCount={count} disabled={disabled} />}>{facets.length ? facets.map(facet => facet.mode === "single" ? <RadioFilter key={facet.id} label={facet.label} options={facet.options} value={value[facet.id]?.[0]} disabled={disabled || facet.disabled} onChange={next => onChange({ ...value, [facet.id]: [next] })} /> : <CheckboxFilter key={facet.id} label={facet.label} options={facet.options} value={value[facet.id] ?? []} disabled={disabled || facet.disabled} onChange={next => onChange({ ...value, [facet.id]: next })} />) : <p>No filters available.</p>}</FilterPanel>;
}
