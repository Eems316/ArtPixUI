import type { ReactNode } from "react";
import { FilterChips, type FilterChip } from "../FilterChips/FilterChips.js";
import { ResultsCount } from "../ResultsCount/ResultsCount.js";
import { ClearFilters } from "../ClearFilters/ClearFilters.js";
import "../_shared/search.css";
export type FilterBarProps = { label?: string; children?: ReactNode; chips?: FilterChip[]; onRemove?: (id: string) => void; count?: number; activeCount?: number; onClear?: () => void; disabled?: boolean };
export function FilterBar({ label = "Filter results", children, chips = [], onRemove, count, activeCount, onClear, disabled }: FilterBarProps) {
 return <section aria-label={label} className="art-pix-search-surface art-pix-search-stack"><div className="art-pix-search-row">{children}{count !== undefined && <ResultsCount count={count} />}{onClear && <ClearFilters onClear={onClear} disabled={disabled} activeCount={activeCount ?? chips.length} />}</div>{onRemove && <FilterChips items={chips} onRemove={onRemove} disabled={disabled} />}</section>;
}
